import Image from "next/image";
import RegisterFeature from "./RegisterFeature";

export default function RegisterHero() {
  return (
    <section className="relative hidden min-h-screen flex-col justify-between bg-[#1759BD] px-8 py-8 text-white lg:flex lg:px-14 lg:py-12">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3">
          <Image
            src="/Frame.png"
            alt="MEDLINK"
            width={50}
            height={50}
          />

          <span className="text-xl font-bold tracking-tight">
            MEDLINK
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight lg:text-[40px]">
          Jaringan Pengiriman
          <br />
          Darurat Darah Hiperlokal
        </h1>

        <p className="mt-5 max-w-lg text-sm leading-6 text-white/90">
          Menyediakan akses terverifikasi bagi institusi
          layanan kesehatan untuk menyiarkan peringatan
          pengiriman darah darurat secara instan kepada para
          pendonor regional yang memenuhi syarat.
        </p>

        {/* Features */}
        <div className="mt-6 space-y-4">
          <RegisterFeature text="Pengendalian Akses untuk Verifikasi Kode Fasilitas Pelayanan Kesehatan" />

          <RegisterFeature text="Data diawasi oleh Pemerintah" />

          <RegisterFeature text="Algoritma pencocokan hiperlocal instan untuk peringatan kritis" />
        </div>
      </div>

      {/* Footer */}
      <div>
        <p className="text-[10px] text-white/80">
          © 2026 MEDLINKSync. Standardizing hyperlocal B2B
          medical dispatch.
        </p>
      </div>
    </section>
  );
}