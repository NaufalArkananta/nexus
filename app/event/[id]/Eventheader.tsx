import { Calendar, MapPin } from "lucide-react";
import { EventDetail, formatDateRange } from "./event";

type Props = {
  event: EventDetail;
};

export default function EventHeader({ event }: Props) {
  return (
    <header className="border-b border-slate-200 pb-6">
      <h1 className="text-3xl font-bold tracking-tight text-[#0f2a4d] sm:text-4xl">
        {event.name}
      </h1>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <Calendar className="size-4 text-blue-700" aria-hidden />
          {formatDateRange(event.startDate, event.endDate)}
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="size-4 text-blue-700" aria-hidden />
          {event.hospital.namaRumahSakit}
        </li>
      </ul>
    </header>
  );
}