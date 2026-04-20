"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const certifications = [
  { name: "ISO 27001", description: "Система управления информационной безопасностью" },
  { name: "GDPR Compliant", description: "Соответствие требованиям GDPR" },
  { name: "ФЗ-152", description: "Соблюдение закона о персональных данных РФ" },
  { name: "On-Premise Ready", description: "Готова к развертыванию на инфраструктуре заказчика" }
];

const testimonials = [
  {
    quote: "Анаконда позволила нам сократить время на обработку заказов на 40% и значительно улучшить контроль над контрагентами.",
    author: "Алексей Петров",
    position: "Директор по операциям",
    company: "ТК Восток Логистик"
  },
  {
    quote: "Интеграция с нашими legacy-системами прошла гладко. Теперь у нас единое окно для всех коммуникаций.",
    author: "Мария Иванова",
    position: "Руководитель IT",
    company: "ПромТех Холдинг"
  }
];

export function TrustSignals() {
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
        <div className="text-xs uppercase tracking-[0.34em] text-[#8ce69f]">Доверие</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
          Безопасность и надежность на уровне enterprise
        </h2>
        <p className="mt-5 text-lg leading-8 text-white/68">
          Анаконда соответствует строгим стандартам безопасности и уже доказала свою эффективность в реальных проектах.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(4,18,11,0.24)] backdrop-blur-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Сертификаты и стандарты</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-lg border border-white/10 bg-black/12 p-4"
              >
                <div className="text-sm font-semibold text-[#8ce69f]">{cert.name}</div>
                <div className="text-xs text-white/70 mt-1">{cert.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(4,18,11,0.24)] backdrop-blur-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Отзывы клиентов</h3>
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-lg border border-white/10 bg-black/12 p-4"
              >
                <blockquote className="text-sm text-white/80 italic mb-3">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="text-xs text-[#8ce69f] font-medium">{testimonial.author}</div>
                <div className="text-xs text-white/60">{testimonial.position}, {testimonial.company}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
