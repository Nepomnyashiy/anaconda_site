# Server Bootstrap

## Host audit

Current baseline for `45.38.23.152` before bootstrap:

- Ubuntu 24.04
- ~1 GB RAM
- no swap
- Docker missing
- Nginx missing
- only SSH exposed

Because of low RAM, bootstrap enables a swapfile before production builds.

## Bootstrap result

The bootstrap script prepares:

- `deploy` user with `sudo` and `docker` access
- SSH key auth
- Docker Engine + Compose plugin
- Nginx
- UFW
- fail2ban
- unattended upgrades
- `/opt/anaconda-site/releases`
- `/opt/anaconda-site/shared/env`
- `/opt/anaconda-site/shared/backups`

## Files used

- local wrapper: `infra/scripts/bootstrap_server.sh`
- remote bootstrap: `infra/scripts/server_bootstrap_remote.sh`
- server audit: `infra/scripts/server_audit.sh`
- runtime deploy: `infra/scripts/deploy_remote.sh`
- backup: `infra/scripts/backup_postgres.sh`
