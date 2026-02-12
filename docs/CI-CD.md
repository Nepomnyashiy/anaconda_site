# CI/CD: сборка и публикация Docker-образов в GHCR

## Что реализовано

В проекте добавлен workflow `.github/workflows/build.yml`, который автоматически собирает и публикует Docker-образы сервисов `web` и `api` в GitHub Container Registry (GHCR).

### Триггеры

Workflow запускается при:

- `push` в ветку `main`;
- `push` тега формата `v*` (например, `v1.0.0`).

## Правила тегирования образов

### Для `main`

При push в `main` публикуются теги:

- `latest`
- `sha-<полный_git_sha>`

Примеры:

- `ghcr.io/<org>/<repo>-web:latest`
- `ghcr.io/<org>/<repo>-web:sha-abc123...`
- `ghcr.io/<org>/<repo>-api:latest`
- `ghcr.io/<org>/<repo>-api:sha-abc123...`

### Для релизного тега `vX.Y.Z`

При push тега `v1.2.3` публикуются теги:

- `1.2.3`
- `latest`

Примеры:

- `ghcr.io/<org>/<repo>-web:1.2.3`
- `ghcr.io/<org>/<repo>-api:1.2.3`

## Версионирование приложения

Версия проекта хранится в `api/app/version.py` и должна использоваться API-эндпоинтом `/api/version`.

Рекомендуемый процесс:

1. Обновить версию в `api/app/version.py`.
2. Выполнить commit.
3. Создать git-тег вида `vX.Y.Z`.
4. Отправить commit и тег в репозиторий.

## Как создать релиз

1. Убедиться, что `main` в стабильном состоянии.
2. Обновить версию в `api/app/version.py`.
3. Создать commit с изменениями версии.
4. Создать аннотированный тег:

```bash
git tag -a vX.Y.Z -m "Релиз vX.Y.Z"
```

5. Отправить изменения и тег:

```bash
git push origin main
git push origin vX.Y.Z
```

После отправки тега workflow опубликует semver-теги образов.

## Как проверить публикацию в GHCR

1. Перейти в раздел **Packages** организации/репозитория на GitHub.
2. Найти пакеты:
   - `<repo>-web`
   - `<repo>-api`
3. Проверить наличие ожидаемых тегов (`latest`, `sha-*`, `X.Y.Z`).
4. Дополнительно можно проверить через CLI:

```bash
docker pull ghcr.io/<org>/<repo>-web:latest
docker pull ghcr.io/<org>/<repo>-api:latest
```

## Секреты и доступ

Для публикации используется:

- `GHCR_TOKEN` (если задан в Secrets);
- fallback на `GITHUB_TOKEN` при наличии прав `packages: write`.

Секреты не хранятся в репозитории и передаются только через GitHub Secrets.
