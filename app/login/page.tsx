"use client";

import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const payload = {
        email,
        password,
      };

      const response = await axiosInstance.post("/api/auth/login", payload);

      setTimeout(() => {
        router.replace("/home");
      }, 1200);
    } catch (error: any) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password */}
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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