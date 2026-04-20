"use client";

export function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24 text-neutral-50 md:px-10">
      <section className="rounded-[2rem] border border-neutral-800 bg-neutral-900/60 p-10 shadow-elevation-3">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
          ANACONDA narrative shell
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
          Единая operational memory layer для коммуникаций, AI и legacy-систем.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300">
          Компонент оставлен как стабильная fallback-обертка, пока главная страница и design system
          собираются в production-safe состоянии.
        </p>
      </section>
    </main>
  );
}
