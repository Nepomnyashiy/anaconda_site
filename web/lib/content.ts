export const metrics = [
  { value: "8-12 недель", label: "до первого интеграционного результата" },
  { value: "On-prem", label: "развертывание в закрытых и смешанных контурах" },
  { value: "AI-ready", label: "единая база для copilots, automation и аналитики" }
];

export const flowSteps = [
  {
    title: "Диагностируем хаос",
    body: "Фиксируем разрывы между каналами, системами и командами, где контекст теряется и решения принимаются с задержкой."
  },
  {
    title: "Подключаем источники",
    body: "1С, ERP, CRM, таблицы и коммуникации сводятся в единый управляемый контур без лобового переписывания legacy."
  },
  {
    title: "Нормализуем память",
    body: "OSNOVA Core превращает разрозненные данные и события в общую operational memory layer для процессов и людей."
  },
  {
    title: "Включаем AI и контроль",
    body: "AI-оркестрация, аналитика и workflow опираются на единую базу фактов, а не на копии таблиц и частные сценарии."
  }
];

export const advantages = [
  {
    title: "Единый product surface",
    outcome: "Маркетинговая и платформенная narrative-поверхность собирается в один поддерживаемый контур без дублирования и расхождений.",
    accent: "Surface"
  },
  {
    title: "Прозрачный runtime-контракт",
    outcome: "Next.js, FastAPI и PostgreSQL работают в одном воспроизводимом dev/prod pipeline с понятными env и healthchecks.",
    accent: "Runtime"
  },
  {
    title: "Release discipline",
    outcome: "GitHub Actions, smoke-проверки, release-based deploy и rollback-процедуры готовят проект к дальнейшей разработке без хаотичных выкладок.",
    accent: "Release"
  },
  {
    title: "Future-ready backend",
    outcome: "Стабильный публичный API отделен от platform-support заделов, поэтому проект можно расширять без размывания границ продукта.",
    accent: "API"
  },
  {
    title: "Предсказуемая эксплуатация",
    outcome: "Host Nginx, docker compose, backup-скрипты и runbook дают базовый production-safe контур для поддержки и роста.",
    accent: "Ops"
  }
];

export const useCases = [
  {
    title: "Централизация данных предприятия",
    body: "Сводим ERP, учетные системы, BI и документы в один операционный контур."
  },
  {
    title: "AI-помощники для сотрудников",
    body: "Подключаем безопасных copilots к вашей внутренней модели данных и процессам."
  },
  {
    title: "Управляемая автоматизация",
    body: "Встраиваем workflow и event-driven интеграции без хрупких ручных сценариев."
  }
];

export const architecturePoints = [
  "Adapters для legacy и корпоративных систем",
  "OSNOVA Core как слой нормализации и orchestration",
  "FastAPI + PostgreSQL как публичный и support API слой",
  "Управляемая эксплуатация, release discipline и production hardening"
];

export const trustSignals = [
  "Docker Compose для локального и production-like запуска",
  "GitHub Actions: lint, typecheck, tests, smoke, deploy",
  "Nginx reverse proxy и release-based deploy на production host"
];

export const deliveryPillars = [
  {
    title: "Локальная воспроизводимость",
    body: "Проект поднимается через `make init`, `make dev` и `make up`, без скрытых ручных шагов и разрыва между docs и runtime."
  },
  {
    title: "Стабильный публичный API",
    body: "Для сайта обязательными остаются `GET /api/v1/health` и `POST /api/v1/leads`, а support-endpoint'ы документируются отдельно."
  },
  {
    title: "Безопасный production baseline",
    body: "Host-level `nginx`, loopback runtime, env-contract, healthchecks, backup и rollback дисциплина фиксируются как часть эксплуатационного контура."
  }
];

export const nextSteps = [
  "Соберем исходные точки хаоса: каналы связи, учетные системы, документы и ручные процессы.",
  "Покажем минимальный архитектурный сценарий внедрения под ваш контур и требования к безопасности.",
  "Подготовим roadmap для пилота, интеграций и последующего AI-расширения."
];
