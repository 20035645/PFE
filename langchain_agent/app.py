from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from agent.agent import GymChatAgent

app = FastAPI(title="Gym LangChain Agent")
agent = GymChatAgent()

class ChatRequest(BaseModel):
    user_id: str
    message: str
    session_id: Optional[str] = None

@app.post("/chat")
def chat(request: ChatRequest):
    try:
        response = agent.run(request.user_id, request.message, request.session_id)
        return response
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
