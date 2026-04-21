#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <user@host>"
  exit 1
fi

TARGET="$1"
APP_ROOT="${APP_ROOT:-/opt/anaconda-site}"
ENV_FILE="${ENV_FILE:-.env.prod}"
RELEASE_ID="${RELEASE_ID:-$(git rev-parse --short HEAD 2>/dev/null || date +%Y%m%d%H%M%S)}"
SSH_KEY_PATH="${SSH_KEY_PATH:-infra/keys/id_ed25519}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "production env file not found: $ENV_FILE"
  exit 1
fi

if [[ ! -f "$SSH_KEY_PATH" ]]; then
  echo "ssh key not found: $SSH_KEY_PATH"
  exit 1
fi

SSH_OPTS=(-i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/tmp/anaconda_known_hosts -o IdentitiesOnly=yes)

echo "Deploying release ${RELEASE_ID} to ${TARGET}"
echo "App root: ${APP_ROOT}"
echo "Env file: ${ENV_FILE}"

ssh "${SSH_OPTS[@]}" "$TARGET" "mkdir -p ${APP_ROOT}/releases/${RELEASE_ID} ${APP_ROOT}/shared/env"
cat "$ENV_FILE" | ssh "${SSH_OPTS[@]}" "$TARGET" "cat > ${APP_ROOT}/shared/env/.env.prod"

tar \
  --exclude=.git \
  --exclude=.github \
  --exclude=docs \
  --exclude=dev \
  --exclude=references \
  --exclude=node_modules \
  --exclude=web/node_modules \
  --exclude=web/.next \
  --exclude=api/.pytest_cache \
  --exclude=api/.ruff_cache \
  --exclude=codex.md \
  --exclude=.env \
  --exclude=.env.prod \
  --exclude=infra/keys/id_ed25519 \
  -czf - . | ssh "${SSH_OPTS[@]}" "$TARGET" "tar -xzf - -C ${APP_ROOT}/releases/${RELEASE_ID}"

ssh "${SSH_OPTS[@]}" "$TARGET" "APP_ROOT=${APP_ROOT} RELEASE_ID=${RELEASE_ID} /bin/bash ${APP_ROOT}/releases/${RELEASE_ID}/infra/scripts/deploy_remote.sh"

echo "Deployment command completed for release ${RELEASE_ID}"
