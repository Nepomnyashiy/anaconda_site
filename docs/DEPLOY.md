# DEPLOY: деплой приложения через Ansible

## Inventory

В репозитории хранится только шаблон inventory без секретов:

- `ansible/inventory/hosts.ini.example`

Рабочий файл `ansible/inventory/hosts.ini` в git не хранится и добавлен в `.gitignore`.

### Локальный запуск

1. Скопируйте шаблон:

```bash
cp ansible/inventory/hosts.ini.example ansible/inventory/hosts.ini
```

2. При необходимости скорректируйте параметры хоста/порта/пользователя.
3. Убедитесь, что доступ к серверу выполняется по SSH-ключу.

Запуск playbook локально:

```bash
ansible-playbook -i ansible/inventory/hosts.ini ansible/playbooks/site.yml
```

## CI/CD деплой

Workflow `.github/workflows/blank.yml` автоматически генерирует `ansible/inventory/hosts.ini` из GitHub Secrets.

Важно:
- inventory в CI создаётся перед запуском Ansible;
- SSH-аутентификация выполняется только ключом;
- секреты не попадают в репозиторий и не должны выводиться в логи.

## Переменные окружения для локального docker compose

Для запуска `infra/compose.dev.yml` обязательно должны быть заданы переменные:

- `NGINX_PORT`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`

Пример минимального заполнения (`.env`):

```env
NGINX_PORT=80
POSTGRES_DB=anaconda
POSTGRES_USER=anaconda
POSTGRES_PASSWORD=anaconda_password
```
