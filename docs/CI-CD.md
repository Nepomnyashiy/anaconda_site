# CI/CD: сборка, публикация и деплой

## Сборка и публикация Docker-образов в GHCR

В проекте используется workflow `.github/workflows/build.yml`, который автоматически собирает и публикует Docker-образы сервисов `web` и `api` в GHCR.

### Триггеры сборки

- `push` в `main`;
- `push` тега формата `v*` (например, `v1.0.0`).

## Деплой через Ansible

Деплой выполняется workflow `.github/workflows/blank.yml`.

Команда деплоя:

```bash
ansible-playbook -i ansible/inventory/hosts.ini ansible/playbooks/site.yml
```

### Preflight-проверки в CI

Перед запуском Ansible workflow проверяет:
- наличие `ansible/playbooks/site.yml`;
- наличие `ansible/inventory/hosts.ini`.

Если `hosts.ini` отсутствует, но есть `ansible/inventory/hosts.ini.example`, CI создаёт `hosts.ini` из шаблона.
Если нужных файлов нет — workflow завершается с понятной ошибкой.

## Версионирование приложения

Версия проекта хранится в `api/app/version.py` и должна использоваться API-эндпоинтом `/api/version`.

Рекомендуемый процесс:
1. Обновить версию в `api/app/version.py`.
2. Выполнить commit.
3. Создать git-тег вида `vX.Y.Z`.
4. Отправить commit и тег в репозиторий.
