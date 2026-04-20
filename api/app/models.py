from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    company: str = Field(min_length=2, max_length=160)
    contact: str = Field(min_length=3, max_length=160)
    message: str = Field(min_length=10, max_length=2000)
    consent: bool
    source_page: str = Field(default="landing", max_length=120)

    @field_validator("consent")
    @classmethod
    def consent_must_be_true(cls, value: bool) -> bool:
        if not value:
            raise ValueError("Consent is required.")
        return value


class LeadResponse(BaseModel):
    id: str
    status: str = "accepted"
    submitted_at: datetime

    model_config = ConfigDict(from_attributes=True)

class SessionCreate(BaseModel):
    user_id: str | None = None
    page: str
    user_agent: str | None = None
    ip_address: str | None = None


class SessionResponse(BaseModel):
    id: str
    started_at: datetime
    page: str

    model_config = ConfigDict(from_attributes=True)


class AnalyticsEventCreate(BaseModel):
    event_type: str
    event_data: dict = Field(default_factory=dict)
    user_id: str | None = None
    session_id: str | None = None
    page: str | None = None


class AnalyticsEventResponse(BaseModel):
    id: str
    event_type: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class WebhookCreate(BaseModel):
    event: str
    payload: dict = Field(default_factory=dict)
    source: str


class WebhookResponse(BaseModel):
    id: str
    event: str
    processed_at: datetime
    status: str = "processed"

    model_config = ConfigDict(from_attributes=True)
