# Release Guide

## Purpose

Этот документ фиксирует release flow для platform web surface `ANACONDA / OSNOVA`. Его задача — не допускать прямого выхода на production без проверяемого artifact, smoke-gates и rollback-плана.

## Release prerequisites

Перед релизом должны быть выполнены:

- локальные quality gates:
  - `make lint`
  - `make test`
  - `make typecheck`
  - `make build`
- production artifact validation:
  - `docker compose -f compose.prod.yml config`
  - `make prod-smoke`
  - `make prod-down`
- review release scope:
  - backend/API changes
  - migrations
  - frontend runtime changes
  - CI/CD or deploy changes

## Release artifact

Release-bearing branch: `main`.

Любой push в `main` следует считать кандидатом на production deployment при наличии GitHub environment secrets:

- `PROD_HOST`
- `PROD_USER`
- `PROD_SSH_PRIVATE_KEY`
- `PROD_ENV_FILE`

Релизный commit должен быть:

- buildable
- testable
- compatible with current production topology
- сопровожден rollback strategy при infra/runtime изменениях

## GitHub pipeline contract

Pipeline выполняет:

1. `web` — lint, typecheck, build
2. `api` — lint, tests
3. `smoke` — подъем production stack в CI и test lead submission
4. `deploy` — только для `main` и только при наличии production secrets

Если `deploy` не стартует:

- проверить, что push ушел именно в `main`
- проверить GitHub environment `production`
- проверить наличие всех `PROD_*` secrets

## Manual release fallback

Если GitHub deploy временно недоступен, manual fallback:

```bash
SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/deploy_release.sh deploy@45.38.23.152
```

После ручного релиза обязательно проверить:

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

## Rollback

Rollback выполняется через release directories и symlink `current`.

Шаги:

1. определить предыдущий стабильный release id на хосте
2. переключить `current` на предыдущий release
3. заново выполнить runtime deploy:

```bash
APP_ROOT=/opt/anaconda-site RELEASE_ID=<previous-release-id> /bin/bash /opt/anaconda-site/current/infra/scripts/deploy_remote.sh
```

Rollback должен использоваться при:

- failed healthcheck
- runtime regression after deploy
- migration/runtime incompatibility
- broken frontend or API entrypoint
