from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Protocol
from uuid import uuid4

import psycopg
from psycopg.rows import dict_row

from app.models import AnalyticsEventCreate, LeadCreate, SessionCreate, WebhookCreate


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

@dataclass
class SessionRecord:
    id: str
    started_at: datetime
    page: str


@dataclass
class AnalyticsEventRecord:
    id: str
    event_type: str
    created_at: datetime


@dataclass
class WebhookRecord:
    id: str
    event: str
    processed_at: datetime
    status: str


class SessionRepository(Protocol):
    def create(self, session: SessionCreate) -> SessionRecord: ...


class AnalyticsRepository(Protocol):
    def create(self, event: AnalyticsEventCreate) -> AnalyticsEventRecord: ...


class WebhookRepository(Protocol):
    def create(self, webhook: WebhookCreate) -> WebhookRecord: ...


class PostgresSessionRepository:
    def __init__(self, database_url: str) -> None:
        self.database_url = database_url

    def create(self, session: SessionCreate) -> SessionRecord:
        session_id = str(uuid4())
        started_at = datetime.now(tz=timezone.utc)
        with psycopg.connect(self.database_url) as connection:
            with connection.cursor(row_factory=dict_row) as cursor:
                cursor.execute(
                    """
                    INSERT INTO sessions (id, user_id, page, user_agent, ip_address, started_at)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id, started_at, page
                    """,
                    (
                        session_id,
                        session.user_id,
                        session.page,
                        session.user_agent,
                        session.ip_address,
                        started_at,
                    ),
                )
                row = cursor.fetchone()
        return SessionRecord(id=str(row["id"]), started_at=row["started_at"], page=row["page"])


class PostgresAnalyticsRepository:
    def __init__(self, database_url: str) -> None:
        self.database_url = database_url

    def create(self, event: AnalyticsEventCreate) -> AnalyticsEventRecord:
        event_id = str(uuid4())
        created_at = datetime.now(tz=timezone.utc)
        with psycopg.connect(self.database_url) as connection:
            with connection.cursor(row_factory=dict_row) as cursor:
                cursor.execute(
                    """
                    INSERT INTO analytics_events (id, event_type, event_data, user_id, session_id, page, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, event_type, created_at
                    """,
                    (
                        event_id,
                        event.event_type,
                        psycopg.types.json.Jsonb(event.event_data),
                        event.user_id,
                        event.session_id,
                        event.page,
                        created_at,
                    ),
                )
                row = cursor.fetchone()
        return AnalyticsEventRecord(id=str(row["id"]), event_type=row["event_type"], created_at=row["created_at"])


class PostgresWebhookRepository:
    def __init__(self, database_url: str) -> None:
        self.database_url = database_url

    def create(self, webhook: WebhookCreate) -> WebhookRecord:
        webhook_id = str(uuid4())
        processed_at = datetime.now(tz=timezone.utc)
        with psycopg.connect(self.database_url) as connection:
            with connection.cursor(row_factory=dict_row) as cursor:
                cursor.execute(
                    """
                    INSERT INTO webhooks (id, event, payload, source, processed_at, status)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id, event, processed_at, status
                    """,
                    (
                        webhook_id,
                        webhook.event,
                        psycopg.types.json.Jsonb(webhook.payload),
                        webhook.source,
                        processed_at,
                        "processed",
                    ),
                )
                row = cursor.fetchone()
        return WebhookRecord(id=str(row["id"]), event=row["event"], processed_at=row["processed_at"], status=row["status"])
