# Server Bootstrap

## Назначение

Bootstrap подготавливает минимальный production host для release-based deploy сайта и API.

## Текущий baseline host

- Ubuntu 24.04
- ограниченная RAM, поэтому bootstrap создает swapfile
- вход по SSH
- до bootstrap не гарантируются Docker и `nginx`

## Что делает bootstrap

- создает `deploy` user и добавляет его в `sudo` и `docker`
- настраивает SSH key auth
- ставит Docker Engine + Compose plugin
- ставит `nginx`
- включает UFW
- включает fail2ban
- включает unattended upgrades
- создает `/opt/anaconda-site/releases`
- создает `/opt/anaconda-site/shared/env`
- создает `/opt/anaconda-site/shared/backups`
- создает базовую `nginx` конфигурацию для проксирования `web` и `api`
- добавляет cron backup для PostgreSQL

## Чего bootstrap пока не делает

- не выдает production TLS/domain setup
- не настраивает внешнюю observability stack
- не добавляет полноценный WAF или advanced rate limiting

Это осознанный baseline, а не окончательная enterprise-инфраструктура.

## Связанные файлы

- preferred bootstrap: `infra/ansible/playbooks/bootstrap.yml`
- preferred inventory: `infra/ansible/inventory/hosts.yml`
- local wrapper fallback: `infra/scripts/bootstrap_server.sh`
- remote bootstrap fallback: `infra/scripts/server_bootstrap_remote.sh`
- runtime deploy: `infra/scripts/deploy_remote.sh`
- backup: `infra/scripts/backup_postgres.sh`

## Рекомендуемый запуск

1. создать inventory:

```bash
cp infra/ansible/inventory/hosts.example.yml infra/ansible/inventory/hosts.yml
```

2. выполнить bootstrap:

```bash
make ansible-bootstrap ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml ANSIBLE_ARGS="-u root -k"
```

3. после bootstrap проверить server:

```bash
make ansible-preflight ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
```
