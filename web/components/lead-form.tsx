"use client";

import { FormEvent, useState, useTransition } from "react";

type Status = "idle" | "success" | "error";

const initialForm = {
  name: "",
  company: "",
  contact: "",
  message: "",
  consent: false,
};

const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

export function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.company.trim() ||
      !form.contact.trim() ||
      form.message.trim().length < 10 ||
      !form.consent
    ) {
      setStatus("error");
      setFeedback("Заполните обязательные поля, добавьте описание задачи и подтвердите согласие на обработку данных.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            company: form.company.trim(),
            contact: form.contact.trim(),
            message: form.message.trim(),
            consent: form.consent,
            source_page: "landing",
          }),
        });

        if (!response.ok) {
          throw new Error("Lead submit failed");
        }

        setForm(initialForm);
        setStatus("success");
        setFeedback("Заявка отправлена. Мы вернемся с архитектурным сценарием и следующими шагами по пилоту.");
      } catch {
        setStatus("error");
        setFeedback("Не удалось отправить заявку. Проверьте доступность API и повторите попытку.");
      }
    });
  };

  return (
    <div className="rounded-[2rem] border border-neutral-800 bg-neutral-900/70 p-6 shadow-elevation-3 backdrop-blur md:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Request demo</p>
          <h3 className="mt-2 text-2xl font-semibold text-neutral-50">Обсудить внедрение OSNOVA</h3>
        </div>
        <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-400">
          Ответим с архитектурным сценарием
        </span>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-neutral-300">
            <span>Имя *</span>
            <input
              className="rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-50 outline-none transition focus:border-emerald-500"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Как к вам обращаться"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-neutral-300">
            <span>Компания *</span>
            <input
              className="rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-50 outline-none transition focus:border-emerald-500"
              value={form.company}
              onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
              placeholder="Юридическое название или бренд"
              required
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-neutral-300">
          <span>Email или телефон *</span>
          <input
            className="rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-50 outline-none transition focus:border-emerald-500"
            value={form.contact}
            onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))}
            placeholder="Куда отправить следующий шаг"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-neutral-300">
          <span>Кратко о задаче *</span>
          <textarea
            className="min-h-32 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-50 outline-none transition focus:border-emerald-500"
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            placeholder="Какие процессы, legacy-системы или AI-сценарии нужно собрать в единый контур?"
            required
          />
        </label>

        <label className="flex items-start gap-3 text-sm text-neutral-400">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
            className="mt-1 h-4 w-4 accent-[#00E5D1]"
            required
          />
          <span>Согласен на обработку данных для связи по проекту и подготовки архитектурного сценария. *</span>
        </label>

        {feedback && (
          <div
            aria-live="polite"
            className={`rounded-2xl border px-4 py-3 text-sm ${
              status === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                : "border-red-500/30 bg-red-500/10 text-red-200"
            }`}
          >
            {feedback}
          </div>
        )}

        <div className="flex items-center justify-between gap-4 pt-2">
          <p className="max-w-xs text-xs leading-6 text-neutral-500">
            Публичный сайт использует стабильный JSON-контракт `POST /api/v1/leads` без файловых вложений.
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Отправка..." : "Отправить заявку"}
          </button>
        </div>
      </form>
    </div>
  );
}
