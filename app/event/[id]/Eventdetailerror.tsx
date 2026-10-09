import Link from "next/link";

type Props = {
  message: string;
};

export default function EventDetailError({ message }: Props) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
    >
      <p className="font-semibold text-red-700">Acara tidak dapat dimuat</p>
      <p className="mt-1 text-sm text-red-600">{message}</p>

      <Link
        href="/kegiatan"
        className="mt-6 inline-block rounded-lg bg-[#0A56D8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0846b0]"
      >
        Kembali ke daftar kegiatan
      </Link>
    </div>
  );
}