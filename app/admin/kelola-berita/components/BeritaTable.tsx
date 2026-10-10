import Link from "next/link";
import { AdminBeritaItem, formatTanggalPendek } from "../lib/berita-admin";

type Props = {
  items: AdminBeritaItem[];
  loading: boolean;
  error: string | null;
  filtered: boolean;
  pageSize: number;
  onRetry: () => void;
};

const thClass =
  "px-3 pb-4 text-xs font-semibold uppercase tracking-wide text-slate-500";

function StatusLabel({ status }: { status: AdminBeritaItem["status"] }) {
  return status === "TERBIT" ? (
    <span className="text-sm text-emerald-700">Dipublikasikan</span>
  ) : (
    <span className="text-sm text-slate-500">Draf</span>
  );
}

export default function BeritaTable({
  items,
  loading,
  error,
  filtered,
  pageSize,
  onRetry,
}: Props) {
  if (error) {
    return (
      <div role="alert" className="py-16 text-center">
        <p className="font-semibold text-red-700">Berita tidak dapat dimuat</p>
        <p className="mt-1 text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg bg-[#0A56D8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0846b0]"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-semibold text-[#0f2a4d]">
          {filtered ? "Tidak ada berita yang cocok" : "Belum ada berita"}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {filtered
            ? "Coba ubah kata kunci atau kategori."
            : "Klik “Tambah Berita” untuk membuat berita pertama."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table
        className="w-full min-w-[720px] text-left"
        aria-busy={loading}
      >
        <thead>
          <tr>
            <th scope="col" className={`${thClass} w-[45%]`}>
              Judul Berita
            </th>
            <th scope="col" className={thClass}>
              Kategori
            </th>
            <th scope="col" className={thClass}>
              Status
            </th>
            <th scope="col" className={thClass}>
              Tanggal
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? Array.from({ length: pageSize }).map((_, index) => (
                <tr key={index} className="border-t border-slate-100">
                  {[3 / 4, 1 / 2, 1 / 2, 1 / 2].map((width, col) => (
                    <td key={col} className="px-3 py-8">
                      <div
                        className="h-4 animate-pulse rounded bg-slate-200"
                        style={{ width: `${width * 100}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            : items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50/60"
                >
                  <td className="px-3 py-8">
                    <Link
                      href={`/berita/${item.id}`}
                      className="font-medium text-[#0f2a4d] hover:text-blue-700 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-3 py-8 text-sm text-slate-500">
                    {item.category}
                  </td>
                  <td className="px-3 py-8">
                    <StatusLabel status={item.status} />
                  </td>
                  <td className="px-3 py-8 text-sm text-slate-500">
                    <time dateTime={item.publishedAt}>
                      {formatTanggalPendek(item.publishedAt)}
                    </time>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
