import {
  Activity,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

import ServiceCard from "./ServiceCard";

export default function HealthServices() {
  return (
    <section className="bg-white px-6 py-14 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#101d35]">
          LAYANAN KESEHATAN
        </h2>

        <div className="relative mt-12">
          {/* Left */}
          <button className="absolute -left-7 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm md:flex">
            <ChevronLeft size={17} />
          </button>

          {/* Cards */}
          <div className="grid gap-5 md:grid-cols-3">
            <ServiceCard
              icon={<Activity size={19} />}
              iconClass="bg-red-50 text-red-500"
              title="Event"
              description="Informasi Kegiatan seputar kesehatan"
              linkClass="text-[#d12e61]"
            />

            <ServiceCard
              icon={<HeartPulse size={19} />}
              iconClass="bg-gray-100 text-[#164b52]"
              title="Donor Darah"
              description="Pasokan darah prioritas tinggi yang menghubungkan rumah sakit dengan bank darah kompatibel terdekat."
              linkClass="text-[#164b52]"
            />

            <ServiceCard
              icon={<ShieldCheck size={19} />}
              iconClass="bg-gray-100 text-[#182b3c]"
              title="Riwayat Kesehatan"
              description="Memberikan Layanan Pemeriksaan kesehatan dan dapat memantau kondisi kesehatan diri anda."
              linkClass="text-[#182b3c]"
            />
          </div>

          {/* Right */}
          <button className="absolute -right-7 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm md:flex">
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}