CREATE TABLE IF NOT EXISTS dialogue_history (
    id UUID PRIMARY KEY,
    project_id TEXT NOT NULL,
    message TEXT NOT NULL,
    role TEXT NOT NULL, -- 'user' or 'assistant'
    created_at TIMESTAMPTZ NOT NULL,
    embedding JSONB DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_dialogue_history_project_id ON dialogue_history(project_id);
