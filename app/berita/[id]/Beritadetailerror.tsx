import Link from "next/link";

export default function BeritaDetailError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
    >
      <p className="font-semibold text-red-700">Berita tidak dapat dimuat</p>
      <p className="mt-1 text-sm text-red-600">{message}</p>

      <Link
        href="/berita"
        className="mt-6 inline-block rounded-lg bg-[#0A56D8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0846b0]"
      >
        Kembali ke daftar berita
      </Link>
    </div>
  );
}