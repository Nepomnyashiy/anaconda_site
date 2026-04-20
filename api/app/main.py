import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.models import LeadCreate, LeadResponse
from app.repository import PostgresLeadRepository


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
    yield


app = FastAPI(title="OSNOVA API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/health")
def healthcheck():
    return {"status": "ok"}


@app.post("/api/v1/leads", response_model=LeadResponse, status_code=201)
def create_lead(payload: LeadCreate, request: Request):
    try:
        record = request.app.state.leads.create(payload)
    except Exception as exc:  # pragma: no cover - defensive API guard
        raise HTTPException(status_code=500, detail="Unable to persist lead") from exc
    return LeadResponse(id=str(record.id), submitted_at=record.submitted_at)
