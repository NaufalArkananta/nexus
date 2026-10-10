import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

// Contoh: 1 2 3 … 8
function getPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const wanted = [1, total, current - 1, current, current + 1]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b)
    .filter((n, i, arr) => arr.indexOf(n) === i);

  const result: (number | "…")[] = [];

  wanted.forEach((n, i) => {
    if (i > 0 && n - wanted[i - 1] > 1) result.push("…");
    result.push(n);
  });

  return result;
}

const baseButton =
  "flex size-8 items-center justify-center rounded-md text-sm text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent";

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Halaman" className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Halaman sebelumnya"
        className={baseButton}
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>

      {getPages(page, totalPages).map((item, index) =>
        item === "…" ? (
          <span
            key={`gap-${index}`}
            className="flex size-8 items-center justify-center text-sm text-slate-400"
            aria-hidden
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            aria-label={`Halaman ${item}`}
            className={`${baseButton} ${
              item === page ? "bg-blue-50 font-semibold" : ""
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Halaman berikutnya"
        className={baseButton}
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </nav>
  );
}
