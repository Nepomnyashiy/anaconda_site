# Anaconda Site

Статический React/Vite-сайт для `https://anaconda.godny.tech`.

## Локальная разработка

```bash
npm ci
npm run dev
```

Сайт не требует API keys или runtime `.env`. Секреты нельзя передавать через
Vite: frontend bundle доступен каждому посетителю. Будущие AI-интеграции должны
вызывать отдельный server-side API.

## Проверки

```bash
npm run build
npm audit
```

## Production image

```bash
docker build -t anaconda-site:local .
docker run --rm -p 18080:8080 anaconda-site:local
curl -fsS http://127.0.0.1:18080/healthz
```

Image использует multi-stage build и unprivileged Nginx на порту `8080`.
Kubernetes manifests и edge routing находятся в репозитории `zuer_sysadmin`.
