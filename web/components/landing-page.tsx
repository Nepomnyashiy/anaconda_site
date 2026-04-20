"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Bubble = {
  label: string;
  accent: string;
  startX: number;
  startY: number;
  rotate: number;
  size: number;
};

type Plan = {
  level: string;
  title: string;
  body: string;
  note: string;
};

type QuickQuestion = {
  id: string;
  label: string;
  answer: string;
};

type Shard = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const bubbles: Bubble[] = [
  { label: "Excel", accent: "таблицы", startX: -320, startY: -220, rotate: -12, size: 116 },
  { label: "1C", accent: "учет", startX: 300, startY: -180, rotate: 10, size: 120 },
  { label: "Microsoft Office", accent: "документы", startX: -340, startY: -20, rotate: -8, size: 168 },
  { label: "Legacy CRM", accent: "лиды", startX: 350, startY: 10, rotate: 14, size: 142 },
  { label: "Email", accent: "входящие", startX: -280, startY: 170, rotate: -16, size: 114 },
  { label: "База данных", accent: "контакты", startX: 250, startY: 210, rotate: 8, size: 150 },
  { label: "Старый ERP", accent: "процессы", startX: -70, startY: 260, rotate: 7, size: 132 },
  { label: "PDF / сканы", accent: "архив", startX: 20, startY: -280, rotate: -6, size: 138 }
];

const plans: Plan[] = [
  {
    level: "01",
    title: "Единое окно лидов",
    body: "Объединяем мессенджеры, почту, формы и любые точки входа в один рабочий контур без переключения между окнами.",
    note: "Быстрый старт для продаж и клиентского сервиса."
  },
  {
    level: "02",
    title: "Интеграция с legacy и мини-CRM",
    body: "Подключаем существующие системы, карточки клиентов, историю коммуникаций и базовое ведение сделок без ломки текущего ландшафта.",
    note: "Появляется прозрачный маршрут от лида до оплаты."
  },
  {
    level: "03",
    title: "Аналитика и мотивация отдела продаж",
    body: "Делаем отчёты для руководства, быстрые сводки в мессенджеры, KPI, аналитику по менеджерам и оперативный контроль активности.",
    note: "Подходит для управляемого роста отдела."
  },
  {
    level: "04",
    title: "AI Integration",
    body: "Подключаем ИИ в закрытом контуре заказчика или через внешние API и роутеры, с учётом законодательства РФ, VPN, изоляции и политики безопасности.",
    note: "Максимальный уровень автоматизации и ассистирования."
  }
];

const quickQuestions: QuickQuestion[] = [
  {
    id: "what",
    label: "Что такое Анаконда",
    answer: "Анаконда собирает хаос из мессенджеров, почты, таблиц и legacy в единое рабочее окно для менеджеров и руководителей."
  },
  {
    id: "help",
    label: "Как она поможет бизнесу",
    answer: "Она уменьшает потери лидов, ускоряет ответы клиентам, упрощает контроль контрагентов и делает коммуникацию прозрачной."
  },
  {
    id: "improve",
    label: "Как улучшит процессы",
    answer: "Анаконда убирает ручные переключения между системами, собирает данные в одном месте и даёт сценарии для аналитики и AI."
  },
  {
    id: "auto",
    label: "Что автоматизируется",
    answer: "Коммуникации, фиксация лидов, статусы клиентов, отчётность, контроль задолженности, быстрые счета и дальнейшие AI-сценарии."
  }
];

const companies = [
  {
    name: "ООО СеверСтрой",
    roles: [
      {
        title: "Закупки",
        people: ["Марина Волкова", "Игорь Орлов"]
      },
      {
        title: "Финансы",
        people: ["Елена Громова"]
      }
    ]
  },
  {
    name: "ТК Восток Логистик",
    roles: [
      {
        title: "Коммерческий отдел",
        people: ["Роман Ильин"]
      },
      {
        title: "Диспетчерская",
        people: ["Светлана Рябова"]
      }
    ]
  },
  {
    name: "ПромТех Холдинг",
    roles: [
      {
        title: "Снабжение",
        people: ["Наталья Миронова"]
      }
    ]
  }
];

const shards: Shard[] = [
  { x: -220, y: -140, width: 90, height: 14, rotate: -38 },
  { x: -120, y: -210, width: 68, height: 10, rotate: -72 },
  { x: 190, y: -180, width: 110, height: 14, rotate: 32 },
  { x: 250, y: -20, width: 72, height: 12, rotate: 74 },
  { x: 188, y: 148, width: 120, height: 14, rotate: -24 },
  { x: -210, y: 160, width: 96, height: 12, rotate: 28 },
  { x: 20, y: 230, width: 132, height: 14, rotate: -4 },
  { x: -16, y: -260, width: 118, height: 12, rotate: 8 }
];

function ChaosBubble({ bubble, progress }: { bubble: Bubble; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 0.46, 0.54], [bubble.startX, 0, 0]);
  const y = useTransform(progress, [0, 0.46, 0.54], [bubble.startY, 0, 0]);
  const scale = useTransform(progress, [0, 0.28, 0.46, 0.52], [0.82, 1, 0.92, 0.08]);
  const opacity = useTransform(progress, [0, 0.08, 0.46, 0.52], [0, 1, 0.96, 0]);
  const rotate = useTransform(progress, [0, 0.46], [bubble.rotate, 0]);

  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate }}
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-[1.6rem] border border-white/10 bg-white/10 p-4 text-left shadow-[0_24px_80px_rgba(6,20,14,0.3)] backdrop-blur-xl"
    >
      <div
        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/70"
        style={{ width: "fit-content" }}
      >
        {bubble.accent}
      </div>
      <div
        className="mt-6 text-[clamp(1rem,1.4vw,1.3rem)] font-semibold text-white"
        style={{ width: bubble.size }}
      >
        {bubble.label}
      </div>
    </motion.div>
  );
}

function ChaosShard({ shard, progress }: { shard: Shard; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.28, 0.38, 0.56], [0, 0.88, 0]);
  const x = useTransform(progress, [0.28, 0.56], [0, shard.x * 0.36]);
  const y = useTransform(progress, [0.28, 0.56], [0, shard.y * 0.36]);
  const scale = useTransform(progress, [0.28, 0.4, 0.56], [0.4, 1, 0.6]);
  const rotate = useTransform(progress, [0.28, 0.56], [shard.rotate * 0.2, shard.rotate]);

  return (
    <motion.div
      style={{ opacity, x, y, scale, rotate }}
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(230,255,236,0.92),rgba(128,245,155,0.06))] shadow-[0_0_22px_rgba(182,255,202,0.35)]"
    >
      <div style={{ width: shard.width, height: shard.height }} />
    </motion.div>
  );
}

function InterfaceMock({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.28, 0.4, 0.82, 0.94], [0, 1, 1, 0.2]);
  const scale = useTransform(progress, [0.28, 0.44, 0.82, 0.94], [0.82, 1, 1, 1.01]);
  const blur = useTransform(progress, [0.86, 0.98], [0, 18]);
  const rotate = useTransform(progress, [0.28, 0.46, 0.82, 0.96], [-2, 0, 0, 1]);
  const glassFade = useTransform(progress, [0.82, 0.96], [0, 20]);
  const sheen = useTransform(progress, [0.42, 0.86], [0.14, 0.42]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-3 pb-8 pt-28 md:px-6 md:pb-10 md:pt-32">
      <motion.div
        style={{
          opacity,
          scale,
          rotate,
          filter: useTransform(blur, (value) => `blur(${value}px) saturate(${1.02 - value / 40})`)
        }}
        className="pointer-events-auto relative h-[min(72vh,760px)] w-[min(1120px,96vw)] overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(235,255,243,0.22),rgba(15,44,28,0.58))] p-3 shadow-[0_40px_140px_rgba(3,14,9,0.55)] backdrop-blur-2xl md:p-5"
      >
        <motion.div
          style={{ opacity: useTransform(glassFade, (value) => 1 - value / 26) }}
          className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/10"
        />
        <motion.div
          style={{ opacity: sheen }}
          className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_32%,rgba(136,247,165,0.16)_60%,rgba(255,255,255,0.02)_78%)]"
        />
        <motion.div
          style={{ opacity: useTransform(glassFade, [0, 20], [0, 0.55]) }}
          className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_28%,rgba(255,255,255,0.18)_55%,rgba(255,255,255,0.02)_78%)] backdrop-blur-[3px]"
        />
        <div className="grid h-full min-h-0 grid-rows-[auto_1fr] rounded-[1.6rem] border border-white/10 bg-[#07160f]/80 p-3 md:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#9dd8af]">Окно Анаконда</div>
              <div className="mt-1 text-base font-semibold text-white md:text-lg">
                Контрагенты, люди, счета и статусы в одном окне
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              SLA ответа: 3 мин
            </div>
          </div>

          <div className="grid min-h-0 gap-3 lg:grid-cols-[0.82fr_1.2fr_0.92fr]">
            <div className="min-h-0 overflow-auto rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#8ed39f]">Дерево контрагентов</div>
              <div className="space-y-4">
                {companies.map((company) => (
                  <div key={company.name} className="rounded-[1.1rem] border border-white/10 bg-black/10 p-3">
                    <div className="text-sm font-semibold text-white">{company.name}</div>
                    <div className="mt-3 space-y-2">
                      {company.roles.map((role) => (
                        <div key={role.title} className="rounded-xl border border-white/6 bg-white/5 p-2">
                          <div className="text-xs uppercase tracking-[0.24em] text-white/55">{role.title}</div>
                          <div className="mt-2 space-y-1">
                            {role.people.map((person) => (
                              <div key={person} className="rounded-lg bg-white/5 px-2 py-1 text-sm text-white/88">
                                {person}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-0 overflow-auto rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-[#8ed39f]">Контактное лицо</div>
                  <div className="mt-1 text-xl font-semibold text-white">Марина Волкова</div>
                  <div className="text-sm text-white/60">ООО СеверСтрой · Руководитель закупок</div>
                </div>
                <div className="rounded-full border border-[#63c47b]/40 bg-[#63c47b]/14 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[#b9f0c7]">
                  online
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-[1.2rem] bg-black/15 p-3 text-sm text-white/78">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/45">10:14</div>
                  Нужен счёт на поставку 12 позиций, важно сегодня до 16:00.
                </div>
                <div className="ml-auto max-w-[82%] rounded-[1.2rem] bg-[#1c6d33] p-3 text-sm text-white shadow-[0_10px_30px_rgba(10,71,32,0.35)]">
                  Счёт формируется прямо сейчас. В карточке справа уже подтянулись реквизиты, задолженность и статус клиента.
                </div>
                <div className="rounded-[1.2rem] bg-black/15 p-3 text-sm text-white/78">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/45">10:16</div>
                  Отлично, отправьте и продублируйте в email.
                </div>
              </div>
            </div>

            <div className="min-h-0 overflow-auto rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#8ed39f]">Быстрые действия</div>
              <div className="space-y-3">
                <div className="rounded-[1.1rem] border border-white/10 bg-black/12 p-3">
                  <div className="text-sm font-semibold text-white">Счёт #A-2481</div>
                  <div className="mt-2 text-sm text-white/65">ООО СеверСтрой · 482 000 ₽ · НДС включён</div>
                  <button className="mt-3 w-full rounded-full bg-[#79e093] px-4 py-2 text-sm font-semibold text-[#04230f] transition hover:brightness-105">
                    Выставить счёт из чата
                  </button>
                </div>
                <div className="rounded-[1.1rem] border border-white/10 bg-black/12 p-3">
                  <div className="text-xs uppercase tracking-[0.24em] text-white/50">Статус контрагента</div>
                  <div className="mt-2 text-lg font-semibold text-white">Активный</div>
                  <div className="mt-2 text-sm text-white/65">Задолженность: 148 000 ₽</div>
                  <div className="text-sm text-white/65">Лимит: 2 000 000 ₽</div>
                </div>
                <div className="rounded-[1.1rem] border border-white/10 bg-black/12 p-3">
                  <div className="text-xs uppercase tracking-[0.24em] text-white/50">Следующий шаг</div>
                  <div className="mt-2 text-sm leading-6 text-white/72">
                    Напомнить менеджеру через 20 минут, если счёт не подтверждён.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StoryScene() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  const chaosOpacity = useTransform(scrollYProgress, [0.06, 0.16, 0.34, 0.44], [0, 0.28, 0.32, 0]);
  const orderOpacity = useTransform(scrollYProgress, [0.7, 0.82, 1], [0, 0.45, 0.72]);
  const centerPulse = useTransform(scrollYProgress, [0.36, 0.5, 0.56], [0.2, 1.25, 0.06]);
  const burstOpacity = useTransform(scrollYProgress, [0.28, 0.38, 0.5], [0, 0.95, 0]);
  const burstScale = useTransform(scrollYProgress, [0.28, 0.38, 0.56], [0.2, 1.3, 1.8]);
  const panelY = useTransform(scrollYProgress, [0, 0.18], [40, 0]);
  const ringOpacity = useTransform(scrollYProgress, [0.2, 0.34, 0.5, 0.66], [0, 0.8, 0.22, 0]);
  const ringScale = useTransform(scrollYProgress, [0.2, 0.38, 0.62], [0.4, 1.55, 2.2]);
  const hazeOpacity = useTransform(scrollYProgress, [0.1, 0.42, 0.64], [0.08, 0.22, 0.06]);
  const lineOpacity = useTransform(scrollYProgress, [0.18, 0.4, 0.56], [0, 0.5, 0]);
  const statusOpacity = useTransform(scrollYProgress, [0.4, 0.56, 0.9], [0, 1, 0.6]);

  return (
    <section ref={sceneRef} className="relative h-[210vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,231,153,0.16),transparent_28%),linear-gradient(180deg,rgba(4,18,11,0.2),rgba(4,18,11,0.82))]" />
        <motion.div
          style={{ opacity: hazeOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,248,164,0.24),transparent_18%),radial-gradient(circle_at_20%_80%,rgba(123,210,148,0.12),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(165,255,192,0.14),transparent_22%)]"
        />

        <motion.div
          style={{ y: panelY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
          className="absolute left-0 right-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-start justify-between px-6 pt-8 md:px-10 md:pt-10"
        >
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.34em] text-[#8ce69f]">Scroll story</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
              От хаоса источников к порядку действий
            </h2>
            <p className="mt-4 text-base leading-8 text-white/68 md:text-lg">
              Документы, таблицы, старая CRM, почта и мессенджеры стягиваются в единый центр принятия решений — окно
              Анаконда.
            </p>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 lg:block">
            Листайте вниз
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: chaosOpacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-[clamp(6rem,18vw,16rem)] font-semibold uppercase tracking-[0.22em] text-white/7"
        >
          хаос
        </motion.div>

        <motion.div
          style={{ opacity: lineOpacity }}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(173,255,198,0.55),transparent)]"
        />
        <motion.div
          style={{ opacity: lineOpacity, scaleX: useTransform(scrollYProgress, [0.16, 0.5], [0.4, 1.2]) }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[38rem] w-px -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(173,255,198,0.55),transparent)]"
        />

        {bubbles.map((bubble) => (
          <ChaosBubble key={bubble.label} bubble={bubble} progress={scrollYProgress} />
        ))}

        <motion.div
          style={{ scale: centerPulse, opacity: useTransform(scrollYProgress, [0.18, 0.34, 0.48], [0.18, 1, 0]) }}
          className="absolute left-1/2 top-1/2 z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(137,255,179,0.95)_0%,rgba(67,172,95,0.46)_40%,rgba(19,66,31,0)_72%)] blur-sm"
        />

        <motion.div
          style={{ opacity: burstOpacity, scale: burstScale }}
          className="absolute left-1/2 top-1/2 z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b6ffca]/25 bg-[radial-gradient(circle,rgba(190,255,211,0.6)_0%,rgba(104,220,133,0.28)_34%,rgba(13,48,23,0)_70%)]"
        />

        <motion.div
          style={{ opacity: ringOpacity, scale: ringScale }}
          className="absolute left-1/2 top-1/2 z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d6ffe0]/25"
        />
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.22, 0.38, 0.56], [0, 0.7, 0]), scale: useTransform(scrollYProgress, [0.22, 0.5], [0.68, 1.8]) }}
          className="absolute left-1/2 top-1/2 z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8cf3a6]/15"
        />

        {shards.map((shard) => (
          <ChaosShard key={`${shard.x}-${shard.y}`} shard={shard} progress={scrollYProgress} />
        ))}

        <InterfaceMock progress={scrollYProgress} />

        <motion.div
          style={{ opacity: statusOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/52 md:bottom-14"
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Контрагенты</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Роли</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Контакты</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Счета</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Статусы</span>
        </motion.div>

        <motion.div
          style={{ opacity: orderOpacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-[clamp(6rem,18vw,16rem)] font-semibold uppercase tracking-[0.22em] text-white/8"
        >
          порядок
        </motion.div>
      </div>
    </section>
  );
}

export function LandingPage() {
  const reducedMotion = useReducedMotion();
  const [selectedQuestion, setSelectedQuestion] = useState<QuickQuestion>(quickQuestions[0]);

  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10 md:pb-24 md:pt-10">
        <div className="pointer-events-none absolute inset-x-6 top-6 h-[34rem] rounded-[3rem] bg-[radial-gradient(circle_at_top,rgba(146,255,171,0.18),transparent_40%)] blur-3xl md:inset-x-10" />
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
          className="mb-16 flex items-center justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#8ce69f]">Anaconda system</p>
            <p className="mt-2 text-sm text-white/58">Системная интеграция legacy бизнес-процессов в единое окно</p>
          </div>
          <a
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/78 transition hover:border-[#8ce69f] hover:text-white"
            href="#assistant"
          >
            Задать вопрос
          </a>
        </motion.header>

        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: reducedMotion ? 0.1 : 0.6, delay: 0.06 }}
          >
            <div className="inline-flex rounded-full border border-[#8ce69f]/30 bg-[#8ce69f]/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#9ef0b3]">
              Анаконда
            </div>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl xl:text-[5.7rem]">
              Единое окно для людей, процессов, лидов и контрагентов
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
              Анаконда — это системная интеграция legacy бизнес-процессов в единое рабочее окно. Всё, что раньше было
              разбросано между почтой, таблицами, ERP, документами и мессенджерами, собирается в один интерфейс.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.28em] text-white/56">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">legacy integration</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">единое окно</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">чат + счета</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">AI ready</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a className="rounded-full bg-[#83e69a] px-6 py-3 font-semibold text-[#082412] transition hover:brightness-105" href="#levels">
                Смотреть уровни внедрения
              </a>
              <a
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-[#8ce69f]"
                href="#assistant"
              >
                Открыть чат
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.7, delay: 0.14 }}
            className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_30px_100px_rgba(3,12,8,0.4)] backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_36%,rgba(126,230,150,0.12)_66%,rgba(255,255,255,0.01))]" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/12 p-5">
                <div className="text-xs uppercase tracking-[0.26em] text-[#8ed39f]">Единый контур</div>
                <div className="mt-3 text-3xl font-semibold text-white">1 окно</div>
                <div className="mt-2 text-sm leading-7 text-white/65">
                  Контакты, лиды, счета, статусы и коммуникации без прыжков между системами.
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/12 p-5">
                <div className="text-xs uppercase tracking-[0.26em] text-[#8ed39f]">Подход</div>
                <div className="mt-3 text-3xl font-semibold text-white">4 уровня</div>
                <div className="mt-2 text-sm leading-7 text-white/65">
                  От объединения источников лидов до AI Integration в закрытом или гибридном контуре.
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/12 p-5">
              <div className="text-xs uppercase tracking-[0.26em] text-[#8ed39f]">Основная идея</div>
              <div className="mt-3 text-lg leading-8 text-white/78">
                Вместо хаоса отдельных инструментов — единое окно действий по контрагенту: кто пишет, кто должен
                ответить, какой статус у клиента, какая задолженность и можно ли прямо сейчас выставить счёт.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <StoryScene />

      <section id="levels" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
          className="mb-12 max-w-4xl"
        >
          <div className="text-xs uppercase tracking-[0.34em] text-[#8ce69f]">Планы внедрения</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
            Четыре уровня развития системы под ваш контур
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/68">
            Можно начать с единого окна для лидов и коммуникаций, а затем шаг за шагом дойти до аналитики, отчётности
            и полноценной AI Integration.
          </p>
        </motion.div>

        <div className="grid gap-5 xl:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.level}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.45, delay: reducedMotion ? 0 : index * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(4,18,11,0.24)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-[#8ce69f]">Уровень {plan.level}</div>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{plan.title}</h3>
                </div>
                <div className="rounded-full border border-[#8ce69f]/20 bg-[#8ce69f]/10 px-4 py-2 text-sm text-[#baf5c8]">
                  Внедрение
                </div>
              </div>
              <p className="mt-5 text-base leading-8 text-white/70">{plan.body}</p>
              <div className="mt-5 rounded-[1.2rem] border border-white/8 bg-black/12 px-4 py-3 text-sm text-white/62">
                {plan.note}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14 md:px-10">
        <div className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(126,230,150,0.08),rgba(255,255,255,0.03))] px-6 py-8 shadow-[0_24px_90px_rgba(4,18,11,0.24)] backdrop-blur-xl md:px-8 md:py-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.6rem] border border-white/10 bg-black/12 p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-[#8ce69f]">Люди</div>
              <div className="mt-3 text-xl font-semibold text-white">Контакт виден целиком</div>
              <div className="mt-3 text-sm leading-7 text-white/65">
                Должность, история общения, канал связи и контекст по сделке доступны сразу, без поиска по разным
                сервисам.
              </div>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-black/12 p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-[#8ce69f]">Финансы</div>
              <div className="mt-3 text-xl font-semibold text-white">Счета прямо из окна чата</div>
              <div className="mt-3 text-sm leading-7 text-white/65">
                Быстрые действия для коммерческого отдела: выставление счёта, напоминания, проверка задолженности и
                статуса контрагента.
              </div>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-black/12 p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-[#8ce69f]">Управление</div>
              <div className="mt-3 text-xl font-semibold text-white">От окна к аналитике</div>
              <div className="mt-3 text-sm leading-7 text-white/65">
                Руководитель получает не просто чат, а управляемый слой продаж, лидов, процессов и дальнейших AI-сценариев.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="assistant" className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10 md:pb-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ duration: reducedMotion ? 0.1 : 0.45 }}
          className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_90px_rgba(4,18,11,0.24)] backdrop-blur-xl md:p-8">
            <div className="text-xs uppercase tracking-[0.34em] text-[#8ce69f]">Чат-бот</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
              Спросите о системе прямо сейчас
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/68">
              Здесь будет работать нейросеть по системе Анаконда. Пока ставим заглушку и набор быстрых вопросов для
              пользователя.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {quickQuestions.map((question) => {
                const active = selectedQuestion.id === question.id;
                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => setSelectedQuestion(question)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      active
                        ? "bg-[#86f0a0] text-[#082412]"
                        : "border border-white/10 bg-white/5 text-white/78 hover:border-[#8ce69f]"
                    }`}
                  >
                    {question.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-[0_24px_90px_rgba(4,18,11,0.24)] backdrop-blur-xl md:p-5">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(130deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_42%,rgba(126,230,150,0.1)_72%,rgba(255,255,255,0.01))]" />
            <div className="rounded-[1.6rem] border border-white/10 bg-[#07150f]/88 p-4 md:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-[#8ce69f]">Anaconda assistant</div>
                  <div className="mt-1 text-lg font-semibold text-white">Открытый чат по системе</div>
                </div>
                <div className="rounded-full border border-[#8ce69f]/20 bg-[#8ce69f]/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[#c2f8cf]">
                  placeholder
                </div>
              </div>

              <div className="space-y-3">
                <div className="ml-auto max-w-[86%] rounded-[1.2rem] bg-[#1c6d33] px-4 py-3 text-sm text-white">
                  {selectedQuestion.label}
                </div>
                <div className="max-w-[92%] rounded-[1.2rem] bg-white/8 px-4 py-3 text-sm leading-7 text-white/78">
                  {selectedQuestion.answer}
                </div>
                <div className="max-w-[92%] rounded-[1.2rem] border border-dashed border-[#8ce69f]/30 bg-[#8ce69f]/8 px-4 py-3 text-sm leading-7 text-[#d4f8dc]">
                  Всё чики-брики, Михаил ответит в течение трёх минут.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
