# Architecture

## Назначение

Репозиторий реализует platform web surface для `ANACONDA / OSNOVA`:
- narrative-driven landing;
- стабильный public API для лида и healthcheck;
- support API и data layer как задел для следующих этапов;
- локальный и production runtime, пригодный для дальнейшей разработки и поставки.

## Подсистемы

### `web`

Отвечает за:
- публичную landing-поверхность;
- narrative-блоки и UX-каркас;
- вызов `POST /api/v1/leads`;
- внутренний playground маршрутом `/components-demo`.

Стек:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

### `api`

Отвечает за:
- стабильный публичный API для сайта;
- support endpoint'ы для следующих этапов;
- доступ к PostgreSQL через repository layer;
- применение SQL-migrations при старте runtime.

Стек:
- FastAPI
- Pydantic v2
- Psycopg 3

### `postgres`

Primary persistence для:
- лидов;
- support session / analytics / webhook событий;
- dialogue history задела.

## Публичный и support API

### Стабильный public API

- `GET /api/v1/health`
- `POST /api/v1/leads`

Текущий public lead contract:
- `name`
- `company`
- `contact`
- `message`
- `consent`
- `source_page`

Публичный сайт использует JSON payload без файловых вложений.

### Future-ready support API

- `POST /api/v1/sessions`
- `POST /api/v1/analytics`
- `POST /api/v1/webhooks`
- `POST /api/v1/demo-sessions`

Эти endpoint'ы сохранены в проекте, но не считаются частью обязательного public surface текущего сайта.

## Доменная и data-карта

Основные сущности:
- `LeadCreate` / `LeadResponse`
- `SessionCreate` / `SessionResponse`
- `AnalyticsEventCreate` / `AnalyticsEventResponse`
- `WebhookCreate` / `WebhookResponse`

Текущие таблицы:
- `leads`
- `sessions`
- `analytics_events`
- `webhooks`
- `dialogue_history`
- `schema_migrations`

`dialogue_history` сейчас не используется публичным сайтом, но остается как platform-support задел для следующих очередей.

## Data flow public сайта

1. Пользователь открывает landing и проходит narrative-блоки.
2. Пользователь заполняет lead-форму.
3. Frontend валидирует обязательные поля.
4. `web` отправляет JSON в `POST /api/v1/leads`.
5. `api` сохраняет запись в `leads`.
6. Frontend показывает inline feedback по результату отправки.

## Runtime topology

### Локально

- `web` доступен на `:3000`
- `api` доступен на `:8000`
- `postgres` доступен через internal compose network и проброс `POSTGRES_PORT`
- optional `pgweb` поднимается debug profile'ом

### Production

- host-level `nginx` принимает внешний HTTP-трафик
- `nginx` проксирует:
  - `127.0.0.1:3000` -> `web`
  - `127.0.0.1:8000` -> `api`
- `compose.prod.yml` поднимает `web`, `api`, `postgres`
- deploy идет через release directories и symlink `current`

## Engineering boundaries

- Public site должен зависеть только от стабильного lead-flow и healthcheck.
- Support API можно развивать отдельно, не ломая public surface.
- Документация, env-contract, compose-файлы и CI/CD должны описывать одну и ту же систему.
- Любое изменение public contract требует обновления docs и smoke-сценариев.
