"use client";

import { use, useEffect, useState } from "react";
import { BeritaDetail, BeritaListItem, getBeritaById, getRelatedBerita } from "./Berita";
import Breadcrumb from "@/app/event/[id]/Breadcrumb";
import BeritaDetailSkeleton from "./Beritadetailskeleton";
import BeritaDetailError from "./Beritadetailerror";
import ArticleHeader from "./Articleheader";
import ArticleHero from "./Articlehero";
import ArticleContent from "./Articlecontent ";
import EditorNote from "./Editornote";
import RelatedBerita from "./Relatedberita";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function BeritaDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const [berita, setBerita] = useState<BeritaDetail | null>(null);
  const [related, setRelated] = useState<BeritaListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    setError(null);
    setBerita(null);
    setRelated([]);

    async function load() {
      try {
        const data = await getBeritaById(id, signal);
        if (signal.aborted) return;

        setBerita(data);
        setLoading(false);

        // Berita terkait: kalau gagal, cukup disembunyikan
        const items = await getRelatedBerita(data.category, data.id, signal).catch(
          () => [],
        );
        if (!signal.aborted) setRelated(items);
      } catch (err) {
        if (signal.aborted) return;
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [id]);

  return (
    // Navbar & Footer sudah ada di layout kamu
    <main className="min-h-screen w-full bg-white text-slate-900">
      <div className="px-6 py-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Berita Terkini", href: "/berita" },
              { label: berita?.category ?? "Detail Berita" },
            ]}
          />
        </div>

        <div className="mt-6 pb-14">
          {loading && <BeritaDetailSkeleton />}

          {!loading && error && <BeritaDetailError message={error} />}

          {!loading && berita && (
            <article>
              <div className="mx-auto max-w-3xl">
                <ArticleHeader berita={berita} />
              </div>

              <ArticleHero
                photo={berita.photo}
                title={berita.title}
                caption={berita.photoCaption}
              />

              <div className="mx-auto mt-10 max-w-3xl">
                <ArticleContent content={berita.content} />
                <EditorNote note={berita.editorNote} />
              </div>
            </article>
          )}
        </div>
      </div>

      {berita && <RelatedBerita items={related} category={berita.category} />}
    </main>
  );
}