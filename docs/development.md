# Development Guide

## Цель

Этот проект поддерживает не просто сайт, а platform delivery surface для `ANACONDA / OSNOVA`. Любая разработка должна сохранять:
- единую public surface;
- стабильный lead contract;
- воспроизводимый локальный запуск;
- production-safe runtime и deploy discipline;
- актуальную документацию.

## Локальная подготовка

```bash
make init
cp -n .env.test.example .env.test || true
```

Локальный runtime:

```bash
make dev
```

Основные адреса:
- сайт: `http://localhost:3000`
- API docs: `http://localhost:8000/docs`
- internal playground: `http://localhost:3000/components-demo`

## Обязательные проверки

Перед PR:

```bash
make lint
make test
make typecheck
make build
```

Перед релизным изменением или push в `main`:

```bash
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
```

## Правила изменения public surface

- Navbar, CTA и секции landing должны быть синхронизированы.
- Публичный сайт не должен зависеть от нестабильных support endpoint'ов.
- Для отправки лида используется JSON-контракт `POST /api/v1/leads`.
- Если меняется public behavior, нужно обновить:
  - `README.md`
  - `docs/architecture.md`
  - runbook / release docs, если меняется runtime или deploy flow

## Работа с env и runtime

- `.env.example` — локальный baseline
- `.env.test.example` — test/CI baseline
- `.env.prod.example` — production contract без секретов

Если появляется новая runtime-переменная:
1. добавить ее в нужный `*.example`;
2. сверить `compose.dev.yml`, `compose.prod.yml`, CI и docs;
3. убедиться, что локальный и production-like сценарий остаются воспроизводимыми.

## Работа с support API

`sessions`, `analytics`, `webhooks`, `demo-sessions` и `dialogue_history` допускаются как заделы для следующей очереди, но:
- не должны ломать public site;
- должны быть явно документированы;
- не должны маскироваться под уже завершенную пользовательскую функциональность.

## Гигиена репозитория

- Не коммитить локальные env-файлы, private keys, build-артефакты, `memories/` и ad hoc заметки.
- Не оставлять в проекте мертвые страницы, дублирующие narrative-поверхности и неиспользуемые маркетинговые заготовки.
- Если документация противоречит коду, исправлять это в той же задаче, а не “потом”.
