#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-/opt/anaconda-site}"
RELEASE_ID="${RELEASE_ID:-}"
RELEASE_DIR="${RELEASE_DIR:-${APP_ROOT}/releases/${RELEASE_ID}}"
CURRENT_LINK="${APP_ROOT}/current"
ENV_PATH="${ENV_PATH:-${APP_ROOT}/shared/env/.env.prod}"
PREVIOUS_RELEASE_DIR=""

if [[ -z "$RELEASE_ID" && ! -d "$RELEASE_DIR" ]]; then
  echo "RELEASE_ID or RELEASE_DIR is required"
  exit 1
fi

if [[ ! -f "$ENV_PATH" ]]; then
  echo "env file not found: $ENV_PATH"
  exit 1
fi

if [[ ! -d "$RELEASE_DIR" ]]; then
  echo "release directory not found: $RELEASE_DIR"
  exit 1
fi

if [[ -L "$CURRENT_LINK" ]]; then
  PREVIOUS_RELEASE_DIR="$(readlink -f "$CURRENT_LINK")"
fi

echo "Deploying release dir: $RELEASE_DIR"
if [[ -n "$PREVIOUS_RELEASE_DIR" ]]; then
  echo "Previous release dir: $PREVIOUS_RELEASE_DIR"
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

if [[ -n "$PREVIOUS_RELEASE_DIR" && -d "$PREVIOUS_RELEASE_DIR" ]]; then
  echo "Rolling back to previous release: $PREVIOUS_RELEASE_DIR"
  ln -sfn "$PREVIOUS_RELEASE_DIR" "$CURRENT_LINK"
  cp "$ENV_PATH" "${CURRENT_LINK}/.env.prod"
  docker compose -f "${CURRENT_LINK}/compose.prod.yml" --env-file "$ENV_PATH" up -d --build --remove-orphans
fi

exit 1
