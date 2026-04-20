#!/usr/bin/env bash
set -euo pipefail

DEPLOY_USER="${DEPLOY_USER:-deploy}"
APP_ROOT="${APP_ROOT:-/opt/anaconda-site}"
APP_DOMAIN="${APP_DOMAIN:-45.38.23.152}"
PUBLIC_KEY_B64="${PUBLIC_KEY_B64:-}"

if [[ -z "$PUBLIC_KEY_B64" ]]; then
  echo "PUBLIC_KEY_B64 is required"
  exit 1
fi

PUBLIC_KEY="$(printf '%s' "$PUBLIC_KEY_B64" | base64 -d)"

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y ca-certificates curl fail2ban git nginx ufw unattended-upgrades

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

if ! swapon --show | grep -q .; then
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '^/swapfile ' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

id -u "$DEPLOY_USER" >/dev/null 2>&1 || useradd -m -s /bin/bash "$DEPLOY_USER"
usermod -aG sudo,docker "$DEPLOY_USER"

install -d -m 700 /root/.ssh "/home/${DEPLOY_USER}/.ssh"
printf '%s\n' "$PUBLIC_KEY" >> /root/.ssh/authorized_keys
printf '%s\n' "$PUBLIC_KEY" >> "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chmod 600 /root/.ssh/authorized_keys "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "/home/${DEPLOY_USER}/.ssh"

install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" "${APP_ROOT}" "${APP_ROOT}/releases" "${APP_ROOT}/shared" "${APP_ROOT}/shared/env" "${APP_ROOT}/shared/backups"

cat >/etc/nginx/sites-available/anaconda-site <<NGINX
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 2m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
}
NGINX

ln -sfn /etc/nginx/sites-available/anaconda-site /etc/nginx/sites-enabled/anaconda-site
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable --now nginx

ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

systemctl enable --now fail2ban unattended-upgrades

sed -i 's/^#\?PasswordAuthentication .*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#\?PermitRootLogin .*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sshd -t
systemctl restart ssh

cat >/etc/cron.d/anaconda-site-backup <<CRON
0 2 * * * root APP_ROOT=${APP_ROOT} /bin/bash ${APP_ROOT}/current/infra/scripts/backup_postgres.sh >> /var/log/anaconda-site-backup.log 2>&1
CRON
