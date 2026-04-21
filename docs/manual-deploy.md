# Пошаговый ручной деплой

Инструкция для ручного production deploy текущего контура `ANACONDA / OSNOVA`.

Текущая production-схема:
- host-level `nginx`
- `docker compose -f compose.prod.yml`
- release directories в `/opt/anaconda-site/releases`
- активный релиз через symlink `/opt/anaconda-site/current`

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

Если нужен другой ключ, передайте `SSH_KEY_PATH=...`.

## 4. Выполнить deploy

```bash
SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/deploy_release.sh deploy@45.38.23.152
```

Что делает скрипт:
- создает новую release directory;
- копирует `.env.prod` на host в shared env;
- архивирует и отправляет код;
- переключает `current` на новый release;
- поднимает `compose.prod.yml`;
- проверяет `site` и `health`;
- пытается автоматически откатиться, если healthcheck не проходит.

Для удобной работы с этой машины доступны также:

```bash
make prod-status TARGET=deploy@45.38.23.152
make prod-releases TARGET=deploy@45.38.23.152
make prod-deploy TARGET=deploy@45.38.23.152
```

## 5. Проверить результат на production

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

На host дополнительно:

```bash
docker compose -f /opt/anaconda-site/current/compose.prod.yml --env-file /opt/anaconda-site/shared/env/.env.prod ps
docker compose -f /opt/anaconda-site/current/compose.prod.yml --env-file /opt/anaconda-site/shared/env/.env.prod logs --tail=200
```

## 6. Если deploy не удался

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

## 7. Ручной rollback

Если автоматический rollback не помог или нужен явный откат:

1. Найдите предыдущий стабильный release:

```bash
SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/list_releases.sh deploy@45.38.23.152
```

2. Запустите откат на него:

```bash
SSH_KEY_PATH=infra/keys/id_ed25519 ./infra/scripts/rollback_release.sh deploy@45.38.23.152 <previous-release-id>
```

3. Повторно проверьте:

```bash
curl -f http://45.38.23.152/
curl -f http://45.38.23.152/api/v1/health
```

## 8. Когда использовать manual deploy

Используйте его, если:
- нужно выполнить первую выкладку;
- GitHub Actions deploy временно недоступен;
- нужно срочно переиграть релиз вручную;
- нужно отладить production runtime вне CI.

Для стандартного потока релизов основным остается GitHub Actions deploy при наличии `PROD_*` secrets.
