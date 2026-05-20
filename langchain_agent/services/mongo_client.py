from pymongo import MongoClient
from bson.objectid import ObjectId
from config.settings import settings

client = MongoClient(settings.mongo_uri)
db = client.get_default_database()


def get_member_profile(member_id: str):
    try:
        query = {"_id": ObjectId(member_id)} if ObjectId.is_valid(member_id) else {"_id": member_id}
        user = db.users.find_one(query, {"password": 0})
        return user or {"error": "Member not found"}
    except Exception as exc:
        return {"error": str(exc)}


def get_training_programs(query: str):
    programs = list(db.programmes.find({"$text": {"$search": query}}))
    return programs or [{"message": "No matching programs found."}]


def book_session(payload):
    if isinstance(payload, str):
        return {"error": "Expected JSON payload for booking."}
    member_id = payload.get("member_id")
    coach_id = payload.get("coach_id")
    session_date = payload.get("session_date")
    if not member_id or not coach_id or not session_date:
        return {"error": "member_id, coach_id and session_date are required."}
    booking = {
        "member_id": member_id,
        "coach_id": coach_id,
        "session_date": session_date,
        "status": "pending"
    }
    result = db.seances.insert_one(booking)
    return {"message": "Session booked", "booking_id": str(result.inserted_id)}
