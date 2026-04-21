DEV_COMPOSE = docker compose -f compose.dev.yml
PROD_COMPOSE = docker compose -f compose.prod.yml
ANSIBLE_DIR = infra/ansible
TARGET ?=
RELEASE_ID ?=
SSH_KEY_PATH ?= infra/keys/id_ed25519
ANSIBLE_INVENTORY ?= $(ANSIBLE_DIR)/inventory/hosts.yml
ANSIBLE_LIMIT ?= prod
ANSIBLE_ARGS ?=
ANSIBLE_CONFIG ?= $(ANSIBLE_DIR)/ansible.cfg

.PHONY: init dev up down logs lint test typecheck build clean dev-reset prod-smoke prod-down prod-status prod-releases prod-deploy prod-rollback ansible-syntax ansible-preflight ansible-bootstrap ansible-deploy ansible-status ansible-rollback

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

ansible-syntax:
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_DIR)/inventory/hosts.example.yml $(ANSIBLE_DIR)/playbooks/bootstrap.yml --syntax-check
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_DIR)/inventory/hosts.example.yml $(ANSIBLE_DIR)/playbooks/preflight.yml --syntax-check
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_DIR)/inventory/hosts.example.yml $(ANSIBLE_DIR)/playbooks/deploy.yml --syntax-check
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_DIR)/inventory/hosts.example.yml $(ANSIBLE_DIR)/playbooks/status.yml --syntax-check
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_DIR)/inventory/hosts.example.yml $(ANSIBLE_DIR)/playbooks/rollback.yml --syntax-check

ansible-preflight:
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_INVENTORY) $(ANSIBLE_DIR)/playbooks/preflight.yml --limit "$(ANSIBLE_LIMIT)" $(ANSIBLE_ARGS)

ansible-bootstrap:
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_INVENTORY) $(ANSIBLE_DIR)/playbooks/bootstrap.yml --limit "$(ANSIBLE_LIMIT)" $(ANSIBLE_ARGS)

ansible-deploy:
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_INVENTORY) $(ANSIBLE_DIR)/playbooks/deploy.yml --limit "$(ANSIBLE_LIMIT)" $(ANSIBLE_ARGS)

ansible-status:
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_INVENTORY) $(ANSIBLE_DIR)/playbooks/status.yml --limit "$(ANSIBLE_LIMIT)" $(ANSIBLE_ARGS)

ansible-rollback:
	@if [ -z "$(RELEASE_ID)" ]; then echo "usage: make ansible-rollback RELEASE_ID=<release-id> [ANSIBLE_INVENTORY=...]"; exit 1; fi
	ANSIBLE_CONFIG="$(ANSIBLE_CONFIG)" ansible-playbook -i $(ANSIBLE_INVENTORY) $(ANSIBLE_DIR)/playbooks/rollback.yml --limit "$(ANSIBLE_LIMIT)" -e "release_id=$(RELEASE_ID)" $(ANSIBLE_ARGS)

clean:
	$(DEV_COMPOSE) down -v --remove-orphans
