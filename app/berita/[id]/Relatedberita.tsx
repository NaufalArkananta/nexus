import { BeritaListItem } from "./Berita";
import BeritaCard from "./Beritacard";

type Props = {
  items: BeritaListItem[];
  category: string;
};

export default function RelatedBerita({ items, category }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="bg-slate-50 px-6 py-14 sm:px-10 lg:px-12">
      <h2 className="text-2xl font-bold text-[#0f2a4d]">
        Berita Terkait Lainnya
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Jelajahi informasi lain seputar {category.toLowerCase()}.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <BeritaCard key={item.id} berita={item} />
        ))}
      </div>
    </section>
  );
}