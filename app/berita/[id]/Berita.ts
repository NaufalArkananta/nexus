// Ganti sesuai lokasi route berita kamu
const BERITA_API_URL = "/api/berita";

export type BeritaListItem = {
  id: number;
  title: string;
  category: string;
  author: string;
  photo: string | null;
  photoCaption: string | null;
  publishedAt: string;
  createdAt: string;
};

export type BeritaDetail = BeritaListItem & {
  content: string; // Markdown
  editorNote: string | null;
  createdBy: number;
  updatedAt: string;
};

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, cache: "no-store" });
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(json?.message ?? "Gagal mengambil data berita");
  }

  return json.data as T;
}

export function getBeritaById(id: string, signal?: AbortSignal) {
  return request<BeritaDetail>(`${BERITA_API_URL}/${id}`, signal);
}

export function getRelatedBerita(
  category: string,
  excludeId: number,
  signal?: AbortSignal,
  limit = 3,
) {
  const query = new URLSearchParams({
    category,
    exclude: String(excludeId),
    limit: String(limit),
  });

  return request<BeritaListItem[]>(`${BERITA_API_URL}?${query}`, signal);
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatTanggal(date: string) {
  return dateFormatter.format(new Date(date));
}

// Perkiraan waktu baca: 200 kata per menit
export function getReadMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getInitials(name: string) {
  return name
    .replace(/^(dr|drg|prof|apt|ns)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}