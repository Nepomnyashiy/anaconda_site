# Local Deployment

## Prerequisites

- Docker
- Docker Compose plugin
- GNU Make

## Start

```bash
make init
make dev
```

## Detached mode

```bash
make up
make logs
make down
```

## Production-like local run

```bash
make prod-smoke
make prod-down
```

## Useful notes

- `web` использует hot reload через примонтированную директорию в `compose.dev.yml`.
- `api` запускается с `uvicorn --reload` и применяет SQL-миграции при старте.
- Для локального просмотра БД можно поднять `pgweb` через debug profile.
