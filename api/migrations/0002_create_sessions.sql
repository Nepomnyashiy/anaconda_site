CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY,
    user_id TEXT,
    page TEXT NOT NULL,
    user_agent TEXT,
    ip_address INET,
    started_at TIMESTAMPTZ NOT NULL
);
