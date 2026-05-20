# Gym Chatbot Agent

LangChain agent with **Mistral** and MongoDB tools for the gym management app.

## Setup

```bash
cd langchain_agent
python -m pip install -r requirements.txt
```

Get an API key from [Mistral AI Console](https://console.mistral.ai/).

Copy `.env.example` to `.env`:

```env
MISTRAL_API_KEY=your-mistral-api-key
MISTRAL_MODEL=mistral-small-latest
MONGO_URI=mongodb://localhost:27017/gym
EXPRESS_URL=http://localhost:5000
```

**Do not** install the standalone `bson` package (breaks PyMongo):

```bash
pip uninstall bson -y
pip install --force-reinstall pymongo
```

Seed MongoDB from the Express backend:

```bash
cd ../backend_project1
node seed.js
```

## Run

```bash
uvicorn app:app --reload --port 8000
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Mistral model, MongoDB, tools status |
| POST | `/chat` | Chat (tools when `backend` is `langchain`) |

### Chat body

```json
{
  "user_id": "<member id>",
  "message": "How many sets should a beginner do for muscle building?",
  "session_id": "optional-session-id"
}
```

### Models

Common `MISTRAL_MODEL` values:

- `mistral-small-latest` (default, fast, cheap)
- `open-mistral-nemo`
- `mistral-large-latest`

## Capabilities

| Type | Examples | Tools? |
|------|----------|--------|
| General fitness | Sets/reps, cardio, recovery, nutrition basics | No |
| Gym data | My profile, club programmes, book session | Yes |

## Tools

| Tool | Purpose |
|------|---------|
| `member_profile` | Member from MongoDB |
| `training_programs` | Search gym programmes |
| `book_gym_session` | Book a session in `seances` |
