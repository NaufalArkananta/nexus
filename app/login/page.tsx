"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* ================= LEFT ================= */}
        <section className="relative flex flex-col justify-between gap-10 bg-[#1759BD] px-6 py-10 text-white sm:px-10 sm:py-12 lg:gap-0 lg:px-14 lg:py-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/Frame.png"
                alt="Next.js logo"
                width={40}
                height={40}
                className="h-9 w-9 sm:h-[50px] sm:w-[50px]"
              />

              <span className="text-lg font-bold tracking-tight sm:text-xl">
                MEDLINK
              </span>
            </div>
          </div>

          {/* Hero */}
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[40px] lg:leading-[1.1]">
              Jaringan Pengiriman
              <br />
              Darurat Darah Hiperlokal
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-white/90 sm:mt-5">
              Menyediakan akses terverifikasi bagi institusi layanan kesehatan
              untuk menyiarkan peringatan pengiriman darah darurat secara instan
              kepada para pendonor regional yang memenuhi syarat.
            </p>

            {/* Features */}
            <div className="mt-6 space-y-3 sm:space-y-4">
              <Feature text="Pengendalian Akses untuk Verifikasi Kode Fasilitas Pelayanan Kesehatan" />

              <Feature text="Data diawasi oleh Pemerintah" />

              <Feature text="Algoritma pencocokan hiperlocal instan untuk peringatan kritis" />
            </div>
          </div>

          {/* Footer */}
          <div>
            <p className="text-[10px] text-white/80">
              © 2026 MEDLINKSync. Standardizing hyperlocal B2B medical dispatch.
            </p>
          </div>
        </section>

        {/* ================= RIGHT ================= */}
        <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-[430px]">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                Masuk Pengguna
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Daftarkan diri anda untuk bergabung dengan kami.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="e.g. ManuelBackher@gmail.com"
                value={form.email}
                onChange={handleChange}
              />

              {/* Password */}
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />

              {/* Login Button */}
              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-[#1759BD] py-2.5 text-sm font-semibold text-white transition hover:bg-[#124da8] active:scale-[0.99]"
              >
                Login
              </button>
            </form>

            {/* Register */}
            <div className="mt-4 text-center text-xs text-gray-400">
              Belum punya akun?{" "}
              <a
                href="/register"
                className="font-semibold text-[#1759BD] hover:underline"
              >
                Sign In
              </a>
            </div>

            {/* OR Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs text-gray-400">or</span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="flex items-center justify-center gap-3">
              {/* Google */}
              <button
                type="button"
                className="flex w-1/2 max-w-[140px] items-center justify-center rounded-3xl border border-gray-300 bg-white py-2.5 text-gray-700 transition hover:bg-gray-50"
              >
                <GoogleIcon />
              </button>

              {/* Apple */}
              <button
                type="button"
                className="flex w-1/2 max-w-[140px] items-center justify-center rounded-3xl border border-gray-300 bg-white py-2.5 text-gray-700 transition hover:bg-gray-50"
              >
                <AppleIcon />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =====================================================
   INPUT
===================================================== */

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[11px] font-semibold text-gray-800"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#1759BD] focus:ring-1 focus:ring-[#1759BD]"
      />
    </div>
  );
}

/* =====================================================
   FEATURE
===================================================== */

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-white/80">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12L10 17L19 7"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span className="text-xs text-white/95">{text}</span>
    </div>
  );
}

/* =====================================================
   GOOGLE ICON
===================================================== */

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.35 12.27C21.35 11.47 21.28 10.69 21.04 9.94H12V13.98H17.1C16.88 15.28 15.35 16.98 14.08 18.08V20.72H17.65C19.74 18.79 21.35 15.92 21.35 12.27Z"
        fill="#4285F4"
      />

      <path
        d="M12 21.5C14.98 21.5 17.47 20.52 19.31 18.83L15.74 16.19C14.75 16.85 13.49 17.23 12 17.23C9.12 17.23 6.68 15.28 5.81 12.65H2.12V15.37C3.95 19.02 7.71 21.5 12 21.5Z"
        fill="#34A853"
      />

      <path
        d="M5.81 12.65C5.58 11.98 5.46 11.26 5.46 10.5C5.46 9.74 5.58 9.02 5.81 8.35V5.63H2.12C1.34 7.16 0.9 8.83 0.9 10.5C0.9 12.17 1.34 13.84 2.12 15.37L5.81 12.65Z"
        fill="#FBBC05"
      />

      <path
        d="M12 3.77C13.63 3.77 15.09 4.33 16.25 5.42L19.39 2.28C17.47 0.49 14.98 -0.5 12 -0.5C7.71 -0.5 3.95 1.98 2.12 5.63L5.81 8.35C6.68 5.72 9.12 3.77 12 3.77Z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* =====================================================
   APPLE ICON
===================================================== */

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28C16.03 21.28 14.92 21.16 13.85 20.69C12.72 20.21 11.69 20.18 10.5 20.69C9.01 21.34 8.22 21.15 7.32 20.28C2.82 15.65 3.48 8.2 8.57 7.93C9.81 7.99 10.89 8.61 11.8 8.67C13.16 8.39 14.46 7.75 15.91 7.89C17.65 8.03 18.96 8.72 19.82 10.1C16.22 12.25 17.08 16.98 20.34 18.3C19.68 20.02 18.83 21.71 17.05 20.28ZM11.7 7.85C11.52 5.3 13.6 3.2 16.02 3C16.35 5.95 13.34 8.13 11.7 7.85Z" />
    </svg>
  );
}