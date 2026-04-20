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
