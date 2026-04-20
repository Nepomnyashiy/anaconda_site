"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export function ROICalculator() {
  const [currentCosts, setCurrentCosts] = useState(1000000);
  const [efficiencyGain, setEfficiencyGain] = useState(40);
  const [implementationCost, setImplementationCost] = useState(500000);

  const annualSavings = (currentCosts * efficiencyGain) / 100;
  const netSavings = annualSavings - implementationCost;
  const roi = implementationCost > 0 ? ((netSavings / implementationCost) * 100).toFixed(1) : 0;
  const paybackPeriod = implementationCost > 0 ? (implementationCost / annualSavings).toFixed(1) : 0;

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
        <div className="text-xs uppercase tracking-[0.34em] text-[#8ce69f]">Калькулятор ROI</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
          Рассчитайте окупаемость Анаконда для вашего бизнеса
        </h2>
        <p className="mt-5 text-lg leading-8 text-white/68">
          Введите текущие параметры вашего бизнеса и узнайте потенциальную экономию и срок окупаемости.
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
          <h3 className="text-xl font-semibold text-white mb-6">Параметры бизнеса</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Годовые операционные расходы (₽)
              </label>
              <input
                type="number"
                value={currentCosts}
                onChange={(e) => setCurrentCosts(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/50 focus:border-[#8ce69f] focus:outline-none"
                placeholder="1000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Ожидаемый прирост эффективности (%)
              </label>
              <input
                type="number"
                value={efficiencyGain}
                onChange={(e) => setEfficiencyGain(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/50 focus:border-[#8ce69f] focus:outline-none"
                placeholder="40"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Стоимость внедрения (₽)
              </label>
              <input
                type="number"
                value={implementationCost}
                onChange={(e) => setImplementationCost(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/50 focus:border-[#8ce69f] focus:outline-none"
                placeholder="500000"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(4,18,11,0.24)] backdrop-blur-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Результаты расчета</h3>
          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-black/12 p-4">
              <div className="text-sm text-white/70">Годовая экономия</div>
              <div className="text-2xl font-semibold text-[#baf5c8]">{annualSavings.toLocaleString()} ₽</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/12 p-4">
              <div className="text-sm text-white/70">Чистая экономия (за вычетом внедрения)</div>
              <div className="text-2xl font-semibold text-[#baf5c8]">{netSavings.toLocaleString()} ₽</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/12 p-4">
              <div className="text-sm text-white/70">ROI</div>
              <div className="text-2xl font-semibold text-[#baf5c8]">{roi}%</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/12 p-4">
              <div className="text-sm text-white/70">Срок окупаемости</div>
              <div className="text-2xl font-semibold text-[#baf5c8]">{paybackPeriod} лет</div>
            </div>
          </div>
          <div className="mt-6 text-sm text-white/60">
            * Расчет основан на средних показателях внедрения Анаконда. Фактические результаты могут варьироваться.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
