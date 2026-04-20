#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: ROOT_PASSWORD=... $0 <host>"
  exit 1
fi

TARGET="$1"
ROOT_PASSWORD="${ROOT_PASSWORD:-}"
PUBKEY_PATH="${PUBKEY_PATH:-infra/keys/id_ed25519.pub}"
APP_DOMAIN="${APP_DOMAIN:-$TARGET}"

if [[ -z "$ROOT_PASSWORD" ]]; then
  echo "ROOT_PASSWORD is required"
  exit 1
fi

if [[ ! -f "$PUBKEY_PATH" ]]; then
  echo "public key not found: $PUBKEY_PATH"
  exit 1
fi

PUBLIC_KEY_B64="$(base64 -w0 "$PUBKEY_PATH")"

sshpass -p "$ROOT_PASSWORD" ssh -o StrictHostKeyChecking=no root@"$TARGET" \
  "PUBLIC_KEY_B64='$PUBLIC_KEY_B64' APP_DOMAIN='$APP_DOMAIN' bash -s" \
  < infra/scripts/server_bootstrap_remote.sh

echo "Server bootstrap completed on $TARGET"
