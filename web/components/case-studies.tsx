"use client";

import { motion } from "framer-motion";

type CaseStudy = {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
};

const caseStudies: CaseStudy[] = [
  {
    company: "ТК Восток Логистик",
    industry: "Логистика",
    challenge: "Разрозненные системы для управления заказами, клиентами и финансами приводили к задержкам в обработке и потере лидов.",
    solution: "Внедрили единое окно Анаконда для интеграции legacy ERP, CRM и мессенджеров, с автоматизацией выставления счетов.",
    results: ["Сокращение времени обработки заказов на 35%", "Увеличение конверсии лидов на 25%", "Снижение операционных расходов на 20%"]
  },
  {
    company: "ПромТех Холдинг",
    industry: "Промышленность",
    challenge: "Фрагментированные данные из Excel, 1C и email мешали оперативному контролю контрагентов и задолженностей.",
    solution: "Подключили AI-ассистирование для анализа коммуникаций и автоматического формирования отчетов по клиентам.",
    results: ["Автоматизация 70% рутинных задач", "Повышение точности прогнозов продаж на 40%", "ROI в 150% за первый год"]
  },
  {
    company: "ООО СеверСтрой",
    industry: "Строительство",
    challenge: "Множество каналов связи и систем учета создавали хаос в управлении закупками и поставками.",
    solution: "Интегрировали все источники в единый контур с real-time аналитикой и мотивацией отдела продаж.",
    results: ["Ускорение цикла продаж на 50%", "Снижение просрочек платежей на 30%", "Повышение удовлетворенности клиентов на 45%"]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export function CaseStudies() {
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
        <div className="text-xs uppercase tracking-[0.34em] text-[#8ce69f]">Кейсы внедрения</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
          Реальные результаты трансформации хаоса в порядок
        </h2>
        <p className="mt-5 text-lg leading-8 text-white/68">
          Компании из разных отраслей уже внедрили Анаконда и увидели значительные улучшения в эффективности и ROI.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {caseStudies.map((study, index) => (
          <motion.article
            key={study.company}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(4,18,11,0.24)] backdrop-blur-xl"
          >
            <div className="mb-4">
              <div className="text-xs uppercase tracking-[0.3em] text-[#8ce69f]">{study.industry}</div>
              <h3 className="mt-2 text-xl font-semibold text-white">{study.company}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold text-white/90">Проблема</div>
                <p className="mt-2 text-sm leading-7 text-white/70">{study.challenge}</p>
              </div>
              <div>
                <div className="text-sm font-semibold text-white/90">Решение</div>
                <p className="mt-2 text-sm leading-7 text-white/70">{study.solution}</p>
              </div>
              <div>
                <div className="text-sm font-semibold text-white/90">Результаты</div>
                <ul className="mt-2 space-y-1">
                  {study.results.map((result) => (
                    <li key={result} className="text-sm leading-7 text-[#baf5c8]">• {result}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
