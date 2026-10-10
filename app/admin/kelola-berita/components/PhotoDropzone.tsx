"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function validatePhoto(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Foto harus berupa JPG, PNG, atau WebP";
  }

  if (file.size > MAX_SIZE) {
    return "Ukuran foto maksimal 5 MB";
  }

  return null;
}

type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
};

export default function PhotoDropzone({ file, onChange, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = (selected: File | undefined) => {
    if (!selected) return;

    const message = validatePhoto(selected);
    setError(message);

    if (!message) onChange(selected);
  };

  const remove = () => {
    onChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const open = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Pilih foto sampul"
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) pick(e.dataTransfer.files[0]);
        }}
        className={`flex cursor-pointer items-center gap-4 rounded-xl border border-dashed p-5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 ${
          dragging
            ? "border-blue-600 bg-blue-50"
            : "border-slate-300 bg-slate-50 hover:border-blue-400"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Pratinjau foto sampul"
            className="size-16 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <ImagePlus className="size-5" aria-hidden />
          </span>
        )}

        <div className="min-w-0 flex-1">
          {file ? (
            <>
              <p className="truncate text-sm font-medium text-slate-800">
                {file.name}
              </p>
              <p className="text-xs text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                <span className="font-medium text-blue-700">Pilih foto</span>{" "}
                atau tarik dan lepaskan di sini
              </p>
              <p className="text-xs text-slate-500">
                JPG, PNG atau WebP · Maks. 5 MB
              </p>
            </>
          )}
        </div>

        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              remove();
            }}
            disabled={disabled}
            aria-label="Hapus foto"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            pick(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>

      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
