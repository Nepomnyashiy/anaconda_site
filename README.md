# Anaconda WWW + Chat + AI-Ready Monorepo

## Local development

1. Build and start all services:

```bash
docker compose -f infra/compose.dev.yml up -d --build
```

2. Open the app:
   - Web: <http://localhost>
   - API health: <http://localhost/api/health>

3. Stop services:

```bash
docker compose -f infra/compose.dev.yml down
```
