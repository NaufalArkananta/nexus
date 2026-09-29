import { HeartPulse} from "lucide-react";

export default function HospitalRegisterHero() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden lg:block">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#06233d]/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 text-white">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
            <HeartPulse size={18} className="text-[#075ca8]" />
          </div>

          <span className="text-lg font-bold">MEDLINK</span>
        </div>

        {/* Main */}
        <div className="my-auto max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-wide backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#32d6bd]" />
            JARINGAN FASILITAS TERVERIFIKASI
          </div>

          <h1 className="text-4xl font-extrabold leading-tight xl:text-5xl">
            Bergabung
            <br />
            dengan MEDLINK
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-white/85">
            MEDLINK mengoordinasikan pengiriman bantuan darurat secara real-time
            antara fasilitas kesehatan terverifikasi dan warga pendonor.
          </p>
        </div>
      </div>
    </section>
  );
}
