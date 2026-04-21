# OSNOVA Website

Маркетинговый сайт ОСНОВА ИТ с локальным запуском через `docker compose`.

## Stack

- `web`: Next.js, TypeScript, Tailwind CSS, Framer Motion
- `api`: FastAPI
- `db`: PostgreSQL

## Quick start

```bash
make init
cp -n .env.test.example .env.test || true
make dev
```

Сервисы будут доступны по адресам:

- сайт: `http://localhost:3000`
- API: `http://localhost:8000/docs`
- pgweb: `docker compose --profile debug up pgweb`

## Main commands

```bash
make up
make down
make logs
make lint
make test
make typecheck
make build
make prod-smoke
make clean
```

## Developer workflow

- local runbook: [Development guide](docs/development.md)
- release playbook: [Release guide](docs/release.md)
- operations runbook: [Operations runbook](docs/runbook.md)
- contribution rules: [Contributing](CONTRIBUTING.md)
- test env template: `.env.test.example`

## Deployment

- bootstrap production host: `ROOT_PASSWORD=... ./infra/scripts/bootstrap_server.sh 45.38.23.152`
- first manual production deploy: `SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/deploy_release.sh deploy@45.38.23.152`

## Docs

- [Local deployment](docs/deployment-local.md)
- [Architecture](docs/architecture.md)
- [Development guide](docs/development.md)
- [Release guide](docs/release.md)
- [Operations runbook](docs/runbook.md)
- [Production deployment](docs/deployment-production.md)
- [Server bootstrap](docs/server-bootstrap.md)
- [Motion guidelines](docs/motion-guidelines.md)
