"""
Agent bootstrap: try to use LangChain's GoogleGemini when available. If not,
fall back to the `google-generativeai` client. This makes runtime robust across
different environments and package versions.
"""

from typing import Optional

from config.settings import settings

# tools and memory (langchain components may be optional at runtime)
try:
    from langchain.agents import initialize_agent
    from langchain.memory import ConversationBufferMemory
    from .tools import (
        get_member_profile_tool,
        get_program_tool,
        get_booking_tool,
    )
    _HAS_LANGCHAIN = True
except Exception:
    _HAS_LANGCHAIN = False

# try to import a LangChain Gemini wrapper; if not available, we'll use the
# google-generativeai client as a fallback
try:
    from langchain.llms import GoogleGemini as _LangChainGoogleGemini  # type: ignore
    _HAS_GEMINI_LC = True
except Exception:
    _LangChainGoogleGemini = None
    _HAS_GEMINI_LC = False

try:
    import google.generativeai as genai  # type: ignore
    _HAS_GENAI = True
except Exception:
    genai = None
    _HAS_GENAI = False


class GymChatAgent:
    def __init__(self):
        self.system_prompt = (
            "You are GymGPT, a gym assistant for a fitness club. "
            "Answer member and admin questions clearly and politely. "
            "Prefer actionable, concise replies. Use available gym data when provided, "
            "and never fabricate private member details. If a user asks to book or query "
            "their sessions, call the corresponding tool. If you cannot answer, instruct "
            "the user to contact gym staff or their assigned coach."
        )

        # Prefer using LangChain + GoogleGemini if available
        self.use_langchain_agent = False
        if _HAS_LANGCHAIN and _HAS_GEMINI_LC:
            try:
                self.llm = _LangChainGoogleGemini(
                    api_key=settings.gemini_api_key,
                    model=settings.gemini_model,
                    temperature=0.2,
                )
                self.tools = [
                    get_member_profile_tool(),
                    get_program_tool(),
                    get_booking_tool(),
                ]
                self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
                self.agent = initialize_agent(
                    self.tools,
                    self.llm,
                    agent="chat-zero-shot-react-description",
                    memory=self.memory,
                    verbose=False,
                )
                self.use_langchain_agent = True
            except Exception:
                # fall through to genai fallback
                self.use_langchain_agent = False

        # Fallback: use google-generativeai client directly if installed
        if not self.use_langchain_agent:
            if not _HAS_GENAI:
                raise RuntimeError(
                    "No supported Gemini client found. Install either a LangChain "
                    "build that exposes `langchain.llms.GoogleGemini` or install "
                    "`google-generativeai` (pip)."
                )
            # initialize the client
            genai.configure(api_key=settings.gemini_api_key)  # type: ignore[attr-defined]
            self.genai_client = genai

    def run(self, user_id: str, message: str, session_id: Optional[str] = None):
        prompt = (
            f"SYSTEM:\n{self.system_prompt}\n\n"
            f"USER CONTEXT:\nuser_id: {user_id}\n"
            f"session_id: {session_id or 'none'}\n"
            f"message: {message}\n"
        )

        if self.use_langchain_agent:
            # delegate to LangChain agent (tools + memory enabled)
            result = self.agent.run(prompt)
            return {"reply": result, "user_id": user_id, "session_id": session_id}

        # Fallback: use google-generativeai client directly (support multiple client shapes)
        genai_client = self.genai_client
        resp = None

        # Try known API entry points depending on installed client version
        if hasattr(genai_client, "generate_text"):
            resp = genai_client.generate_text(model=settings.gemini_model, prompt=prompt)  # type: ignore[attr-defined]
        elif hasattr(genai_client, "text") and hasattr(genai_client.text, "generate"):
            resp = genai_client.text.generate(model=settings.gemini_model, prompt=prompt)  # type: ignore[attr-defined]
        elif hasattr(genai_client, "chat") and hasattr(getattr(genai_client.chat, "completions", None), "create"):
            messages = [
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": f"user_id: {user_id}\nsession_id: {session_id or 'none'}\nmessage: {message}"},
            ]
            resp = genai_client.chat.completions.create(model=settings.gemini_model, messages=messages)  # type: ignore[attr-defined]
        elif hasattr(genai_client, "Client") and hasattr(genai_client.Client, "generate_text"):
            client = genai_client.Client(api_key=settings.gemini_api_key)  # type: ignore[attr-defined]
            resp = client.generate_text(model=settings.gemini_model, prompt=prompt)
        else:
            raise RuntimeError(
                "Unsupported google.generativeai client API. Update the package or install a supported version."
            )

        # Normalize response to plain text across possible response shapes
        text = None
        try:
            if isinstance(resp, dict):
                # common JSON-like shapes
                if "candidates" in resp and resp["candidates"]:
                    cand = resp["candidates"][0]
                    if isinstance(cand, dict) and "output" in cand:
                        text = cand["output"]
                    else:
                        text = str(cand)
                elif "output" in resp:
                    text = resp["output"]
                elif "content" in resp:
                    text = resp["content"]
                else:
                    text = str(resp)
            else:
                # object-like responses
                if hasattr(resp, "text"):
                    text = resp.text
                elif hasattr(resp, "output"):
                    text = resp.output
                elif hasattr(resp, "candidates") and getattr(resp, "candidates"):
                    try:
                        text = resp.candidates[0].output
                    except Exception:
                        try:
                            text = resp.candidates[0]["output"]
                        except Exception:
                            text = str(resp)
                elif hasattr(resp, "choices") and getattr(resp, "choices"):
                    # some clients use `choices` similar to OpenAI
                    try:
                        text = resp.choices[0].text
                    except Exception:
                        text = str(resp)
                else:
                    text = str(resp)
        except Exception:
            text = str(resp)

        return {"reply": text, "user_id": user_id, "session_id": session_id}
