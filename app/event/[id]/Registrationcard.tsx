import Link from "next/link";
import { ArrowRight, Armchair, BadgeCheck } from "lucide-react";
import { EventDetail, formatFee, getRegistrationStatus, isFree, RegistrationStatus } from "./event";


const STATUS: Record<
  RegistrationStatus,
  { label: string; badge: string; dot: string }
> = {
  open: {
    label: "Pendaftaran Buka",
    badge: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  full: {
    label: "Kuota Penuh",
    badge: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  closed: {
    label: "Pendaftaran Ditutup",
    badge: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
  },
};

type Props = {
  event: EventDetail;
  // Ganti jika route halaman pendaftaran kamu berbeda
  registerHref?: string;
};

export default function RegistrationCard({ event, registerHref }: Props) {
  const status = getRegistrationStatus(event);
  const { label, badge, dot } = STATUS[status];
  const free = isFree(event.fee);
  const href = registerHref ?? `/kegiatan/${event.id}/daftar`;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:sticky lg:top-24">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${badge}`}
      >
        <span className={`size-1.5 rounded-full ${dot}`} aria-hidden />
        {label}
      </span>

      <p className="mt-6 text-sm text-slate-500">Biaya pendaftaran</p>
      <p className="mt-1 text-3xl font-bold text-[#0f2a4d]">
        {free ? "Gratis / Free" : formatFee(event.fee)}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        {free
          ? "Belajar bersama, tanpa biaya pendaftaran."
          : "Biaya sudah termasuk materi kegiatan."}
      </p>

      <hr className="my-6 border-slate-200" />

      <p className="flex items-center gap-2 text-sm text-slate-600">
        <Armchair className="size-4 text-blue-700" aria-hidden />
        Sisa Kuota:
        <strong className="text-slate-900">{event.kuota} Kursi</strong>
      </p>

      {status === "open" ? (
        <Link
          href={href}
          className="mt-6 flex h-[60px] w-full items-center justify-center gap-2 rounded-xl bg-[#0A56D8] font-semibold text-white transition hover:bg-[#0846b0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Daftar Sekarang
          <ArrowRight className="size-5" aria-hidden />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-6 h-[60px] w-full cursor-not-allowed rounded-xl bg-slate-200 font-semibold text-slate-500"
        >
          {status === "full" ? "Kuota Penuh" : "Pendaftaran Ditutup"}
        </button>
      )}

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-600">
        <BadgeCheck className="size-4 text-blue-700" aria-hidden />
        E-Sertifikat Kemenkes Tersedia
      </p>
    </aside>
  );
}