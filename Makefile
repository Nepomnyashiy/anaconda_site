DEV_COMPOSE = docker compose -f compose.dev.yml
PROD_COMPOSE = docker compose -f compose.prod.yml
TARGET ?=
RELEASE_ID ?=
SSH_KEY_PATH ?= infra/keys/id_ed25519

.PHONY: init dev up down logs lint test typecheck build clean dev-reset prod-smoke prod-down prod-status prod-releases prod-deploy prod-rollback

init:
	cp -n .env.example .env || true
	cp -n .env.prod.example .env.prod || true

dev:
	$(DEV_COMPOSE) up --build

up:
	$(DEV_COMPOSE) up -d --build

down:
	$(DEV_COMPOSE) down

logs:
	$(DEV_COMPOSE) logs -f

lint:
	$(DEV_COMPOSE) run --rm --no-deps web npm run lint
	$(DEV_COMPOSE) run --rm --no-deps api ruff check app tests

test:
	$(DEV_COMPOSE) run --rm --no-deps api pytest

typecheck:
	$(DEV_COMPOSE) run --rm --no-deps web npm run typecheck

build:
	$(DEV_COMPOSE) build

dev-reset:
	$(DEV_COMPOSE) down -v --remove-orphans
	$(DEV_COMPOSE) up --build

prod-smoke:
	$(PROD_COMPOSE) up --build -d

prod-down:
	$(PROD_COMPOSE) down

prod-status:
	@if [ -z "$(TARGET)" ]; then echo "usage: make prod-status TARGET=deploy@host"; exit 1; fi
	SSH_KEY_PATH="$(SSH_KEY_PATH)" ./infra/scripts/prod_status.sh "$(TARGET)"

prod-releases:
	@if [ -z "$(TARGET)" ]; then echo "usage: make prod-releases TARGET=deploy@host"; exit 1; fi
	SSH_KEY_PATH="$(SSH_KEY_PATH)" ./infra/scripts/list_releases.sh "$(TARGET)"

prod-deploy:
	@if [ -z "$(TARGET)" ]; then echo "usage: make prod-deploy TARGET=deploy@host"; exit 1; fi
	SSH_KEY_PATH="$(SSH_KEY_PATH)" ./infra/scripts/deploy_release.sh "$(TARGET)"

prod-rollback:
	@if [ -z "$(TARGET)" ] || [ -z "$(RELEASE_ID)" ]; then echo "usage: make prod-rollback TARGET=deploy@host RELEASE_ID=<release-id>"; exit 1; fi
	SSH_KEY_PATH="$(SSH_KEY_PATH)" ./infra/scripts/rollback_release.sh "$(TARGET)" "$(RELEASE_ID)"

clean:
	$(DEV_COMPOSE) down -v --remove-orphans
