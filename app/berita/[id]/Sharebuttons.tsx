"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

const buttonClass =
  "flex size-9 items-center justify-center rounded-lg bg-slate-100 text-blue-700 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => window.location.href;

  const openShare = (base: string) => {
    window.open(base, "_blank", "noopener,noreferrer");
  };

  const shareLinkedIn = () =>
    openShare(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`,
    );

  const shareX = () =>
    openShare(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}`,
    );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard tidak tersedia, abaikan
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={shareLinkedIn}
        className={buttonClass}
        aria-label="Bagikan ke LinkedIn"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={shareX}
        className={buttonClass}
        aria-label="Bagikan ke X"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={copyLink}
        className={buttonClass}
        aria-label={copied ? "Tautan disalin" : "Salin tautan"}
      >
        {copied ? (
          <Check className="size-4" aria-hidden />
        ) : (
          <Link2 className="size-4" aria-hidden />
        )}
      </button>
    </div>
  );
}