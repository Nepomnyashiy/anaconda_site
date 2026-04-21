# Development Guide

## Purpose

Этот проект — platform web surface для `ANACONDA / OSNOVA`. Разработка должна поддерживать не просто сайт, а enterprise-ready контур: narrative layer, API support, release discipline и production-safe CI/CD.

## Local setup

1. Инициализировать env-файлы:

```bash
make init
cp -n .env.test.example .env.test || true
```

2. Поднять локальный контур:

```bash
make dev
```

3. Проверить доступность:

- site: `http://localhost:3000`
- API docs: `http://localhost:8000/docs`

## Quality gates

Минимальный developer gate перед PR:

```bash
make lint
make test
make typecheck
make build
```

Релизный gate перед push в `main`:

```bash
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
```

## Runtime model

- `web` — Next.js SSR/static surface
- `api` — FastAPI layer for leads and platform support endpoints
- `postgres` — primary persistence
- `compose.dev.yml` — local developer topology
- `compose.prod.yml` — production runtime contract

## Environment model

- `.env.example` покрывает локальную разработку
- `.env.test.example` нужен для изолированных test/CI сценариев
- `.env.prod.example` фиксирует production variable contract без секретов

Если появляется новая runtime-переменная:

1. добавить ее в соответствующий `*.example`
2. обновить `README.md` или этот runbook, если меняется developer flow
3. проверить `compose.dev.yml`, `compose.prod.yml` и GitHub workflows

## Release notes for developers

- Push в `main` может запустить production deploy job в GitHub Actions.
- Любые infra/CI изменения нужно валидировать не только локально, но и на уровне release artifact.
- Нерелизные локальные файлы (`memories/`, ad hoc notes, private keys) не должны попадать в коммиты.
