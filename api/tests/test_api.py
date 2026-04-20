from contextlib import asynccontextmanager
from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.main import app as production_app
from app.models import LeadCreate


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


def create_test_app() -> FastAPI:
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        app.state.leads = InMemoryLeadRepository()
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
