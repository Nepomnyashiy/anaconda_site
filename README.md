# ANACONDA / OSNOVA Website

Платформенный сайт и delivery-контур для `ANACONDA / OSNOVA` как `Digital Symbiont Platform`.

Репозиторий держит одну рабочую public surface:
- marketing / narrative landing;
- стабильный lead-flow через `POST /api/v1/leads`;
- healthcheck для локальной и production-проверки;
- future-ready support API, который сохранен для следующих этапов, но не считается частью текущего публичного контракта сайта.

## Стек

- `web`: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- `api`: FastAPI, Pydantic, Psycopg
- `postgres`: PostgreSQL 16
- runtime: Docker Compose
- production entrypoint: host-level `nginx` + release-based deploy
- CI/CD: GitHub Actions

## Структура репозитория

- `web/` — публичный сайт и внутренний UI playground (`/components-demo`)
- `api/` — публичный и support API, migrations, тесты
- `infra/` — bootstrap, deploy, backup и server scripts
- `docs/` — архитектура, разработка, релизы, эксплуатация
- `dev/roles/` — проектные роли и инженерные директивы

## Быстрый старт

```bash
make init
cp -n .env.test.example .env.test || true
make dev
```

После старта доступны:
- сайт: `http://localhost:3000`
- API docs: `http://localhost:8000/docs`
- internal component playground: `http://localhost:3000/components-demo`
- pgweb: `docker compose -f compose.dev.yml --profile debug up pgweb`

## Основные команды

```bash
make up
make down
make logs
make lint
make test
make typecheck
make build
make prod-smoke
make prod-down
make clean
```

## Что считается стабильным контрактом

Публичный сайт опирается на два обязательных endpoint'а:
- `GET /api/v1/health`
- `POST /api/v1/leads`

Support endpoint'ы (`sessions`, `analytics`, `webhooks`, `demo-sessions`) сохранены в API и документации, но не входят в текущий обязательный public surface сайта.

## Локальная и production-проверка

Минимальный developer gate:

```bash
make lint
make test
make typecheck
make build
```

Production-like проверка:

```bash
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
```

## Production deploy

- bootstrap production host:
  `ROOT_PASSWORD=... ./infra/scripts/bootstrap_server.sh 45.38.23.152`
- manual deploy:
  `SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/deploy_release.sh deploy@45.38.23.152`
- release list:
  `SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/list_releases.sh deploy@45.38.23.152`
- production status:
  `SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/prod_status.sh deploy@45.38.23.152`
- manual rollback:
  `SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/rollback_release.sh deploy@45.38.23.152 <release-id>`

GitHub Actions может выполнить production deploy автоматически при push в `main`, если заданы `PROD_*` secrets.
Также доступен ручной workflow `Production Operations` с операциями `status`, `deploy` и `rollback`.

Предпочтительный поток релиза:
1. локально пройти `make lint test typecheck build` и `make prod-smoke`;
2. запушить изменения в release/feature branch;
3. слить в `main` для GitHub Actions deploy;
4. использовать workflow `Production Operations` для ручного `status/deploy/rollback`;
5. использовать manual deploy и rollback с этой машины только как fallback.

## Документация

- [Архитектура](docs/architecture.md)
- [Локальный запуск](docs/deployment-local.md)
- [Пошаговый локальный запуск](docs/local-deploy-checklist.md)
- [Development guide](docs/development.md)
- [Release guide](docs/release.md)
- [Operations runbook](docs/runbook.md)
- [Production deployment](docs/deployment-production.md)
- [Пошаговый ручной деплой](docs/manual-deploy.md)
- [Server bootstrap](docs/server-bootstrap.md)
- [Motion guidelines](docs/motion-guidelines.md)
- [Contributing](CONTRIBUTING.md)
