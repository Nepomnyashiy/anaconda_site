CREATE TABLE IF NOT EXISTS webhooks (
    id UUID PRIMARY KEY,
    event TEXT NOT NULL,
    payload JSONB DEFAULT '{}',
    source TEXT NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'processed'
);
