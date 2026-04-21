# Operations Runbook

## Purpose

Этот runbook описывает operational actions для локальной диагностики и production support контура `ANACONDA / OSNOVA` web surface.

## System topology

- `web` — Next.js runtime
- `api` — FastAPI runtime
- `postgres` — persistence layer
- `nginx` на production host проксирует:
  - `127.0.0.1:3000` -> `web`
  - `127.0.0.1:8000` -> `api`

## Local diagnostics

### Validate developer stack

```bash
make up
make logs
make down
```

### Validate production compose contract

```bash
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
```

### Port checks

Если runtime не стартует, сначала проверить занятые порты:

```bash
ss -ltnp '( sport = :3000 or sport = :8000 or sport = :8081 )'
docker ps --format '{{.Names}} {{.Ports}}'
```

## Production diagnostics

### Health endpoints

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

### Container/runtime checks on host

```bash
docker compose -f /opt/anaconda-site/current/compose.prod.yml --env-file /opt/anaconda-site/shared/env/.env.prod ps
docker compose -f /opt/anaconda-site/current/compose.prod.yml --env-file /opt/anaconda-site/shared/env/.env.prod logs --tail=200
```

### Nginx checks

```bash
sudo nginx -t
sudo systemctl status nginx
```

## Incident classes

### Build or deploy failure

- проверить GitHub Actions run
- проверить доступность `PROD_*` secrets
- проверить SSH connectivity до production host
- проверить наличие release директории на host

### API unhealthy

- проверить `DATABASE_URL`
- проверить применение миграций при старте `api`
- проверить доступность `postgres`
- снять логи `api`

### Frontend unavailable

- проверить, слушает ли `web` контейнер `3000`
- проверить `NEXT_PUBLIC_*` переменные
- проверить `nginx` proxy config

### Port collision

- определить owner процесса через `ss -ltnp`
- убрать временные smoke containers
- не останавливать несвязанные сервисы без подтвержденного ownership

## Backup and restore notes

- backup script: `infra/scripts/backup_postgres.sh`
- shared backup path on host: `/opt/anaconda-site/shared/backups`

Любая операция restore должна проводиться отдельно от release pipeline и только после фиксации текущего incident state.
