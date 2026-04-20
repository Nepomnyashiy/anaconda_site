from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Protocol
from uuid import uuid4

import psycopg
from psycopg.rows import dict_row

from app.models import LeadCreate


@dataclass
class LeadRecord:
    id: str
    submitted_at: datetime


class LeadRepository(Protocol):
    def create(self, lead: LeadCreate) -> LeadRecord: ...


class PostgresLeadRepository:
    def __init__(self, database_url: str) -> None:
        self.database_url = database_url

    def create(self, lead: LeadCreate) -> LeadRecord:
        lead_id = str(uuid4())
        submitted_at = datetime.now(tz=timezone.utc)
        with psycopg.connect(self.database_url) as connection:
            with connection.cursor(row_factory=dict_row) as cursor:
                cursor.execute(
                    """
                    INSERT INTO leads (id, name, company, contact, message, consent, source_page, submitted_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, submitted_at
                    """,
                    (
                        lead_id,
                        lead.name,
                        lead.company,
                        lead.contact,
                        lead.message,
                        lead.consent,
                        lead.source_page,
                        submitted_at,
                    ),
                )
                row = cursor.fetchone()
        return LeadRecord(id=str(row["id"]), submitted_at=row["submitted_at"])
