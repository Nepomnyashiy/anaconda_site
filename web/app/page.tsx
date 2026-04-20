const platformProblems = [
  {
    title: "Разрозненные коммуникации",
    description: "Почта, мессенджеры, CRM и таблицы живут в разных контурах и разрывают операционный поток.",
  },
  {
    title: "Отсутствие оперативной памяти",
    description: "Контекст по клиенту и процессу теряется между сотрудниками, системами и сменами.",
  },
  {
    title: "AI без оркестрации",
    description: "LLM-инструменты запускаются точечно и не встраиваются в контролируемую корпоративную архитектуру.",
  },
];

export default function Home() {
  return (
    <main className="bg-neutral-950 text-neutral-50">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32">
        <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
          Digital Symbiont Platform
        </div>
        <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-neutral-50 md:text-7xl">
          Превращаем хаос коммуникаций в управляемую операционную систему бизнеса.
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-300 md:text-xl">
          ANACONDA объединяет коммуникации, события и AI-контур в защищенную on-premise платформу,
          где сотрудник работает из одного окна, а бизнес получает единую operational memory layer.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#architecture"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400"
          >
            Смотреть архитектуру
          </a>
          <a
            href="#narrative"
            className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
          >
            Понять подход
          </a>
        </div>
      </section>

      <section id="narrative" className="border-y border-neutral-900 bg-neutral-950/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3 md:px-10">
          {platformProblems.map((problem) => (
            <article
              key={problem.title}
              className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 shadow-elevation-2"
            >
              <h2 className="text-2xl font-semibold text-neutral-50">{problem.title}</h2>
              <p className="mt-4 text-base leading-7 text-neutral-400">{problem.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="architecture" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Архитектурный контур</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-neutral-50 md:text-5xl">
              Chat-centric middleware над существующим enterprise-ландшафтом.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              Платформа объединяет FastAPI backend, event-driven integrations, PostgreSQL + vector-ready data layer,
              Redis message bus и модульные UI surfaces. Цель не заменить legacy, а связать его в управляемый слой
              orchestration, observability и AI augmentation.
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-8">
            <div className="space-y-5 text-sm text-neutral-300">
              <div>
                <div className="font-semibold text-neutral-100">Frontend</div>
                <div className="mt-1">Next.js / TypeScript / Tailwind для narrative-driven enterprise surface.</div>
              </div>
              <div>
                <div className="font-semibold text-neutral-100">Backend</div>
                <div className="mt-1">FastAPI API layer для leads, sessions, analytics, webhooks и будущих product sandboxes.</div>
              </div>
              <div>
                <div className="font-semibold text-neutral-100">Deployment</div>
                <div className="mt-1">Docker Compose runtime, host-level Nginx, release-based deploy и GitHub-driven CI/CD.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

