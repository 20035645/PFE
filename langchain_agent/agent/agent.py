"""
GymChatAgent: LangChain agent with MongoDB tools (Mistral via langchain-mistralai).
Falls back to Mistral REST API if the LangChain agent cannot start.
"""

import logging
from typing import Any, Optional

import requests

from config.settings import settings

logger = logging.getLogger(__name__)


class ResponseParseError(RuntimeError):
    """Raised when the LLM response cannot be parsed into plain text."""


def _detect_backends() -> dict:
    flags = {"langchain_agent": False, "mistral_rest": True}

    try:
        from langchain.agents import create_agent  # noqa: F401
        from langchain_mistralai import ChatMistralAI  # noqa: F401
        flags["langchain_agent"] = True
    except ImportError:
        pass

    return flags


_BACKENDS = _detect_backends()

SYSTEM_PROMPT = """You are GymGPT, a friendly assistant for a fitness club.

You help with TWO types of questions:

1) GENERAL TRAINING & FITNESS (answer directly — do NOT use tools)
   Examples: workout advice, exercise technique, sets/reps, warm-up/cool-down,
   cardio vs strength, stretching, recovery, sleep, hydration, beginner tips,
   muscle groups, training splits, gym etiquette.
   - Give clear, practical, evidence-based guidance in plain language.
   - Keep answers concise unless the user asks for detail.
   - For injury, pain, pregnancy, or medical conditions: do not diagnose;
     recommend seeing a doctor or physiotherapist, and offer only general safety tips.

2) THIS GYM'S DATA (use tools only when needed)
   - member_profile: this member's account/profile in the database.
   - training_programs: programmes offered by this gym (search by keyword).
   - book_gym_session: book a session at this gym.
   Never invent member names, bookings, prices, or schedules — use tools or say you don't have that data.

Rules:
- Do not call tools for general fitness questions.
- Do not call tools unless the user asks about their profile, our programmes, or booking.
- Never fabricate private member details.
- If a gym-specific request fails or data is missing, suggest contacting gym staff or their coach.
"""


def _build_user_content(user_id: str, message: str) -> str:
    return f"[member_id: {user_id}]\n{message}"


def _build_langchain_backend():
    from langchain.agents import create_agent
    from langchain_mistralai import ChatMistralAI
    from langgraph.checkpoint.memory import MemorySaver

    from .tools import get_tools

    llm = ChatMistralAI(
        model=settings.mistral_model,
        api_key=settings.mistral_api_key,
        temperature=0.2,
    )
    checkpointer = MemorySaver()
    graph = create_agent(
        llm,
        get_tools(),
        system_prompt=SYSTEM_PROMPT,
        checkpointer=checkpointer,
    )
    return graph, checkpointer


def _call_mistral_rest(messages: list[dict]) -> str:
    """Stateless fallback: Mistral chat completions API (no tools)."""
    response = requests.post(
        "https://api.mistral.ai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.mistral_api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": settings.mistral_model,
            "messages": messages,
            "temperature": 0.2,
        },
        timeout=60,
    )
    if not response.ok:
        raise RuntimeError(
            f"Mistral API error {response.status_code}: {response.text[:500]}"
        )
    data = response.json()
    try:
        return data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise ResponseParseError(f"Unexpected Mistral response: {data}") from exc


def _message_content(message: Any) -> str:
    content = getattr(message, "content", message)
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for block in content:
            if isinstance(block, dict) and block.get("type") == "text":
                parts.append(block.get("text", ""))
            elif isinstance(block, str):
                parts.append(block)
        return "\n".join(parts).strip()
    return str(content)


def get_agent_status() -> dict:
    mongo_ok = False
    try:
        from services.mongo_client import ping_mongo

        mongo_ok = ping_mongo()
    except Exception as exc:
        logger.debug("Mongo ping failed: %s", exc)

    return {
        "llm_provider": "mistral",
        "model": settings.mistral_model,
        "backends_available": _BACKENDS,
        "mongo_ok": mongo_ok,
        "tools": ["member_profile", "training_programs", "book_gym_session"],
    }


class GymChatAgent:
    def __init__(self):
        self._lc_agent = None
        self.backend = "none"

        if _BACKENDS["langchain_agent"]:
            try:
                self._lc_agent, _ = _build_langchain_backend()
                self.backend = "langchain"
                logger.info(
                    "GymChatAgent: LangChain + Mistral (%s), tools enabled.",
                    settings.mistral_model,
                )
                return
            except Exception as exc:
                err = str(exc).lower()
                if any(k in err for k in ("api_key", "invalid", "unauthorized", "401", "403")):
                    raise RuntimeError(
                        f"Mistral LangChain backend failed: {exc}"
                    ) from exc
                logger.warning(
                    "LangChain backend unavailable (%s); using Mistral REST.", exc
                )

        self.backend = "mistral_rest"
        logger.info(
            "GymChatAgent: Mistral REST fallback (%s), tools disabled.",
            settings.mistral_model,
        )

    def run(
        self,
        user_id: str,
        message: str,
        session_id: Optional[str] = None,
    ) -> dict:
        if self._lc_agent is not None:
            from langchain_core.messages import HumanMessage

            thread_id = session_id or user_id
            config = {"configurable": {"thread_id": thread_id}}
            result = self._lc_agent.invoke(
                {
                    "messages": [
                        HumanMessage(content=_build_user_content(user_id, message))
                    ]
                },
                config=config,
            )
            reply = _message_content(result["messages"][-1])
            return {
                "reply": reply,
                "user_id": user_id,
                "session_id": thread_id,
                "backend": "langchain",
                "llm_provider": "mistral",
                "model": settings.mistral_model,
                "tools_enabled": True,
            }

        if session_id is not None:
            logger.debug(
                "session_id=%s ignored: REST fallback has no memory.", session_id
            )

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": _build_user_content(user_id, message)},
        ]
        reply = _call_mistral_rest(messages)
        return {
            "reply": reply,
            "user_id": user_id,
            "session_id": None,
            "backend": "mistral_rest",
            "llm_provider": "mistral",
            "model": settings.mistral_model,
            "tools_enabled": False,
        }
