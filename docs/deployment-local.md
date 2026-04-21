# Local Deployment

## Prerequisites

- Docker
- Docker Compose plugin
- GNU Make

## Подготовка env

```bash
make init
cp -n .env.test.example .env.test || true
```

## Основной запуск

```bash
make dev
```

После старта проверьте:
- `http://localhost:3000`
- `http://localhost:8000/docs`
- `http://localhost:8000/api/v1/health`

## Detached mode

```bash
make up
make logs
make down
```

## Production-like локальная проверка

```bash
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
```

## Дополнительные проверки

- internal UI playground: `http://localhost:3000/components-demo`
- pgweb:

```bash
docker compose -f compose.dev.yml --profile debug up pgweb
```

## Что важно помнить

- `web` использует bind mount и `next dev`.
- `api` стартует через `uvicorn --reload` и применяет migrations при запуске контейнера.
- Публичный сайт должен работать через `POST /api/v1/leads` с JSON payload, без multipart-вложений.
