# Deploy (Local Dev)

## Prerequisites
- Docker
- Docker Compose plugin

## Start stack

```bash
docker compose -f infra/compose.dev.yml up -d --build
```

## Verify
- Open <http://localhost>
- Check API health: <http://localhost/api/health>
