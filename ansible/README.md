# Ansible (future production workflow)

Planned workflow:

1. Install Docker Engine + Compose plugin on target servers.
2. Copy `infra/compose.dev.yml` (or future prod compose) and root `.env` to `/opt/www-stack`.
3. Run `docker compose up -d` in `/opt/www-stack`.
