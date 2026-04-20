CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    contact TEXT NOT NULL,
    message TEXT NOT NULL,
    consent BOOLEAN NOT NULL,
    source_page TEXT NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL
);
