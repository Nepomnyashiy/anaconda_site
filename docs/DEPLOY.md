# Деплой и запуск окружений

## Dev-окружение

Запуск локальной инфраструктуры:

```bash
docker compose -f infra/compose.dev.yml up -d --build
```

## pgAdmin (Управление PostgreSQL через UI)

После запуска инфраструктуры:

Откройте:
http://localhost:${PGADMIN_PORT}

Вход:
Email: ${PGADMIN_EMAIL}
Пароль: ${PGADMIN_PASSWORD}

Примечание:
В продакшене доступ к pgAdmin должен быть защищён.
