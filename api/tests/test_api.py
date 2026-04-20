from contextlib import asynccontextmanager
from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.main import app as production_app
from app.models import AnalyticsEventCreate, LeadCreate, SessionCreate, WebhookCreate


class InMemoryLeadRepository:
    def __init__(self) -> None:
        self.items = []

    def create(self, lead: LeadCreate):
        record = type(
            "LeadRecord",
            (),
            {"id": uuid4(), "submitted_at": datetime(2024, 1, 1, tzinfo=timezone.utc)},
        )()
        self.items.append(lead)
        return record


class InMemorySessionRepository:
    def create(self, session: SessionCreate):
        return type(
            "SessionRecord",
            (),
            {
                "id": uuid4(),
                "started_at": datetime(2024, 1, 1, tzinfo=timezone.utc),
                "page": session.page,
            },
        )()


class InMemoryAnalyticsRepository:
    def create(self, event: AnalyticsEventCreate):
        return type(
            "AnalyticsEventRecord",
            (),
            {
                "id": uuid4(),
                "event_type": event.event_type,
                "created_at": datetime(2024, 1, 1, tzinfo=timezone.utc),
            },
        )()


class InMemoryWebhookRepository:
    def create(self, webhook: WebhookCreate):
        return type(
            "WebhookRecord",
            (),
            {
                "id": uuid4(),
                "event": webhook.event,
                "processed_at": datetime(2024, 1, 1, tzinfo=timezone.utc),
                "status": "processed",
            },
        )()


def create_test_app() -> FastAPI:
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        app.state.leads = InMemoryLeadRepository()
        app.state.sessions = InMemorySessionRepository()
        app.state.analytics = InMemoryAnalyticsRepository()
        app.state.webhooks = InMemoryWebhookRepository()
        yield

    test_app = FastAPI(lifespan=lifespan)
    for route in production_app.routes:
        test_app.router.routes.append(route)
    return test_app


def test_healthcheck():
    with TestClient(create_test_app()) as client:
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


def test_create_lead():
    with TestClient(create_test_app()) as client:
        response = client.post(
            "/api/v1/leads",
            json={
                "name": "Иван",
                "company": "OSNOVA",
                "contact": "ivan@example.com",
                "message": "Нужно объединить legacy и AI процессы в одну платформу.",
                "consent": True,
                "source_page": "landing",
            },
        )
        assert response.status_code == 201
        assert response.json()["status"] == "accepted"


def test_create_lead_requires_consent():
    with TestClient(create_test_app()) as client:
        response = client.post(
            "/api/v1/leads",
            json={
                "name": "Иван",
                "company": "OSNOVA",
                "contact": "ivan@example.com",
                "message": "Нужно объединить legacy и AI процессы в одну платформу.",
                "consent": False,
                "source_page": "landing",
            },
        )
        assert response.status_code == 422

def test_create_session():
    with TestClient(create_test_app()) as client:
        response = client.post(
            "/api/v1/sessions",
            json={
                "page": "landing",
                "user_agent": "Test Agent",
                "ip_address": "127.0.0.1"
            }
        )
        assert response.status_code == 201
        data = response.json()
        assert "id" in data
        assert data["page"] == "landing"


def test_create_analytics_event():
    with TestClient(create_test_app()) as client:
        response = client.post(
            "/api/v1/analytics",
            json={
                "event_type": "page_view",
                "event_data": {"page": "landing"},
                "page": "landing"
            }
        )
        assert response.status_code == 201
        data = response.json()
        assert "id" in data
        assert data["event_type"] == "page_view"


def test_create_webhook():
    with TestClient(create_test_app()) as client:
        response = client.post(
            "/api/v1/webhooks",
            json={
                "event": "lead_created",
                "payload": {"lead_id": "123"},
                "source": "crm"
            }
        )
        assert response.status_code == 201
        data = response.json()
        assert "id" in data
        assert data["event"] == "lead_created"
        assert data["status"] == "processed"


def test_create_demo_session():
    with TestClient(create_test_app()) as client:
        response = client.post("/api/v1/demo-sessions")
        assert response.status_code == 201
        data = response.json()
        assert "session_id" in data
        assert "message" in data
