#!/usr/bin/env bash
set -euo pipefail

echo "HOSTNAME=$(hostname)"
echo "OS=$(grep '^PRETTY_NAME=' /etc/os-release | cut -d= -f2-)"
echo "KERNEL=$(uname -r)"
echo "UPTIME=$(uptime -p)"
memory="$(free -h | awk '/Mem:/ {print $7 " available of " $2}')"
swap="$(free -h | awk '/Swap:/ {print $3 " used of " $2}')"
disk="$(df -h / | awk 'END {print $4 " free of " $2}')"
echo "MEMORY=${memory}"
echo "SWAP=${swap}"
echo "DISK=${disk}"
echo "PORTS=$(ss -tulpn | awk 'NR>1 {print $5}' | tr '\n' ' ')"
echo "DOCKER=$(command -v docker >/dev/null 2>&1 && docker --version || echo missing)"
echo "NGINX=$(command -v nginx >/dev/null 2>&1 && nginx -v 2>&1 || echo missing)"
echo "UFW=$(command -v ufw >/dev/null 2>&1 && ufw status | sed -n '1,3p' | tr '\n' ' ' || echo missing)"
