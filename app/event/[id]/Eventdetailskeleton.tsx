export default function EventDetailSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Memuat acara">
      <div className="h-56 rounded-2xl bg-slate-200 sm:h-72 lg:h-[336px]" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_430px]">
        <div className="space-y-4">
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-4 w-1/2 rounded bg-slate-200" />
          <div className="mt-8 h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-2/3 rounded bg-slate-200" />
        </div>
        <div className="h-72 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}