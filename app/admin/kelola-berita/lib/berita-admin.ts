import { BeritaListItem } from "@/app/berita/[id]/Berita";
import { BeritaStatus } from "./berita-options";

export type AdminBeritaItem = BeritaListItem & {
  status: BeritaStatus;
  readMinutes: number | null;
};

export type BeritaMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type BeritaStats = {
  total: number;
  terbit: number;
  draf: number;
};

export type BeritaListResponse = {
  message: string;
  data: AdminBeritaItem[];
  meta: BeritaMeta;
  stats?: BeritaStats;
};

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

// 2026-10-06 -> "06 Okt 2026"
export function formatTanggalPendek(date: string) {
  return dateFormatter.format(new Date(date));
}
