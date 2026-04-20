# Architecture

## Overview

Проект разделен на два приложения:

- `web` отвечает за UX/UI, motion system, SSR-рендер и отправку лидов.
- `api` отвечает за прием лидов, healthcheck и подготовку к будущим интеграциям.

## Runtime

- `web` обращается к `api` по `NEXT_PUBLIC_API_URL`.
- `api` пишет лиды в PostgreSQL через `DATABASE_URL`.
- `compose.dev.yml` и `compose.prod.yml` связывают сервисы внутренней сетью по именам `web`, `api`, `postgres`.
- В production `nginx` на хосте проксирует запросы к контейнерам `web` и `api`.

## Data flow

1. Пользователь заполняет lead-форму на сайте.
2. Frontend валидирует обязательные поля.
3. `POST /api/v1/leads` принимает payload.
4. Backend создает запись в таблице `leads`.
5. Frontend показывает inline success-state.

## Core entities

- `LeadCreate`: входящий payload с `name`, `company`, `contact`, `message`, `consent`, `source_page`.
- `LeadResponse`: ответ API с `id`, `status`, `submitted_at`.
- `LeadRecord`: внутренняя репрезентация записи в репозитории.
- `leads`: таблица PostgreSQL для входящих лидов.

## Future-ready points

- typed content modules можно вынести в headless CMS без пересборки layout-системы;
- API уже отделен от сайта и может расширяться под CRM/webhook integrations;
- маршруты сайта и контентная модель готовы к будущему `i18n`.
