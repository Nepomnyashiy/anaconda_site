# Production Deployment

## Topology

- Production host: `45.38.23.152`
- Public entrypoint for first release: `http://45.38.23.152`
- `nginx` runs on the host and proxies to:
  - `127.0.0.1:3000` for `web`
  - `127.0.0.1:8000` for `api`
- Application runtime is `docker compose -f compose.prod.yml`

## Bootstrap

Run the local bootstrap wrapper once:

```bash
ROOT_PASSWORD='...' ./infra/scripts/bootstrap_server.sh 45.38.23.152
```

It installs Docker, Nginx, UFW, fail2ban, unattended upgrades, a 2G swapfile, creates `deploy`, configures SSH key auth, prepares `/opt/anaconda-site`, and writes the Nginx site config.

## Manual first deploy

1. Create local `.env.prod`.
2. Run:

```bash
SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/deploy_release.sh deploy@45.38.23.152
```

3. Smoke test:

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

## GitHub Actions

`Pipeline` runs on every PR and on pushes to `main`.

- `web`: lint, typecheck, build
- `api`: lint, tests
- `smoke`: boots the production stack and posts a test lead
- `deploy`: runs only on `main` and only if these repository secrets exist:
  - `PROD_HOST`
  - `PROD_USER`
  - `PROD_SSH_PRIVATE_KEY`
  - `PROD_ENV_FILE`

Without those secrets, deploy is skipped but CI still runs.

## Rollback

Rollback is release-based:

1. SSH to the server as `deploy`.
2. Point `current` symlink to the previous release directory.
3. Re-run:

```bash
APP_ROOT=/opt/anaconda-site RELEASE_ID=<previous-release-id> /bin/bash /opt/anaconda-site/current/infra/scripts/deploy_remote.sh
```
