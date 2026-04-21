# Release Guide

## Назначение

Release flow должен выпускать рабочий platform web surface без расхождения между кодом, docs, runtime и deploy-сценарием.

## Release prerequisites

Перед релизом должны быть выполнены:

```bash
make lint
make test
make typecheck
make build
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
make ansible-syntax
```

Также нужно проверить scope релиза:
- public site / narrative changes;
- API contract changes;
- migrations;
- infra / deploy / CI changes;
- env-contract changes.

## Release branch discipline

Предпочтительный поток:
1. собрать релизный scope в отдельной branch;
2. не использовать `git add .`, если worktree смешанный;
3. проверить diff перед commit;
4. слить branch в `main`;
5. считать именно `push` в `main` production trigger.

## GitHub pipeline contract

Pipeline делает:
1. `web` — lint, typecheck, build
2. `api` — lint, tests
3. `smoke` — production-like boot и lead submission
4. `deploy` — только на `main` и только при наличии production secrets
5. `Production Operations` — ручной `status / deploy / rollback` через `workflow_dispatch`

Обязательные secrets:
- `PROD_HOST`
- `PROD_USER`
- `PROD_SSH_PRIVATE_KEY`
- `PROD_ENV_FILE`

Если `deploy` job недоступен или secrets временно невалидны, используйте manual deploy с этой машины.

Рекомендуемые optional variables:
- `PROD_APP_ROOT`
- `PROD_PUBLIC_URL`
- `PROD_API_HEALTH_URL`

## Manual deploy

Предпочтительный ручной релиз через Ansible:

```bash
make ansible-preflight ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
make ansible-deploy ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
```

Более короткий operator flow:

```bash
make ansible-status ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
make ansible-deploy ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
make ansible-status ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
```

Shell deploy scripts остаются fallback для аварийных сценариев и сравнения с предыдущим процессом.

После выкладки нужно проверить:

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

## Rollback

`infra/scripts/deploy_remote.sh` теперь пытается автоматически откатиться на предыдущий release, если новый релиз не проходит healthcheck.

Если нужен ручной rollback:
1. определить предыдущую стабильную release directory на host;
2. выполнить rollback на нее:

```bash
make ansible-rollback ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml RELEASE_ID=<previous-release-id>
```

Rollback обязателен при:
- failed healthcheck;
- runtime regression;
- broken public site;
- incompatibility migrations/runtime.
