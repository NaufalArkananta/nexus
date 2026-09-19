"use client";

import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    noHp: "",
    email: "",
    password: "",
    kotaKabupaten: "",
    kecamatan: "",
    desa: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowModal(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

        {/* ================= LEFT ================= */}
        <section className="relative flex min-h-screen flex-col justify-between bg-[#1759BD] px-8 py-8 text-white lg:px-14 lg:py-12">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
                <Image 
                  src="/Frame.png"
                  alt="Next.js logo"
                  width={50}
                  height={50}
                />

              <span className="text-xl font-bold tracking-tight">
                MEDLINK
              </span>
            </div>
          </div>

          {/* Hero */}
          <div className="max-w-xl">

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight lg:text-[40px]">
              Jaringan Pengiriman
              <br />
              Darurat Darah Hiperlokal
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-white/90">
              Menyediakan akses terverifikasi bagi institusi layanan
              kesehatan untuk menyiarkan peringatan pengiriman darah
              darurat secara instan kepada para pendonor regional
              yang memenuhi syarat.
            </p>

            {/* Features */}
            <div className="mt-6 space-y-4">

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
        <section className="flex min-h-screen items-center justify-center bg-white px-6 py-10 lg:px-12">

          <div className="w-full max-w-[430px]">

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                Registrasi Pengguna
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Daftarkan Diri Anda untuk bergabung dengan kami.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Name */}
              <InputField
                label="Name"
                name="nama"
                type="text"
                placeholder="e.g. Manuel Backher"
                value={form.nama}
                onChange={handleChange}
              />

              {/* No HP */}
              <InputField
                label="No.HP"
                name="noHp"
                type="tel"
                placeholder="e.g. 628123456789"
                value={form.noHp}
                onChange={handleChange}
              />

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

              {/* Kota / Kabupaten */}
              <InputField
                label="Kota / Kabupaten"
                name="kotaKabupaten"
                type="text"
                placeholder="e.g. Malang"
                value={form.kotaKabupaten}
                onChange={handleChange}
              />

              {/* Kecamatan */}
              <InputField
                label="Kecamatan"
                name="kecamatan"
                type="text"
                placeholder="e.g. Soekarno Hatta"
                value={form.kecamatan}
                onChange={handleChange}
              />

              {/* Desa */}
              <InputField
                label="Desa"
                name="desa"
                type="text"
                placeholder="e.g. Sawojajar"
                value={form.desa}
                onChange={handleChange}
              />

              {/* Button */}
              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-[#1759BD] py-2.5 text-sm font-semibold text-white transition hover:bg-[#124da8] active:scale-[0.99]"
              >
                Verifikasi
              </button>

            </form>

            {/* Login */}
            <div className="mt-4 text-center text-xs text-gray-400">
              Sudah Registrasi?{" "}
              <a
                href="/login"
                className="font-semibold text-[#1759BD] hover:underline"
              >
                Log in
              </a>
            </div>

          </div>
        </section>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">

          <div className="w-full max-w-[340px] rounded-xl bg-white p-6 shadow-2xl">

            {/* Icon */}
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3L20 6V11C20 16.1 16.6 20.7 12 22C7.4 20.7 4 16.1 4 11V6L12 3Z"
                  stroke="#16A34A"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                <path
                  d="M8.5 12L11 14.5L15.5 9.5"
                  stroke="#16A34A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-gray-900">
              Verifikasi Berhasil
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs leading-5 text-gray-500">
              Pendaftaran Anda sedang menunggu verifikasi manual.
              Perkiraan waktu pemrosesan: 24 jam.
            </p>

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full rounded-md border border-[#1759BD] py-2 text-xs font-medium text-[#1759BD] transition hover:bg-[#1759BD] hover:text-white"
            >
              Tutup
            </button>

          </div>
        </div>
      )}
    </main>
  );
}

/* =====================================================
   INPUT COMPONENT
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
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#1759BD] focus:ring-1 focus:ring-[#1759BD]"
        required
      />
    </div>
  );
}

/* =====================================================
   FEATURE COMPONENT
===================================================== */

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-white/80">
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 12L10 17L19 7"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span className="text-xs text-white/95">
        {text}
      </span>

    </div>
  );
}