from langchain_core.tools import tool

from services.mongo_client import book_session, get_member_profile, get_training_programs


@tool
def member_profile(member_id: str) -> str:
    """
    Fetch this gym's member profile from the database (not for general fitness advice).
    Use when the user asks about their account, subscription, or stored profile data.
    """
    return get_member_profile(member_id)


@tool
def training_programs(query: str) -> str:
    """
    Search programmes registered at THIS gym (MongoDB), not general workout knowledge.
    Use when the user asks what programmes/classes/plans the club offers.
    """
    return get_training_programs(query)


@tool
def book_gym_session(
    member_id: str,
    coach_id: str,
    session_date: str,
    heure: str = "18:00",
    capacite: int = 10,
) -> str:
    """
    Book a session at THIS gym only (not for general training tips).
    session_date: ISO date (e.g. 2026-05-25).
    heure: time string (default 18:00).
    capacite: max participants (default 10).
    """
    return book_session(
        member_id=member_id,
        coach_id=coach_id,
        session_date=session_date,
        heure=heure,
        capacite=capacite,
    )


def get_tools():
    return [member_profile, training_programs, book_gym_session]
