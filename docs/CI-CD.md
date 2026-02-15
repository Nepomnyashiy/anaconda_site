# CI/CD: сборка, публикация и деплой

## Сборка и публикация Docker-образов в GHCR

В проекте используется workflow `.github/workflows/build.yml`, который автоматически собирает и публикует Docker-образы сервисов `web` и `api` в GHCR.

### Триггеры сборки

- `push` в `main`;
- `push` тега формата `v*` (например, `v1.0.0`).

Примечание: в workflow имена owner/repository для GHCR приводятся к нижнему регистру, чтобы избежать ошибки Docker `repository name must be lowercase`.

## Деплой через Ansible

Деплой выполняется workflow `.github/workflows/blank.yml`.

Перед запуском `ansible-playbook` workflow:
- создаёт SSH-ключ из секрета `DEPLOY_SSH_KEY`;
- добавляет сервер в `known_hosts` через `ssh-keyscan` (с учётом `DEPLOY_PORT`);
- генерирует `ansible/inventory/hosts.ini` из secrets/переменных окружения;
- запускает fail-fast проверки обязательных файлов и ролей.

### Secrets для деплоя

Для корректной работы деплоя нужно настроить следующие GitHub Secrets:

- `DEPLOY_HOST` — адрес сервера (опционально, по умолчанию `31.59.106.120`);
- `DEPLOY_USER` — SSH-пользователь (опционально, по умолчанию `deploy`);

- `DEPLOY_SSH_KEY` — приватный SSH-ключ (multiline);
- `DEPLOY_PORT` — SSH-порт (опционально, по умолчанию `22`, проверяется в CI как число в диапазоне `1..65535`).

## Preflight-проверки в CI

Перед деплоем workflow проверяет:
- наличие `ansible/inventory/hosts.ini`;
- наличие `ansible/playbooks/site.yml`;
- наличие ролей `ansible/roles/base`, `ansible/roles/deploy`, `ansible/roles/nginx`.

При отсутствии любого обязательного файла/каталога job завершается с понятной ошибкой на русском языке.
