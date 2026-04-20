#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-/opt/anaconda-site}"
RELEASE_ID="${RELEASE_ID:-}"
RELEASE_DIR="${RELEASE_DIR:-${APP_ROOT}/releases/${RELEASE_ID}}"
CURRENT_LINK="${APP_ROOT}/current"
ENV_PATH="${ENV_PATH:-${APP_ROOT}/shared/env/.env.prod}"

if [[ -z "$RELEASE_ID" && ! -d "$RELEASE_DIR" ]]; then
  echo "RELEASE_ID or RELEASE_DIR is required"
  exit 1
fi

if [[ ! -f "$ENV_PATH" ]]; then
  echo "env file not found: $ENV_PATH"
  exit 1
fi

ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"
cp "$ENV_PATH" "${CURRENT_LINK}/.env.prod"

docker compose -f "${CURRENT_LINK}/compose.prod.yml" --env-file "$ENV_PATH" up -d --build --remove-orphans

for _ in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:8000/api/v1/health >/tmp/anaconda-api-health.json && curl -fsS http://127.0.0.1:3000 >/tmp/anaconda-site.html; then
    exit 0
  fi
  sleep 2
done

echo "Deployment health checks failed"
exit 1
