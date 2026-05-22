from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from agent.agent import GymChatAgent, get_agent_status

app = FastAPI(title="Gym LangChain Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
agent = GymChatAgent()


class ChatRequest(BaseModel):
    user_id: str
    message: str
    session_id: Optional[str] = None


@app.get("/health")
def health():
    status = get_agent_status()
    status["active_backend"] = agent.backend
    status["tools_enabled"] = agent.backend == "langchain"
    return status


@app.post("/chat")
def chat(request: ChatRequest):
    try:
        return agent.run(request.user_id, request.message, request.session_id)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
