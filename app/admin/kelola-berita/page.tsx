"use client";

import { useEffect, useState } from "react";
import { isAxiosError, isCancel } from "axios";
import { ChevronDown, Plus, Search } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import type {
  AdminBeritaItem,
  BeritaListResponse,
  BeritaMeta,
  BeritaStats,
} from "./lib/berita-admin";
import StatCard from "./components/StatCard";
import { BERITA_CATEGORIES } from "./lib/berita-options";
import BeritaTable from "./components/BeritaTable";
import Pagination from "./components/Pagination";
import AddBeritaModal from "./components/AddBeritaModal";

const PAGE_SIZE = 6;

export default function KelolaBeritaPage() {
  const [items, setItems] = useState<AdminBeritaItem[]>([]);
  const [meta, setMeta] = useState<BeritaMeta | null>(null);
  const [stats, setStats] = useState<BeritaStats | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

  // Debounce pencarian
  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    axiosInstance
      .get<BeritaListResponse>("/api/berita", {
        params: {
          status: "all",
          page,
          limit: PAGE_SIZE,
          search: search || undefined,
          category: category || undefined,
        },
      })
      .then((res) => {
        if (!active) return;

        setItems(res.data.data);
        setMeta(res.data.meta);
        setStats(res.data.stats ?? null);
      })
      .catch((err: unknown) => {
        if (!active) return;

        setError(
          (isAxiosError(err) && err.response?.data?.message) ||
            "Terjadi kesalahan saat mengambil data",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, search, category, reloadKey]);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    axiosInstance
      .get<BeritaListResponse>("/api/berita", {
        params: {
          status: "all",
          page,
          limit: PAGE_SIZE,
          search: search || undefined,
          category: category || undefined,
        },
        signal: controller.signal,
      })
      .then((res) => {
        setItems(res.data.data);
        setMeta(res.data.meta);
        setStats(res.data.stats ?? null);
      })
      .catch((err: unknown) => {
        if (isCancel(err)) return;

        setError(
          (isAxiosError(err) && err.response?.data?.message) ||
            "Terjadi kesalahan saat mengambil data",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page, search, category, reloadKey]);

  const total = meta?.total ?? 0;
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0f2a4d]">Kelola Berita</h1>
          <p className="mt-2 text-sm text-slate-500">
            Bagikan informasi dan kabar terbaru dari rumah sakit.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0A56D8] px-5 text-sm font-semibold text-white transition hover:bg-[#0846b0]"
        >
          <Plus className="size-4" aria-hidden />
          Tambah Berita
        </button>
      </div>

      {/* Statistik */}
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard label="Total berita" value={stats?.total ?? null} />
        <StatCard label="Dipublikasikan" value={stats?.terbit ?? null} />
        <StatCard label="Draf" value={stats?.draf ?? null} />
      </div>

      {/* Tabel */}
      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="relative min-w-[220px] flex-1 sm:max-w-sm">
            <Search
              className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari judul berita..."
              aria-label="Cari judul berita"
              className="h-10 w-full bg-transparent pl-7 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="relative">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              aria-label="Filter kategori"
              className="h-10 cursor-pointer appearance-none rounded-lg bg-white pl-3 pr-8 text-sm text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
            >
              <option value="">Semua kategori</option>
              {BERITA_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-slate-500"
              aria-hidden
            />
          </div>
        </div>

        <div className="pt-6">
          <BeritaTable
            items={items}
            loading={loading}
            error={error}
            filtered={!!search || !!category}
            pageSize={PAGE_SIZE}
            onRetry={() => setReloadKey((key) => key + 1)}
          />
        </div>

        {!error && total > 0 && (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <p className="text-sm text-slate-500">
              Menampilkan {from}–{to} dari {total} berita
            </p>

            <Pagination
              page={page}
              totalPages={meta?.totalPages ?? 1}
              onChange={setPage}
            />
          </div>
        )}
      </section>

      <AddBeritaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setPage(1);
          setReloadKey((key) => key + 1);
        }}
      />
    </div>
  );
}
