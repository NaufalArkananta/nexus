const EVENT_API_URL = "/api/event";

export type EventHospital = {
  id: number;
  namaRumahSakit: string;
};

export type EventDetail = {
  id: number;
  type: string;
  name: string;
  startDate: string;
  endDate: string;
  idRs: number;
  fee: string;
  kuota: number;
  desc: string;
  objective: string;
  photo: string | null;
  createdBy: number;
  createdAt: string;
  hospital: EventHospital;
};

export type RegistrationStatus = "open" | "full" | "closed";

export async function getEventById(
  id: string,
  signal?: AbortSignal,
): Promise<EventDetail> {
  const res = await fetch(`${EVENT_API_URL}/${id}`, {
    signal,
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(json?.message ?? "Gagal mengambil data acara");
  }

  return json.data as EventDetail;
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDateRange(startDate: string, endDate: string) {
  const start = dateFormatter.format(new Date(startDate));
  const end = dateFormatter.format(new Date(endDate));

  return start === end ? start : `${start} - ${end}`;
}

export function isFree(fee: string) {
  return Number(fee) === 0;
}

export function formatFee(fee: string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(fee));
}

// "A,B,C" -> ["A", "B", "C"]
export function parseObjectives(objective: string | null | undefined) {
  if (!objective) return [];

  return objective
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getRegistrationStatus(event: EventDetail): RegistrationStatus {
  // Pendaftaran dianggap tutup setelah hari terakhir acara berakhir
  const endOfEvent = new Date(event.endDate).getTime() + 24 * 60 * 60 * 1000;

  if (Date.now() >= endOfEvent) return "closed";
  if (event.kuota <= 0) return "full";

  return "open";
}