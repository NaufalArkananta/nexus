// Sesuaikan dengan kategori yang dipakai rumah sakit
export const BERITA_CATEGORIES = [
  "Layanan",
  "Edukasi Kesehatan",
  "Pengumuman",
  "Kegiatan",
  "Teknologi Medis",
  "Kesehatan Digital",
] as const;

export const BERITA_STATUS = [
  { value: "DRAF", label: "Draf" },
  { value: "TERBIT", label: "Terbit" },
] as const;

export type BeritaStatus = (typeof BERITA_STATUS)[number]["value"];
