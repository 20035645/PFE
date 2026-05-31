from __future__ import annotations

import sys
from datetime import datetime
from pathlib import Path
from pprint import pprint

from pymongo import MongoClient

# Ensure project root is on sys.path so `python scripts/seed_programmes.py` works
project_root = Path(__file__).resolve().parents[1]
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from config.settings import settings


def _default_programs():
    return [
        {
            "name": "Beginner Full Body",
            "description": "A gentle introduction covering all major muscle groups.",
            "niveau": "Beginner",
            "duration_weeks": 4,
            "created_at": datetime.utcnow(),
        },
        {
            "name": "Intermediate Strength",
            "description": "Focus on compound lifts and progressive overload.",
            "niveau": "Intermediate",
            "duration_weeks": 8,
            "created_at": datetime.utcnow(),
        },
        {
            "name": "Advanced Hypertrophy",
            "description": "Higher volume work for muscle growth and conditioning.",
            "niveau": "Advanced",
            "duration_weeks": 12,
            "created_at": datetime.utcnow(),
        },
        {
            "name": "Cardio Blast",
            "description": "Short, intense cardio sessions to improve stamina.",
            "niveau": "All",
            "duration_weeks": 6,
            "created_at": datetime.utcnow(),
        },
        {
            "name": "Mobility & Recovery",
            "description": "Stretching and mobility routines to reduce injury risk.",
            "niveau": "All",
            "duration_weeks": 3,
            "created_at": datetime.utcnow(),
        },
    ]


def seed_and_list(clear_first: bool = False, limit: int = 20):
    """Insert mock programmes into the `programmes` collection and print them.

    Args:
        clear_first: if True, deletes existing documents in `programmes` before inserting.
        limit: how many documents to list after seeding.
    """
    client = MongoClient(settings.mongo_uri)
    db = client.get_default_database()

    if clear_first:
        print("Clearing existing programmes collection...")
        db.programmes.delete_many({})

    programs = _default_programs()
    result = db.programmes.insert_many(programs)
    print(f"Inserted {len(result.inserted_ids)} programmes.")

    print("Listing programmes:")
    for doc in db.programmes.find().limit(limit):
        # Convert ObjectId and datetime for readable output
        doc = dict(doc)
        if "_id" in doc:
            doc["_id"] = str(doc["_id"])
        if "created_at" in doc and hasattr(doc["created_at"], "isoformat"):
            doc["created_at"] = doc["created_at"].isoformat()
        pprint(doc)


if __name__ == "__main__":
    # By default clear existing entries to get a predictable dataset
    seed_and_list(clear_first=True)
