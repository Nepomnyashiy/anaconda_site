#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <user@host>"
  exit 1
fi

TARGET="$1"
APP_ROOT="${APP_ROOT:-/opt/anaconda-site}"
SSH_KEY_PATH="${SSH_KEY_PATH:-infra/keys/id_ed25519}"

if [[ ! -f "$SSH_KEY_PATH" ]]; then
  echo "ssh key not found: $SSH_KEY_PATH"
  exit 1
fi

SSH_OPTS=(-i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/tmp/anaconda_known_hosts -o IdentitiesOnly=yes)

echo "Inspecting production status on ${TARGET} (${APP_ROOT})"

ssh "${SSH_OPTS[@]}" "$TARGET" "APP_ROOT='${APP_ROOT}' /bin/bash -s" <<'EOF'
set -euo pipefail

CURRENT_LINK="${APP_ROOT}/current"
ENV_PATH="${APP_ROOT}/shared/env/.env.prod"

if [[ -L "$CURRENT_LINK" ]]; then
  echo "current_release_dir: $(readlink -f "$CURRENT_LINK")"
else
  echo "current_release_dir: <none>"
fi

if [[ -f "$ENV_PATH" && -f "${CURRENT_LINK}/compose.prod.yml" ]]; then
  docker compose -f "${CURRENT_LINK}/compose.prod.yml" --env-file "$ENV_PATH" ps
else
  echo "compose or env not found for current release"
fi

echo
echo "api_health:"
curl -fsS http://127.0.0.1:8000/api/v1/health || true
echo
echo
echo "site_check:"
curl -fsS -o /dev/null -w 'HTTP %{http_code}\n' http://127.0.0.1:3000 || true
EOF
