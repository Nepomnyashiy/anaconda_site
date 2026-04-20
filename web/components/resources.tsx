"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const resources = [
  {
    title: "Безопасность AI в корпоративной среде",
    type: "Whitepaper",
    description: "Подробный разбор требований к безопасности AI-систем в соответствии с законодательством РФ и международными стандартами.",
    link: "#"
  },
  {
    title: "Трансформация хаоса в порядок: кейс-стади",
    type: "Case Study",
    description: "Анализ успешного внедрения единого окна в крупной логистической компании с измеряемыми результатами.",
    link: "#"
  },
  {
    title: "AI Orchestration: от изоляции к интеграции",
    type: "Technical Guide",
    description: "Техническое руководство по настройке безопасной AI-оркестрации в закрытых контурах заказчика.",
    link: "#"
  },
  {
    title: "ROI Анаконда: расчет и прогноз",
    type: "Analytics Report",
    description: "Подробный анализ окупаемости системы на основе данных реальных внедрений.",
    link: "#"
  }
];

export function Resources() {
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
        <div className="text-xs uppercase tracking-[0.34em] text-[#8ce69f]">Ресурсы</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
          Глубокое погружение в платформу
        </h2>
        <p className="mt-5 text-lg leading-8 text-white/68">
          Скачайте whitepapers, case studies и технические руководства для детального понимания возможностей Анаконда.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource, index) => (
          <motion.article
            key={resource.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(4,18,11,0.24)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#8ce69f]">{resource.type}</div>
                <h3 className="mt-2 text-xl font-semibold text-white">{resource.title}</h3>
              </div>
              <div className="rounded-full border border-[#8ce69f]/20 bg-[#8ce69f]/10 px-4 py-2 text-sm text-[#baf5c8]">
                Скачать
              </div>
            </div>
            <p className="text-base leading-7 text-white/70 mb-6">{resource.description}</p>
            <a
              href={resource.link}
              className="inline-flex items-center gap-2 text-[#8ce69f] hover:text-white transition-colors"
            >
              <span>Читать далее</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
