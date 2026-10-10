import type { ReactNode } from "react";

export const inputClass =
  "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 disabled:bg-slate-50 aria-[invalid=true]:border-red-500";

type Props = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export default function FormField({
  label,
  htmlFor,
  error,
  hint,
  children,
}: Props) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-[#0f2a4d]"
      >
        {label}
      </label>

      {children}

      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}
