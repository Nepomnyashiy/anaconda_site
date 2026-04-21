import { LeadForm } from "@/components/lead-form";
import { PlatformDemo } from "@/components/platform-demo";
import {
  architecturePoints,
  advantages,
  deliveryPillars,
  flowSteps,
  metrics,
  nextSteps,
  trustSignals,
  useCases,
} from "@/lib/content";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-neutral-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,229,209,0.12),_transparent_45%)]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32">
          <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
            Digital Symbiont Platform
          </div>
          <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.05em] text-neutral-50 md:text-7xl">
            Превращаем хаос коммуникаций, данных и AI-инструментов в управляемую операционную систему бизнеса.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-300 md:text-xl">
            ANACONDA / OSNOVA объединяет legacy-системы, события, документы и AI-контур в одну operational memory
            layer, где бизнес получает контроль, а команда работает из единого контекста.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#architecture"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400"
            >
              Смотреть архитектуру
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
            >
              Обсудить внедрение
            </a>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <article key={metric.label} className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-elevation-2">
                <div className="text-3xl font-semibold text-neutral-50">{metric.value}</div>
                <p className="mt-3 text-sm leading-6 text-neutral-400">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="border-y border-neutral-900 bg-neutral-950/70">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Платформа</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-neutral-50 md:text-5xl">
              Сначала убираем хаос, затем включаем orchestration, AI и контроль.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              Платформа строится не как очередной чат или CRM-слой, а как рабочая business nervous system: источник
              контекста, операционной памяти и управляемого расширения для enterprise-среды.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {flowSteps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 shadow-elevation-2">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Шаг {index + 1}</div>
                <h3 className="mt-4 text-2xl font-semibold text-neutral-50">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-neutral-400">{step.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map((item) => (
              <article key={item.title} className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6">
                <h3 className="text-xl font-semibold text-neutral-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="py-4">
        <div className="mx-auto max-w-6xl px-6 pt-16 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Архитектурный контур</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-neutral-50 md:text-5xl">
                Один управляемый surface для narrative, public API и platform support-заделов.
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-300">
                Текущая реализация опирается на Next.js frontend, FastAPI backend и PostgreSQL persistence. Публичный
                сайт использует стабильный lead-flow, а support-endpoint&apos;ы и data layer остаются готовыми к
                следующей очереди разработки без размывания границ продукта.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-8">
              <div className="space-y-4 text-sm text-neutral-300">
                {architecturePoints.map((point) => (
                  <div key={point} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3 rounded-3xl border border-neutral-800 bg-neutral-950/80 p-5 text-sm text-neutral-400">
                {trustSignals.map((signal) => (
                  <div key={signal}>{signal}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <PlatformDemo />
      </section>

      <section id="delivery" className="border-y border-neutral-900 bg-neutral-950/70">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Разработка</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-neutral-50 md:text-5xl">
              Готовим платформенный сайт к росту, а не к разовому красивому релизу.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              Контур разработки фиксирует единый UX, прозрачные runtime-правила, воспроизводимый локальный запуск и
              production-safe deploy. Это база для следующих этапов, а не временная сборка из несовместимых частей.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {advantages.map((item) => (
              <article key={item.title} className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 shadow-elevation-2">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">{item.accent}</div>
                <h3 className="mt-4 text-2xl font-semibold text-neutral-50">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-neutral-400">{item.outcome}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {deliveryPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6">
                <h3 className="text-xl font-semibold text-neutral-50">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-400">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Контакт</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-neutral-50 md:text-5xl">
              Соберем следующий архитектурный шаг под ваш контур.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              На первом контакте нам нужен только минимальный проектный контекст. После этого можно переходить к
              пилоту, схеме интеграций и проработке on-prem требований.
            </p>

            <div className="mt-8 space-y-4 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Что будет дальше</div>
              {nextSteps.map((step) => (
                <div key={step} className="flex gap-3 text-sm leading-7 text-neutral-400">
                  <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <LeadForm />
        </div>
      </section>
    </main>
  );
}
