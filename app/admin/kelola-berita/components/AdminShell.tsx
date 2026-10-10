"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  Newspaper,
  Settings,
  Stethoscope,
  Sunrise,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

// TODO: ganti dengan data user yang sedang login
const ADMIN_NAME = "Admin Medika";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  group?: string;
};

const NAV: NavItem[] = [
  { label: "Ringkasan", href: "/admin", icon: LayoutDashboard },
  { label: "Berita", href: "/admin/berita", icon: Newspaper, group: "Konten" },
  { label: "Layanan", href: "/admin/layanan", icon: Stethoscope, group: "Konten" },
  { label: "Dokter", href: "/admin/dokter", icon: Users, group: "Konten" },
  { label: "Jadwal", href: "/admin/jadwal", icon: CalendarDays, group: "Konten" },
  { label: "Galeri", href: "/admin/galeri", icon: ImageIcon, group: "Konten" },
  { label: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
];

const isActive = (pathname: string, href: string) =>
  href === "/admin"
    ? pathname === "/admin"
    : pathname === href || pathname.startsWith(`${href}/`);

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-lg bg-[#0B4DA8] text-white">
        <Sunrise className="size-5" aria-hidden />
      </span>
      <span className="text-lg font-bold tracking-tight text-[#0B3A7A]">
        MEDLINK
      </span>
    </div>
  );
}

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Menu admin" className="mt-8 space-y-1.5">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex h-12 items-center gap-4 rounded-xl px-4 text-sm font-medium transition ${
              active
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <item.icon className="size-5" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Tutup drawer saat pindah halaman
  useEffect(() => setMenuOpen(false), [pathname]);

  const active = NAV.find((item) => isActive(pathname, item.href));
  const breadcrumb = active
    ? active.group
      ? [active.group, active.label]
      : [active.label]
    : [];

  const initials = ADMIN_NAME.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-900">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] border-r border-slate-100 bg-white px-7 py-7 lg:block">
        <Logo />
        <SidebarNav pathname={pathname} />
      </aside>

      {/* Drawer mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 w-[260px] bg-white px-6 py-7 shadow-xl">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup menu"
                className="flex size-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <SidebarNav pathname={pathname} />
          </aside>
        </div>
      )}

      <div className="lg:pl-[248px]">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between bg-white px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              className="flex size-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>

            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-slate-500">
                {breadcrumb.map((label, index) => (
                  <li key={label} className="flex items-center gap-2">
                    {index > 0 && <span aria-hidden>/</span>}
                    <span
                      aria-current={
                        index === breadcrumb.length - 1 ? "page" : undefined
                      }
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Notifikasi"
              className="flex size-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <Bell className="size-5" aria-hidden />
            </button>

            <div className="flex items-center gap-3">
              <span
                className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700"
                aria-hidden
              >
                {initials}
              </span>
              <span className="hidden text-sm font-medium text-slate-800 sm:block">
                {ADMIN_NAME}
              </span>
            </div>
          </div>
        </header>

        <main className="px-6 py-10 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
