# Пошаговый локальный запуск

Эта инструкция фиксирует **единственный рекомендуемый способ** локального запуска проекта: только через Docker Compose.

Не используйте старый host-level запуск через `npm run dev` или ad hoc `uvicorn` вне контейнеров. Публичный локальный контур должен подниматься только docker-схемой проекта.

## 1. Проверить prerequisites

Нужны:
- Docker
- Docker Compose plugin
- GNU Make

Проверка:

```bash
docker --version
docker compose version
make --version
```

## 2. Подготовить env-файлы

В корне репозитория:

```bash
make init
cp -n .env.test.example .env.test || true
```

После этого должны существовать:
- `.env`
- `.env.prod`
- `.env.test`

## 3. Проверить, что порты свободны

Проект использует локально:
- `3000` — `web`
- `8000` — `api`
- `5433` — `postgres` из dev docker-контура

Проверка:

```bash
ss -ltnp '( sport = :3000 or sport = :8000 or sport = :5433 )'
```

Если на `3000` висит старый `next dev`, его нужно остановить до запуска docker-контура.

## 4. Поднять проект

Для обычной разработки:

```bash
make up
```

Для foreground-режима:

```bash
make dev
```

## 5. Проверить, что контур поднялся

Проверки:

```bash
curl -f http://127.0.0.1:3000
curl -f http://127.0.0.1:8000/api/v1/health
curl -f http://127.0.0.1:8000/docs
docker ps --format '{{.Names}} {{.Status}} {{.Ports}}' | sort
```

Ожидаемые контейнеры:
- `anaconda_site-web-1`
- `anaconda_site-api-1`
- `anaconda_site-postgres-1`

## 6. Smoke-проверка лида

```bash
curl -f -X POST http://127.0.0.1:8000/api/v1/leads \
  -H 'Content-Type: application/json' \
  -d '{"name":"Local Smoke","company":"OSNOVA","contact":"local@example.com","message":"Проверка локального лида после docker-развертывания.","consent":true,"source_page":"local-smoke"}'
```

Ожидаемый ответ: JSON с `id`, `status: accepted`, `submitted_at`.

## 7. Полезные команды

Логи:

```bash
make logs
```

Остановить стек:

```bash
make down
```

Полная очистка docker-контуров проекта:

```bash
make clean
```

## 8. Production-like локальная проверка

Важно: перед `prod-smoke` dev-контур на `3000/8000` должен быть остановлен, иначе будет конфликт портов.

Порядок:

```bash
make down
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
```

## 9. Если что-то пошло не так

### Порт занят

Проверить владельца:

```bash
ss -ltnp '( sport = :3000 or sport = :8000 )'
```

### Контейнеры поднялись, но сайт не открывается

```bash
docker compose -f compose.dev.yml ps
docker compose -f compose.dev.yml logs --tail=200
```

### Нужно убрать старые локальные артефакты

```bash
make clean
```

Если раньше запускали `next dev` напрямую, сначала остановите этот процесс, затем поднимайте проект только через Docker.
