# Operations Runbook

## Purpose

Runbook покрывает базовые operational действия для локального и production контура `ANACONDA / OSNOVA`.

## Топология

- `web` — Next.js runtime
- `api` — FastAPI runtime
- `postgres` — persistence
- production host `nginx` проксирует:
  - `127.0.0.1:3000` -> `web`
  - `127.0.0.1:8000` -> `api`

## Базовая локальная диагностика

```bash
make up
make logs
make down
```

Production-like локальная проверка:

```bash
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
```

Проверка портов:

```bash
ss -ltnp '( sport = :3000 or sport = :8000 or sport = :8081 )'
docker ps --format '{{.Names}} {{.Ports}}'
```

## Production диагностика

### Health checks

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

### Runtime checks on host

```bash
docker compose -f /opt/anaconda-site/current/compose.prod.yml --env-file /opt/anaconda-site/shared/env/.env.prod ps
docker compose -f /opt/anaconda-site/current/compose.prod.yml --env-file /opt/anaconda-site/shared/env/.env.prod logs --tail=200
```

### Nginx checks

```bash
sudo nginx -t
sudo systemctl status nginx
```

## Типовые инциденты

### Сайт не отвечает

- проверить `curl` до `/`
- проверить контейнер `web`
- проверить `nginx` и loopback binding на `127.0.0.1:3000`
- проверить, что `current` указывает на ожидаемый release

### API unhealthy

- проверить `curl` до `/api/v1/health`
- проверить `DATABASE_URL`
- проверить миграции и доступность `postgres`
- снять логи `api`

### Лиды не отправляются

- проверить, что `web` отправляет JSON в `POST /api/v1/leads`
- проверить CORS и `NEXT_PUBLIC_API_URL`
- проверить логи `api` и наличие новых записей в `leads`

### Deploy failed

- проверить GitHub Actions run или manual deploy log
- проверить наличие release directory
- проверить env file на host
- убедиться, что сработал автоматический rollback, если healthcheck нового релиза не прошел

## Backup

- backup script: `infra/scripts/backup_postgres.sh`
- backup path on host: `/opt/anaconda-site/shared/backups`

Restore выполняется отдельно от release pipeline и только после фиксации текущего incident state.
