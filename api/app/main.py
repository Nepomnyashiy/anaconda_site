import os
from contextlib import asynccontextmanager
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.models import (
    AnalyticsEventCreate,
    AnalyticsEventResponse,
    LeadCreate,
    LeadResponse,
    SessionCreate,
    SessionResponse,
    WebhookCreate,
    WebhookResponse,
)
from app.repository import (
    PostgresAnalyticsRepository,
    PostgresLeadRepository,
    PostgresSessionRepository,
    PostgresWebhookRepository,
)


def get_allowed_origins() -> list[str]:
    raw_value = os.getenv("CORS_ALLOWED_ORIGINS", "")
    origins = [item.strip() for item in raw_value.split(",") if item.strip()]
    if origins:
        return origins
    return ["http://localhost:3000", "http://127.0.0.1:3000"]


@asynccontextmanager
async def lifespan(app: FastAPI):
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is not set")
    app.state.leads = PostgresLeadRepository(database_url)
    app.state.sessions = PostgresSessionRepository(database_url)
    app.state.analytics = PostgresAnalyticsRepository(database_url)
    app.state.webhooks = PostgresWebhookRepository(database_url)
    yield


app = FastAPI(
    title="OSNOVA API",
    version="0.1.0",
    lifespan=lifespan,
    openapi_tags=[
        {
            "name": "public",
            "description": "Стабильный публичный API для сайта: healthcheck и прием лидов.",
        },
        {
            "name": "platform-support",
            "description": "Future-ready support endpoints для следующих очередей разработки платформы.",
        },
    ],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/health", tags=["public"], summary="Проверить доступность API")
def healthcheck():
    return {"status": "ok"}


@app.post("/api/v1/leads", response_model=LeadResponse, status_code=201, tags=["public"], summary="Создать лид")
def create_lead(payload: LeadCreate, request: Request):
    try:
        record = request.app.state.leads.create(payload)
    except Exception as exc:  # pragma: no cover - defensive API guard
        raise HTTPException(status_code=500, detail="Unable to persist lead") from exc
    return LeadResponse(id=str(record.id), submitted_at=record.submitted_at)

@app.post(
    "/api/v1/sessions",
    response_model=SessionResponse,
    status_code=201,
    tags=["platform-support"],
    summary="Создать platform support session",
)
def create_session(payload: SessionCreate, request: Request):
    try:
        record = request.app.state.sessions.create(payload)
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to create session") from exc
    return SessionResponse(id=str(record.id), started_at=record.started_at, page=record.page)


@app.post(
    "/api/v1/analytics",
    response_model=AnalyticsEventResponse,
    status_code=201,
    tags=["platform-support"],
    summary="Записать analytics event",
)
def create_analytics_event(payload: AnalyticsEventCreate, request: Request):
    try:
        record = request.app.state.analytics.create(payload)
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to create analytics event") from exc
    return AnalyticsEventResponse(id=str(record.id), event_type=record.event_type, created_at=record.created_at)


@app.post(
    "/api/v1/webhooks",
    response_model=WebhookResponse,
    status_code=201,
    tags=["platform-support"],
    summary="Записать входящий webhook",
)
def create_webhook(payload: WebhookCreate, request: Request):
    try:
        record = request.app.state.webhooks.create(payload)
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to process webhook") from exc
    return WebhookResponse(id=str(record.id), event=record.event, processed_at=record.processed_at, status=record.status)

@app.post(
    "/api/v1/demo-sessions",
    status_code=201,
    tags=["platform-support"],
    summary="Создать демо-сессию",
)
def create_demo_session():
    return {"message": "Demo session created", "session_id": str(uuid4())}
