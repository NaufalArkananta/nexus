export default function BeritaDetailSkeleton() {
  return (
    <div
      className="animate-pulse"
      aria-busy="true"
      aria-label="Memuat berita"
    >
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-10 w-full rounded bg-slate-200" />
        <div className="h-10 w-2/3 rounded bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-200" />
      </div>

      <div className="mx-auto mt-8 aspect-[4/3] max-w-5xl rounded-2xl bg-slate-200 sm:aspect-[21/9]" />

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-5/6 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
      </div>
    </div>
  );
}