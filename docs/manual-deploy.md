# Пошаговый ручной деплой

Предпочтительный ручной production deploy текущего контура `ANACONDA / OSNOVA` теперь идет через `Ansible`.

Текущая production-схема:
- host-level `nginx`
- `docker compose -f compose.prod.yml`
- release directories в `/opt/anaconda-site/releases`
- активный релиз через symlink `/opt/anaconda-site/current`

## 0. Подготовить inventory

Создайте локальный inventory:

```bash
cp infra/ansible/inventory/hosts.example.yml infra/ansible/inventory/hosts.yml
```

Для текущей схемы на IP `45.38.23.152` inventory может выглядеть так:

```yaml
all:
  children:
    prod:
      hosts:
        anaconda-prod:
          ansible_host: 45.38.23.152
          ansible_user: deploy
          ansible_ssh_private_key_file: infra/keys/id_ed25519
          app_domain: 45.38.23.152
```

## 1. Preconditions

Перед деплоем локально должны пройти:

```bash
make lint
make test
make typecheck
make build
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
make ansible-syntax
```

Если `prod-smoke` запускается локально, dev-контур должен быть остановлен, чтобы не было конфликта портов.

## 2. Проверить production env

Нужен локальный файл `.env.prod`, заполненный по контракту `.env.prod.example`.

Минимально проверьте:
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- `APP_ENV`
- `CORS_ALLOWED_ORIGINS`

## 3. Проверить SSH key

По умолчанию manual deploy использует:

```bash
infra/keys/id_ed25519
```

Если нужен другой ключ, укажите его в `infra/ansible/inventory/hosts.yml`.

## 4. Проверить сервер через Ansible preflight

```bash
make ansible-preflight ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
```

Что проверяет preflight:
- наличие локального `.env.prod`;
- наличие локального приватного SSH ключа;
- наличие обязательных env keys;
- существование `deploy` user;
- существование `{{ app_root }}` и release directories на server;
- доступность `docker`, `docker compose`, `nginx`.

## 5. Выполнить deploy через Ansible

```bash
make ansible-deploy ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
```

Что делает playbook:
- проверяет локальное env и ключ;
- проверяет server runtime и directory layout;
- создает release directory;
- копирует `.env.prod` в `shared/env`;
- упаковывает текущий repo и отправляет релиз на server;
- вызывает `deploy_remote.sh`;
- проверяет `site` и `health`;
- использует release-based auto-rollback, если healthcheck не проходит.

Для удобной работы с этой машины доступны также:

```bash
make ansible-status ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
make ansible-deploy ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
```

Shell-скрипты `prod-status`, `prod-deploy`, `prod-rollback` остаются как fallback.

## 6. Проверить результат на production

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

На host дополнительно:

```bash
docker compose -f /opt/anaconda-site/current/compose.prod.yml --env-file /opt/anaconda-site/shared/env/.env.prod ps
docker compose -f /opt/anaconda-site/current/compose.prod.yml --env-file /opt/anaconda-site/shared/env/.env.prod logs --tail=200
```

## 7. Если deploy не удался

Проверьте:
- существует ли release directory;
- корректен ли `/opt/anaconda-site/shared/env/.env.prod`;
- доступен ли `postgres`;
- отвечает ли `http://127.0.0.1:8000/api/v1/health` на host;
- корректен ли `nginx`:

```bash
sudo nginx -t
sudo systemctl status nginx
```

Также можно сразу посмотреть текущее состояние через:

```bash
make ansible-status ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml
```

## 8. Ручной rollback через Ansible

Если автоматический rollback не помог или нужен явный откат:

1. Найдите предыдущий стабильный release:

```bash
SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/list_releases.sh deploy@45.38.23.152
```

2. Запустите откат на него:

```bash
make ansible-rollback ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml RELEASE_ID=<previous-release-id>
```

3. Повторно проверьте:

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

## 9. Server bootstrap через Ansible

Если server еще не подготовлен:

1. создайте `infra/ansible/inventory/hosts.yml` как выше;
2. выполните bootstrap от `root`:

```bash
make ansible-bootstrap ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml ANSIBLE_ARGS="-u root -k"
```

Если на host нужен `sudo`, а не прямой `root`, используйте:

```bash
make ansible-bootstrap ANSIBLE_INVENTORY=infra/ansible/inventory/hosts.yml ANSIBLE_ARGS="-K"
```

Bootstrap:
- создает `deploy` user;
- добавляет SSH key;
- ставит Docker, `nginx`, UFW, fail2ban;
- создает release directories;
- включает backup cron;
- ужесточает SSH конфиг.

## 10. Когда использовать manual deploy

Используйте его, если:
- нужно выполнить первую выкладку;
- GitHub Actions deploy временно недоступен;
- нужно срочно переиграть релиз вручную;
- нужно отладить production runtime вне CI.

Для стандартного потока релизов основным остается GitHub Actions deploy при наличии `PROD_*` secrets.
