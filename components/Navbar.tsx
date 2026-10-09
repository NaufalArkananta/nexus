import Link from "next/link";
import {
  Clock3,
  Globe,
  HeartPulse,
  Hospital,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      {/* Top Navbar */}
      <div className="flex h-14 items-center justify-between bg-[#075ca8]/95 px-6 text-white lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight"
        >
          <div>
            <img src="/logo.png" alt="MEDLINK Logo" className="h-8" />
          </div>
        </Link>

        {/* Search & Language */}
        <div className="flex items-center gap-4">
          <div className="hidden h-8 w-48 items-center gap-2 rounded-md border border-white/70 bg-white/10 px-3 md:flex">
            <Search size={14} />

            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-xs outline-none placeholder:text-white"
            />
          </div>

          <button className="flex items-center gap-1 text-xs">
            <Globe size={14} />

            <span>EN</span>

            <span>⌄</span>
          </button>
        </div>
      </div>

      {/* Menu */}
      <nav className="hidden h-12 items-center justify-center lg:flex">
        <div className="flex items-center gap-10 text-sm font-medium text-white">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-blue-200"
          >
            <Hospital size={15} />
            Home
          </Link>

          <Link
            href="/tentang-kami"
            className="flex items-center gap-2 hover:text-blue-200"
          >
            <Stethoscope size={15} />
            Tentang kami
          </Link>

          <Link
            href="/riwayat-kesehatan"
            className="flex items-center gap-2 hover:text-blue-200"
          >
            <HeartPulse size={15} />
            Riwayat Kesehatan
          </Link>

          <Link
            href="/jadwal-donor"
            className="flex items-center gap-2 hover:text-blue-200"
          >
            <Clock3 size={15} />
            Jadwal Donor Darah
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 hover:text-blue-200"
          >
            <ShieldCheck size={15} />
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
