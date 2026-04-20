#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-/opt/anaconda-site}"
ENV_PATH="${APP_ROOT}/shared/env/.env.prod"
CURRENT_LINK="${APP_ROOT}/current"
BACKUP_DIR="${APP_ROOT}/shared/backups"

if [[ ! -f "$ENV_PATH" ]]; then
  exit 0
fi

set -a
. "$ENV_PATH"
set +a

mkdir -p "$BACKUP_DIR"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

docker compose -f "${CURRENT_LINK}/compose.prod.yml" --env-file "$ENV_PATH" exec -T postgres \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "${BACKUP_DIR}/postgres-${TIMESTAMP}.sql"

find "$BACKUP_DIR" -type f -name 'postgres-*.sql' -mtime +7 -delete
