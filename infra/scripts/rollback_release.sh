#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <user@host> <release-id>"
  exit 1
fi

TARGET="$1"
RELEASE_ID="$2"
APP_ROOT="${APP_ROOT:-/opt/anaconda-site}"
SSH_KEY_PATH="${SSH_KEY_PATH:-infra/keys/id_ed25519}"

if [[ ! -f "$SSH_KEY_PATH" ]]; then
  echo "ssh key not found: $SSH_KEY_PATH"
  exit 1
fi

SSH_OPTS=(-i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/tmp/anaconda_known_hosts -o IdentitiesOnly=yes)

echo "Rolling back ${TARGET} to release ${RELEASE_ID}"

ssh "${SSH_OPTS[@]}" "$TARGET" "APP_ROOT='${APP_ROOT}' RELEASE_ID='${RELEASE_ID}' /bin/bash '${APP_ROOT}/releases/${RELEASE_ID}/infra/scripts/deploy_remote.sh'"
