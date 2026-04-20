CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    user_id TEXT,
    session_id TEXT,
    page TEXT,
    created_at TIMESTAMPTZ NOT NULL
);
