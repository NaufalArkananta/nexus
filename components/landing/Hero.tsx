import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[900px] items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-banner.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto mt-20 max-w-3xl px-6 text-center text-white">
        <h1 className="text-4xl font-extrabold leading-[1.05] md:text-5xl">
          Bergabung dengan
          <br />
          Komunitas Donor Darah
          <br />
          MEDLINK
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/90 md:text-base">
          MEDLINK mengoordinasikan pengiriman bantuan darurat
          <br className="hidden md:block" />
          secara real-time antara fasilitas kesehatan terverifikasi dan
          <br className="hidden md:block" />
          warga pendonor.
        </p>

        {/* Button */}
        <div className="mt-8 flex justify-center gap-2">
          <Link
            href="/register"
            className="flex h-11 w-36 items-center justify-center rounded-md bg-[#244bc1] text-base font-semibold transition hover:bg-[#1d3fa9]"
          >
            Register
          </Link>

          <Link
            href="/login"
            className="flex h-11 w-36 items-center justify-center rounded-md bg-[#244bc1] text-base font-semibold transition hover:bg-[#1d3fa9]"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
