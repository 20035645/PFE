import json
from datetime import datetime
from typing import Any, Optional

from bson import ObjectId
from pymongo import MongoClient
from pymongo.errors import PyMongoError

from config.settings import settings

_client: Optional[MongoClient] = None


def _get_db():
    global _client
    if _client is None:
        _client = MongoClient(settings.mongo_uri, serverSelectionTimeoutMS=5000)
    return _client.get_default_database()


def ping_mongo() -> bool:
    try:
        _get_db().client.admin.command("ping")
        return True
    except PyMongoError:
        return False


def _serialize(value: Any) -> Any:
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, datetime):
        return value.isoformat()
    if isinstance(value, dict):
        return {k: _serialize(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_serialize(item) for item in value]
    return value


def _to_json(data: Any) -> str:
    return json.dumps(_serialize(data), ensure_ascii=False, default=str)


def _parse_object_id(value: str) -> ObjectId | str:
    if ObjectId.is_valid(value):
        return ObjectId(value)
    return value


def get_member_profile(member_id: str) -> str:
    """Load a member from users or members collection."""
    try:
        db = _get_db()
        oid = _parse_object_id(member_id)
        projection = {"password": 0}

        for collection in ("users", "members"):
            doc = db[collection].find_one({"_id": oid}, projection)
            if doc:
                doc["_collection"] = collection
                return _to_json(doc)

        return _to_json({"error": "Member not found", "member_id": member_id})
    except PyMongoError as exc:
        return _to_json({"error": str(exc)})


def get_training_programs(query: str) -> str:
    """Search programmes by name or description (regex; no text index required)."""
    try:
        db = _get_db()
        q = (query or "").strip()
        if not q:
            programs = list(db.programmes.find().limit(10))
        else:
            pattern = {"$regex": q, "$options": "i"}
            programs = list(
                db.programmes.find(
                    {"$or": [{"name": pattern}, {"description": pattern}, {"niveau": pattern}]}
                ).limit(10)
            )
        if not programs:
            return _to_json({"message": "No matching programs found.", "query": q})
        return _to_json(programs)
    except PyMongoError as exc:
        return _to_json({"error": str(exc)})


def book_session(
    member_id: str,
    coach_id: str,
    session_date: str,
    heure: str = "18:00",
    capacite: int = 10,
) -> str:
    """
    Book a session in seances (aligned with Express Seance schema).
    session_date: ISO date, e.g. 2026-05-25 or 2026-05-25T10:00:00
    """
    try:
        if not member_id or not coach_id or not session_date:
            return _to_json(
                {"error": "member_id, coach_id and session_date are required."}
            )

        parsed_date = datetime.fromisoformat(session_date.replace("Z", "+00:00"))
        doc = {
            "date": parsed_date,
            "heure": heure,
            "capacite": capacite,
            "coach": _parse_object_id(coach_id),
            "membres": [_parse_object_id(member_id)],
        }

        db = _get_db()
        result = db.seances.insert_one(doc)
        return _to_json(
            {
                "message": "Session booked",
                "booking_id": str(result.inserted_id),
                "seance": doc,
            }
        )
    except (ValueError, PyMongoError) as exc:
        return _to_json({"error": str(exc)})
