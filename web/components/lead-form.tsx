"use client";

import { FormEvent, useState, useTransition } from "react";

type Status = "idle" | "success" | "error";

const initialForm = {
  name: "",
  company: "",
  contact: "",
  message: "",
  consent: false
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.company || !form.contact || !form.message || !form.consent) {
      setStatus("error");
      setFeedback("Заполните обязательные поля и подтвердите согласие на обработку данных.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            source_page: "landing"
          })
        });

        if (!response.ok) {
          throw new Error("Lead submit failed");
        }

        setForm(initialForm);
        setStatus("success");
        setFeedback("Заявка отправлена. Мы свяжемся с вами и предложим следующий архитектурный шаг.");
      } catch {
        setStatus("error");
        setFeedback("Не удалось отправить заявку. Проверьте доступность API и повторите попытку.");
      }
    });
  };

  return (
    <form className="panel rounded-[2rem] p-6 md:p-8" onSubmit={submit}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-electric">Request demo</p>
          <h3 className="mt-2 text-2xl font-semibold text-cloud">Обсудить внедрение OSNOVA</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">Ответим с архитектурным сценарием</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-muted">Имя</span>
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Как к вам обращаться"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-muted">Компания</span>
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
            value={form.company}
            onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            placeholder="Название компании"
          />
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm text-muted">Email или телефон</span>
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
            value={form.contact}
            onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))}
            placeholder="Куда отправить следующий шаг"
          />
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm text-muted">Кратко о задаче</span>
          <textarea
            className="min-h-36 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cloud outline-none transition focus:border-electric"
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            placeholder="Какие legacy, процессы или AI-сценарии нужно собрать в единую платформу?"
          />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
          className="mt-1 h-4 w-4 accent-[#4DA6FF]"
        />
        <span>Согласен на обработку данных для связи по проекту и подготовке demo-сценария.</span>
      </label>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-electric px-6 py-3 font-medium text-slateDeep transition hover:translate-y-[-1px] hover:bg-[#7cc0ff] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Отправляем..." : "Запросить демо"}
        </button>
        {feedback ? (
          <p className={status === "success" ? "text-sm text-emeraldSoft" : "text-sm text-[#FF9D9D]"}>{feedback}</p>
        ) : null}
      </div>
    </form>
  );
}

