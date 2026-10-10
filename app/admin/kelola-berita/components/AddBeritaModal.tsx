"use client";

import { useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import { ChevronDown, Loader2, X } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import FormField, { inputClass } from "./FormField";
import PhotoDropzone from "./PhotoDropzone";
import MarkdownEditor from "./MarkdownEditor";
import { BERITA_CATEGORIES, BERITA_STATUS } from "../lib/berita-options";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

type FieldKey =
  | "title"
  | "category"
  | "status"
  | "author"
  | "publishedAt"
  | "readMinutes"
  | "content";

type Errors = Partial<Record<FieldKey, string>>;

const todayLocal = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

export default function AddBeritaModal({ open, onClose, onSuccess }: Props) {
  // Form hanya di-mount saat modal terbuka, sehingga otomatis ter-reset
  if (!open) return null;

  return <BeritaFormModal onClose={onClose} onSuccess={onSuccess} />;
}

function BeritaFormModal({
  onClose,
  onSuccess,
}: Omit<Props, "open">) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedAt, setPublishedAt] = useState(todayLocal);
  const [readMinutes, setReadMinutes] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoCaption, setPhotoCaption] = useState("");
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  // Fokus awal, kunci scroll halaman, dan tutup dengan Escape
  useEffect(() => {
    titleRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, submitting]);

  const clearError = (key: FieldKey) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  const validate = () => {
    const next: Errors = {};

    if (!title.trim()) next.title = "Judul berita wajib diisi";
    if (!category) next.category = "Pilih kategori";
    if (!status) next.status = "Pilih status publikasi";
    if (!author.trim()) next.author = "Nama penulis wajib diisi";
    if (!publishedAt) next.publishedAt = "Tanggal terbit wajib diisi";

    if (
      readMinutes &&
      (!Number.isInteger(Number(readMinutes)) || Number(readMinutes) < 1)
    ) {
      next.readMinutes = "Isi dengan angka bulat";
    }

    if (!content.trim()) next.content = "Isi berita wajib diisi";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting || !validate()) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("category", category);
      formData.append("status", status);
      formData.append("author", author.trim());
      formData.append("published_at", publishedAt);
      formData.append("content", content.trim());

      if (readMinutes) formData.append("read_minutes", readMinutes);
      if (photoCaption.trim()) {
        formData.append("photo_caption", photoCaption.trim());
      }
      if (photo) formData.append("photo", photo);

      await axiosInstance.post("/api/berita", formData);

      onSuccess?.();
      onClose();
    } catch (error) {
      setServerError(
        (isAxiosError(error) && error.response?.data?.message) ||
          "Berita gagal disimpan. Coba lagi.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const describedBy = (key: FieldKey, id: string) =>
    errors[key] ? `${id}-error` : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="tambah-berita-title"
        noValidate
        onSubmit={handleSubmit}
        className="flex max-h-[92vh] w-full max-w-[800px] flex-col overflow-hidden rounded-2xl bg-white text-slate-900 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-5">
          <h2
            id="tambah-berita-title"
            className="text-2xl font-bold text-[#0f2a4d]"
          >
            Tambah Berita Baru
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Tutup"
            className="flex size-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-50"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-8 py-6">
          {serverError && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {serverError}
            </p>
          )}

          <FormField label="Judul Berita" htmlFor="title" error={errors.title}>
            <input
              ref={titleRef}
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                clearError("title");
              }}
              disabled={submitting}
              placeholder="Masukkan judul berita"
              aria-invalid={!!errors.title}
              aria-describedby={describedBy("title", "title")}
              className={inputClass}
            />
          </FormField>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField label="Kategori" htmlFor="category" error={errors.category}>
              <SelectBox
                id="category"
                value={category}
                placeholder="Pilih kategori"
                disabled={submitting}
                invalid={!!errors.category}
                describedBy={describedBy("category", "category")}
                onChange={(value) => {
                  setCategory(value);
                  clearError("category");
                }}
                options={BERITA_CATEGORIES.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </FormField>

            <FormField
              label="Status Publikasi"
              htmlFor="status"
              error={errors.status}
            >
              <SelectBox
                id="status"
                value={status}
                placeholder="Pilih status: Draf / Terbit"
                disabled={submitting}
                invalid={!!errors.status}
                describedBy={describedBy("status", "status")}
                onChange={(value) => {
                  setStatus(value);
                  clearError("status");
                }}
                options={[...BERITA_STATUS]}
              />
            </FormField>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FormField label="Penulis" htmlFor="author" error={errors.author}>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  clearError("author");
                }}
                disabled={submitting}
                placeholder="Nama penulis"
                aria-invalid={!!errors.author}
                aria-describedby={describedBy("author", "author")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Tanggal Terbit"
              htmlFor="publishedAt"
              error={errors.publishedAt}
            >
              <input
                id="publishedAt"
                type="date"
                value={publishedAt}
                onChange={(e) => {
                  setPublishedAt(e.target.value);
                  clearError("publishedAt");
                }}
                disabled={submitting}
                aria-invalid={!!errors.publishedAt}
                aria-describedby={describedBy("publishedAt", "publishedAt")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Waktu Baca"
              htmlFor="readMinutes"
              error={errors.readMinutes}
              hint="Kosongkan untuk dihitung otomatis."
            >
              <div className="relative">
                <input
                  id="readMinutes"
                  type="number"
                  min={1}
                  step={1}
                  inputMode="numeric"
                  value={readMinutes}
                  onChange={(e) => {
                    setReadMinutes(e.target.value);
                    clearError("readMinutes");
                  }}
                  disabled={submitting}
                  placeholder="Contoh: 5"
                  aria-invalid={!!errors.readMinutes}
                  aria-describedby={describedBy("readMinutes", "readMinutes")}
                  className={`${inputClass} pr-14`}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                  min
                </span>
              </div>
            </FormField>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#0f2a4d]">
              Foto Sampul Berita
            </p>
            <PhotoDropzone file={photo} onChange={setPhoto} disabled={submitting} />
          </div>

          <FormField
            label="Keterangan Foto (Image Caption)"
            htmlFor="photoCaption"
            hint="Teks kecil untuk menjelaskan foto sampul."
          >
            <input
              id="photoCaption"
              type="text"
              value={photoCaption}
              onChange={(e) => setPhotoCaption(e.target.value)}
              disabled={submitting}
              placeholder="Masukkan keterangan foto sampul"
              className={inputClass}
            />
          </FormField>

          <FormField label="Isi Berita" htmlFor="content" error={errors.content}>
            <MarkdownEditor
              id="content"
              value={content}
              onChange={(value) => {
                setContent(value);
                clearError("content");
              }}
              disabled={submitting}
              invalid={!!errors.content}
              describedBy={describedBy("content", "content")}
            />
          </FormField>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 px-8 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="h-11 rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-[#0f2a4d] hover:bg-slate-50 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0A56D8] px-6 text-sm font-semibold text-white hover:bg-[#0846b0] disabled:opacity-70"
          >
            {submitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {submitting ? "Menyimpan..." : "Simpan Berita"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* =====================================================
   SELECT
===================================================== */

type SelectBoxProps = {
  id: string;
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
};

function SelectBox({
  id,
  value,
  placeholder,
  options,
  onChange,
  disabled,
  invalid,
  describedBy,
}: SelectBoxProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={`${inputClass} appearance-none pr-10 ${
          value ? "" : "text-slate-400"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-slate-900"
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500"
        aria-hidden
      />
    </div>
  );
}
