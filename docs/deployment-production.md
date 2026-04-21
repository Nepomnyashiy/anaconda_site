# Production Deployment

## Топология

- host: `45.38.23.152`
- public entrypoint: `http://45.38.23.152`
- `nginx` работает на host и проксирует:
  - `127.0.0.1:3000` -> `web`
  - `127.0.0.1:8000` -> `api`
- application runtime: `docker compose -f compose.prod.yml`

Текущий baseline дает production-safe HTTP runtime, но не считается завершенным TLS/domain hardening.

## Production env contract

Минимально нужны:
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- `APP_ENV`
- `CORS_ALLOWED_ORIGINS`

Рабочий template: `.env.prod.example`

## Bootstrap host

```bash
ROOT_PASSWORD='...' ./infra/scripts/bootstrap_server.sh 45.38.23.152
```

Bootstrap готовит:
- `deploy` user
- Docker Engine + Compose plugin
- `nginx`
- UFW
- fail2ban
- unattended upgrades
- 2G swapfile
- `/opt/anaconda-site/releases`
- `/opt/anaconda-site/shared/env`
- `/opt/anaconda-site/shared/backups`

## Manual deploy

1. Подготовить локальный `.env.prod`
2. Выполнить:

```bash
SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/deploy_release.sh deploy@45.38.23.152
```

3. Проверить:

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

Операторские команды с этой машины:

```bash
make prod-status TARGET=deploy@45.38.23.152
make prod-releases TARGET=deploy@45.38.23.152
make prod-deploy TARGET=deploy@45.38.23.152
make prod-rollback TARGET=deploy@45.38.23.152 RELEASE_ID=<release-id>
```

## GitHub Actions deploy

`deploy` job запускается только при:
- push в `main`
- наличии всех `PROD_*` secrets

Если secrets отсутствуют, CI все равно выполняет build/test/smoke, но production deploy пропускается.

Предпочтительный production flow:
1. локально пройти проверки;
2. отправить изменения в branch;
3. слить в `main`;
4. проверить GitHub Actions deploy;
5. использовать manual deploy только как fallback или emergency path.

## Rollback behavior

- deploy script переключает `current` на новый release;
- если healthcheck не проходит, script пытается автоматически откатиться на предыдущий release;
- при необходимости можно выполнить ручной rollback через предыдущий `RELEASE_ID`.
