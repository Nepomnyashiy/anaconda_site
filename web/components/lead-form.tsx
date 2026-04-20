"use client";

import { FormEvent, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "success" | "error";

const initialForm = {
  name: "",
  company: "",
  contact: "",
  message: "",
  industry: "",
  employees: "",
  currentSystems: "",
  files: [] as File[],
  consent: false
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const steps = [
  { id: 1, title: "Контакты", description: "Основная информация" },
  { id: 2, title: "Проект", description: "Детали внедрения" },
  { id: 3, title: "Файлы", description: "Документы и подтверждение" }
];

export function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.company || !form.contact || !form.message || !form.consent) {
      setStatus("error");
      setFeedback("Заполните обязательные поля и подтвердите согласие на обработку данных.");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          if (key === 'files') {
            (value as File[]).forEach((file, index) => {
              formData.append(`file_${index}`, file);
            });
          } else {
            formData.append(key, String(value));
          }
        });
        formData.append('source_page', 'landing');

        const response = await fetch(`${apiUrl}/api/v1/leads`, {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          throw new Error("Lead submit failed");
        }

        setForm(initialForm);
        setStatus("success");
        setFeedback("Заявка отправлена. Мы свяжемся с вами и предложим следующий архитектурный шаг.");
        setCurrentStep(1);
      } catch {
        setStatus("error");
        setFeedback("Не удалось отправить заявку. Проверьте доступность API и повторите попытку.");
      }
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Имя *</span>
                <input
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Как к вам обращаться"
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Компания *</span>
                <input
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
                  value={form.company}
                  onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                  placeholder="Название компании"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-muted">Email или телефон *</span>
              <input
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
                value={form.contact}
                onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))}
                placeholder="Куда отправить следующий шаг"
                required
              />
            </label>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Отрасль</span>
                <select
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
                  value={form.industry}
                  onChange={(event) => setForm((current) => ({ ...current, industry: event.target.value }))}
                >
                  <option value="">Выберите отрасль</option>
                  <option value="Логистика">Логистика</option>
                  <option value="Промышленность">Промышленность</option>
                  <option value="Строительство">Строительство</option>
                  <option value="Торговля">Торговля</option>
                  <option value="Другая">Другая</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Количество сотрудников</span>
                <select
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
                  value={form.employees}
                  onChange={(event) => setForm((current) => ({ ...current, employees: event.target.value }))}
                >
                  <option value="">Выберите размер</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-1000">201-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-muted">Текущие системы</span>
              <input
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
                value={form.currentSystems}
                onChange={(event) => setForm((current) => ({ ...current, currentSystems: event.target.value }))}
                placeholder="Excel, 1C, ERP, CRM и т.д."
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-muted">Кратко о задаче *</span>
              <textarea
                className="min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                placeholder="Какие legacy, процессы или AI-сценарии нужно собрать в единую платформу?"
                required
              />
            </label>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <label className="flex flex-col gap-2">
              <span className="text-sm text-muted">Прикрепить файлы (опционально)</span>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(event) => {
                  const files = Array.from(event.target.files || []);
                  setForm((current) => ({ ...current, files }));
                }}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric file:mr-4 file:rounded-full file:border-0 file:bg-electric file:px-4 file:py-1 file:text-sm file:font-medium file:text-slateDeep"
              />
              <span className="text-xs text-muted">Максимум 5 файлов, до 10MB каждый. Форматы: PDF, DOC, XLS</span>
            </label>
            {form.files.length > 0 && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-sm font-medium text-cloud mb-2">Выбранные файлы:</div>
                {form.files.map((file, index) => (
                  <div key={index} className="text-sm text-muted">{file.name}</div>
                ))}
              </div>
            )}
            <label className="flex items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
                className="mt-1 h-4 w-4 accent-[#4DA6FF]"
                required
              />
              <span>Согласен на обработку данных для связи по проекту и подготовке demo-сценария. *</span>
            </label>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="panel rounded-[2rem] p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-electric">Request demo</p>
          <h3 className="mt-2 text-2xl font-semibold text-cloud">Обсудить внедрение OSNOVA</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">Ответим с архитектурным сценарием</span>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                step.id <= currentStep ? 'bg-electric text-slateDeep' : 'bg-white/10 text-muted'
              }`}>
                {step.id}
              </div>
              <div className="text-xs text-muted mt-1">{step.title}</div>
            </div>
          ))}
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-electric h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={currentStep === steps.length ? submit : (e) => { e.preventDefault(); nextStep(); }}>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-cloud transition hover:border-electric"
              >
                Назад
              </button>
            )}
            {currentStep < steps.length && (
              <button
                type="submit"
                className="rounded-full bg-electric px-6 py-3 font-medium text-slateDeep transition hover:translate-y-[-1px] hover:bg-[#7cc0ff]"
              >
                Далее
              </button>
            )}
            {currentStep === steps.length && (
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-electric px-6 py-3 font-medium text-slateDeep transition hover:translate-y-[-1px] hover:bg-[#7cc0ff] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? "Отправляем..." : "Запросить демо"}
              </button>
            )}
          </div>
          {feedback ? (
            <p className={status === "success" ? "text-sm text-emeraldSoft" : "text-sm text-[#FF9D9D]"}>{feedback}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
