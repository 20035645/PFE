# Gym Chatbot Agent

This folder contains the Python LangChain chatbot service for the gym management app.

## Purpose
- Run a LangChain agent for member-facing chat
- Provide a REST endpoint for the Express backend or frontend
- Query gym data from MongoDB or call Express tool endpoints

## Structure
- `app.py` — FastAPI entrypoint
- `agent/` — LangChain agent components and tool wrappers
- `services/` — MongoDB or REST tool implementations
- `config/` — environment and settings

## Run
1. Create a `.env` file from `.env.example`
2. Install dependencies:
   ```bash
   python -m pip install -r requirements.txt
   ```
3. Start the service:
   ```bash
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```
