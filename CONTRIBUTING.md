# Contributing

## Development contract

- Use `make init` once to create local env files from examples.
- Use `make dev` for the full local stack and `make up` for detached mode.
- Before opening a PR, run `make lint`, `make test`, `make typecheck`, and `make build`.
- Keep production-only secrets out of the repository. Use `.env.prod` locally and GitHub secrets in CI/CD.
- Do not commit generated artifacts, local memories, private keys, or ad hoc environment files.
- Use `docs/development.md`, `docs/release.md`, and `docs/runbook.md` as the source of truth for local flow, release flow, and operational response.

## Branch and PR flow

- Branch from `main`.
- Keep PRs scoped to one architectural concern: platform web surface, API contract, infra, or CI/CD.
- Use the PR template and document:
  - what changed
  - why it changed
  - which validation commands were executed
- Treat `main` as release-bearing. Pushes to `main` may trigger production deployment when GitHub environment secrets are present.

## Local validation

```bash
make lint
make test
make typecheck
make build
```

For release validation:

```bash
docker compose -f compose.prod.yml config
make prod-smoke
make prod-down
```

## Environment files

- `.env.example` — local development baseline
- `.env.test.example` — isolated test baseline
- `.env.prod.example` — production variable contract without secrets

Copy examples to local working files as needed. Do not commit `.env`, `.env.test`, or `.env.prod`.
