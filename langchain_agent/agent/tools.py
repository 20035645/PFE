from langchain.tools import Tool
from services.mongo_client import get_member_profile, get_training_programs, book_session


def get_member_profile_tool():
    return Tool(
        name="member_profile",
        func=lambda member_id: get_member_profile(member_id),
        description="Retrieve a gym member profile from MongoDB by user id.",
    )


def get_program_tool():
    return Tool(
        name="training_programs",
        func=lambda query: get_training_programs(query),
        description="Retrieve training program information or recommend a program based on a simple query.",
    )


def get_booking_tool():
    return Tool(
        name="book_session",
        func=lambda payload: book_session(payload),
        description="Book a session for a member; payload should include member id, coach id, and session details.",
    )
