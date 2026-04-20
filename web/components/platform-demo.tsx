"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const nodes = [
  { id: "Excel", label: "Excel таблицы", x: "8%", y: "20%", color: "bg-rose-500/20 text-rose-200 border-rose-500/30" },
  { id: "1C", label: "1C учет", x: "8%", y: "56%", color: "bg-rose-500/20 text-rose-200 border-rose-500/30" },
  { id: "Hub", label: "ANACONDA", x: "40%", y: "38%", color: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30" },
  { id: "AI", label: "AI orchestration", x: "72%", y: "18%", color: "bg-sky-500/20 text-sky-200 border-sky-500/30" },
  { id: "Analytics", label: "Аналитика", x: "76%", y: "58%", color: "bg-sky-500/20 text-sky-200 border-sky-500/30" },
];

export function PlatformDemo() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="mb-12 max-w-4xl"
      >
        <div className="text-xs uppercase tracking-[0.34em] text-[#8ce69f]">Демо платформы</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
          От хаоса источников к контролю действий
        </h2>
        <p className="mt-5 text-lg leading-8 text-white/68">
          Интерактивная визуализация показывает, как Анаконда собирает данные из разрозненных источников и преобразует их в управляемые процессы с AI-оркестрацией.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(4,18,11,0.24)] backdrop-blur-xl"
      >
        <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-black/20">
          <div className="absolute inset-x-[20%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />
          <div className="absolute inset-y-[28%] left-[22%] w-px bg-gradient-to-b from-transparent via-emerald-400/80 to-transparent" />
          <div className="absolute inset-y-[46%] left-[22%] w-px bg-gradient-to-b from-transparent via-emerald-400/80 to-transparent" />
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute rounded-2xl border px-4 py-3 text-sm font-semibold shadow-elevation-3 ${node.color}`}
              style={{ left: node.x, top: node.y }}
            >
              {node.label}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-sm text-white/60">
          Схема показывает, как Анаконда собирает разрозненные источники в единый orchestration hub и отдает результат в AI и аналитику.
        </div>
      </motion.div>
    </section>
  );
}
