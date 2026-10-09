import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BeritaListItem, formatTanggal } from "./Berita";

export default function BeritaCard({ berita }: { berita: BeritaListItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/berita/${berita.id}`} className="group block">
        <div className="relative h-48 bg-slate-200">
          {berita.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={berita.photo}
              alt={berita.title}
              className="size-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm text-slate-500">
              Belum ada foto
            </div>
          )}

          <time
            dateTime={berita.publishedAt}
            className="absolute bottom-3 left-3 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm"
          >
            {formatTanggal(berita.publishedAt)}
          </time>
        </div>

        <div className="p-6">
          <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700">
            {berita.category}
          </p>

          <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug text-[#0f2a4d]">
            {berita.title}
          </h3>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-700">
            Baca selengkapnya
            <ArrowRight
              className="size-4 transition group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </article>
  );
}