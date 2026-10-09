import { GraduationCap } from "lucide-react";

type Props = {
  photo: string | null;
  name: string;
  type: string;
};

export default function EventHero({ photo, name, type }: Props) {
  return (
    <div className="relative h-56 overflow-hidden rounded-2xl bg-slate-200 sm:h-72 lg:h-[336px]">
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt={name} className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center text-sm text-slate-500">
          Belum ada foto
        </div>
      )}

      <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
        <GraduationCap className="size-4" aria-hidden />
        {type}
      </span>
    </div>
  );
}