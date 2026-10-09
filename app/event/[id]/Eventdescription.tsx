import { parseObjectives } from "./event";

type Props = {
  desc: string;
  objective: string;
};

export default function EventDescription({ desc, objective }: Props) {
  const objectives = parseObjectives(objective);

  return (
    <section>
      <h2 className="text-2xl font-bold text-[#0f2a4d]">Deskripsi Kegiatan</h2>

      <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
        {desc}
      </p>

      {objectives.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-[#0f2a4d]">
            Apa yang akan Anda pelajari:
          </h3>

          <ul className="mt-3 space-y-2">
            {objectives.map((item) => (
              <li key={item} className="flex gap-3 text-slate-600">
                <span
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-600"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}