DEV_COMPOSE = docker compose -f compose.dev.yml
PROD_COMPOSE = docker compose -f compose.prod.yml

.PHONY: init dev up down logs lint test typecheck build clean dev-reset prod-smoke prod-down

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

clean:
	$(DEV_COMPOSE) down -v --remove-orphans
