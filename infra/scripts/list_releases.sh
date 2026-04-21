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

echo "Inspecting releases on ${TARGET} (${APP_ROOT})"

ssh "${SSH_OPTS[@]}" "$TARGET" "APP_ROOT='${APP_ROOT}' /bin/bash -s" <<'EOF'
set -euo pipefail

CURRENT_LINK="${APP_ROOT}/current"
CURRENT_TARGET=""

if [[ -L "$CURRENT_LINK" ]]; then
  CURRENT_TARGET="$(readlink -f "$CURRENT_LINK")"
fi

echo "current: ${CURRENT_TARGET:-<none>}"

if [[ ! -d "${APP_ROOT}/releases" ]]; then
  echo "releases directory not found: ${APP_ROOT}/releases"
  exit 1
fi

find "${APP_ROOT}/releases" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort -r | while read -r release_id; do
  release_dir="${APP_ROOT}/releases/${release_id}"
  marker=" "
  if [[ "$release_dir" == "$CURRENT_TARGET" ]]; then
    marker="*"
  fi
  printf '%s %s\n' "$marker" "$release_id"
done
EOF
