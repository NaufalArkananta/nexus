import { BeritaDetail, formatTanggal, getInitials, getReadMinutes } from "./Berita";
import ShareButtons from "./Sharebuttons";


export default function ArticleHeader({ berita }: { berita: BeritaDetail }) {
  return (
    <header>
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#0f2a4d] sm:text-4xl lg:text-[40px]">
        {berita.title}
      </h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <span
            className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700"
            aria-hidden
          >
            {getInitials(berita.author)}
          </span>
          <span className="font-medium text-slate-700">
            Ditulis oleh {berita.author}
          </span>
          <span aria-hidden>·</span>
          <time dateTime={berita.publishedAt}>
            {formatTanggal(berita.publishedAt)}
          </time>
          <span aria-hidden>·</span>
          <span>{getReadMinutes(berita.content)} min read</span>
        </div>

        <ShareButtons title={berita.title} />
      </div>
    </header>
  );
}