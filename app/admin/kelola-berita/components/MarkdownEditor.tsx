"use client";

import { useRef } from "react";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  Link2,
  Quote,
  type LucideIcon,
} from "lucide-react";

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
};

export default function MarkdownEditor({
  id,
  value,
  onChange,
  disabled,
  invalid,
  describedBy,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  // Ganti isi, lalu pulihkan seleksi setelah React selesai render
  const update = (next: string, selStart: number, selEnd: number) => {
    onChange(next);

    requestAnimationFrame(() => {
      ref.current?.focus();
      ref.current?.setSelectionRange(selStart, selEnd);
    });
  };

  const wrap = (before: string, after: string, placeholder: string) => {
    const el = ref.current;
    if (!el) return;

    const { selectionStart: s, selectionEnd: e } = el;
    const selected = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + selected + after + value.slice(e);

    update(next, s + before.length, s + before.length + selected.length);
  };

  const insertLink = () => {
    const el = ref.current;
    if (!el) return;

    const { selectionStart: s, selectionEnd: e } = el;
    const text = value.slice(s, e) || "teks tautan";
    const url = "https://";
    const next = `${value.slice(0, s)}[${text}](${url})${value.slice(e)}`;
    const urlStart = s + text.length + 3;

    update(next, urlStart, urlStart + url.length);
  };

  // Awalan baris (#, ##, >): klik lagi untuk melepas
  const toggleLinePrefix = (prefix: string) => {
    const el = ref.current;
    if (!el) return;

    const s = el.selectionStart;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    const rest = value.slice(lineStart);
    const existing = rest.match(/^(#{1,6}\s+|>\s?)/)?.[0] ?? "";

    const next =
      value.slice(0, lineStart) +
      (existing === prefix ? "" : prefix) +
      rest.slice(existing.length);

    const cursor = Math.max(
      lineStart,
      s - existing.length + (existing === prefix ? 0 : prefix.length),
    );

    update(next, cursor, cursor);
  };

  const tools: ({ label: string; icon: LucideIcon; run: () => void } | "sep")[] = [
    { label: "Tebal", icon: Bold, run: () => wrap("**", "**", "teks tebal") },
    { label: "Miring", icon: Italic, run: () => wrap("*", "*", "teks miring") },
    { label: "Tautan", icon: Link2, run: insertLink },
    "sep",
    { label: "Judul 1", icon: Heading1, run: () => toggleLinePrefix("# ") },
    { label: "Judul 2", icon: Heading2, run: () => toggleLinePrefix("## ") },
    "sep",
    { label: "Kutipan", icon: Quote, run: () => toggleLinePrefix("> ") },
  ];

  return (
    <div
      className={`overflow-hidden rounded-lg border bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 ${
        invalid ? "border-red-500" : "border-slate-300"
      }`}
    >
      <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-3 py-2">
        {tools.map((tool, index) =>
          tool === "sep" ? (
            <span
              key={`sep-${index}`}
              className="mx-1 h-5 w-px bg-slate-300"
              aria-hidden
            />
          ) : (
            <button
              key={tool.label}
              type="button"
              onClick={tool.run}
              disabled={disabled}
              title={tool.label}
              aria-label={tool.label}
              className="flex size-8 items-center justify-center rounded-md text-slate-700 hover:bg-slate-200 disabled:opacity-50"
            >
              <tool.icon className="size-4" aria-hidden />
            </button>
          ),
        )}
      </div>

      <textarea
        ref={ref}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Tulis berita di sini..."
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="block h-64 w-full resize-y bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400"
      />

      <p className="px-4 pb-2 text-right text-xs text-slate-500">
        {wordCount} kata
      </p>
    </div>
  );
}
