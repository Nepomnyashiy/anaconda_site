# ARCHITECTURE: схема маршрутизации

## Маршрутизация через Nginx site/vhost

Запросы на домен проекта принимает Nginx и маршрутизирует:

- `/` → `web` (по умолчанию `http://127.0.0.1:8080`)
- `/api/` → `api` (по умолчанию `http://127.0.0.1:8000`)
- `/ws/` → `api` (WebSocket с Upgrade-заголовками)

## Точки конфигурации

- Playbook: `ansible/playbooks/site.yml`
- Роль Nginx: `ansible/roles/nginx`
- Vhost шаблон: `ansible/roles/nginx/templates/project_site.conf.j2`

## Примечание по TLS

В текущей задаче TLS не включён.
В конфигурации добавлен placeholder: «TLS будет добавлен на следующем этапе».
