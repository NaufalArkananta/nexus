type Props = {
  photo: string | null;
  title: string;
  caption: string | null;
};

export default function ArticleHero({ photo, title, caption }: Props) {
  if (!photo) return null;

  return (
    <figure className="mx-auto mt-8 max-w-5xl">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 sm:aspect-[21/9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={title} className="size-full object-cover" />
      </div>

      {caption && (
        <figcaption className="mt-3 text-xs italic text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}