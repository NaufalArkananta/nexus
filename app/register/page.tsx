
"use client";

import Image from "next/image";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import RegionInput from "./RegionInput";
import { axiosInstance } from "@/lib/axios";

type Region = {
  code: string;
  name: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [provinces, setProvinces] = useState<Region[]>([]);
  const [regencies, setRegencies] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<Region[]>([]);
  const [villages, setVillages] = useState<Region[]>([]);

  const [selectedProvince, setSelectedProvince] =
    useState<Region | null>(null);
  const [selectedRegency, setSelectedRegency] =
    useState<Region | null>(null);
  const [selectedDistrict, setSelectedDistrict] =
    useState<Region | null>(null);

  const [provinceSearch, setProvinceSearch] = useState("");
  const [kotaKabupaten, setKotaKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [desa, setDesa] = useState("");

  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [golDarah, setGolDarah] = useState("");

  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Ambil provinsi
  useEffect(() => {
    const controller = new AbortController();

    const fetchProvinces = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/wilayah/provinces",
          { signal: controller.signal }
        );

        setProvinces(response.data.data);
      } catch (error) {
        if (axios.isCancel(error)) return;

        console.error("Gagal mengambil provinsi:", error);
      }
    };

    fetchProvinces();

    return () => controller.abort();
  }, []);

  // Ambil kabupaten/kota
  useEffect(() => {
    const controller = new AbortController();

    if (!selectedProvince) {
      setRegencies([]);
      return () => controller.abort();
    }

    const fetchRegencies = async () => {
      setLoadingRegencies(true);

      try {
        const response = await axiosInstance.get(
          `/api/wilayah/regencies/${selectedProvince.code}`,
          { signal: controller.signal }
        );

        setRegencies(response.data.data);
      } catch (error) {
        if (axios.isCancel(error)) return;

        console.error(
          "Gagal mengambil kabupaten/kota:",
          error
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoadingRegencies(false);
        }
      }
    };

    fetchRegencies();

    return () => controller.abort();
  }, [selectedProvince]);

  // Ambil kecamatan
  useEffect(() => {
    const controller = new AbortController();

    if (!selectedRegency) {
      setDistricts([]);
      return () => controller.abort();
    }

    const fetchDistricts = async () => {
      setLoadingDistricts(true);

      try {
        const response = await axiosInstance.get(
          `/api/wilayah/districts/${selectedRegency.code}`,
          { signal: controller.signal }
        );

        setDistricts(response.data.data);
      } catch (error) {
        if (axios.isCancel(error)) return;

        console.error("Gagal mengambil kecamatan:", error);
      } finally {
        if (!controller.signal.aborted) {
          setLoadingDistricts(false);
        }
      }
    };

    fetchDistricts();

    return () => controller.abort();
  }, [selectedRegency]);

  // Ambil desa/kelurahan
  useEffect(() => {
    const controller = new AbortController();

    if (!selectedDistrict) {
      setVillages([]);
      return () => controller.abort();
    }

    const fetchVillages = async () => {
      setLoadingVillages(true);

      try {
        const response = await axiosInstance.get(
          `/api/wilayah/villages/${selectedDistrict.code}`,
          { signal: controller.signal }
        );

        setVillages(response.data.data);
      } catch (error) {
        if (axios.isCancel(error)) return;

        console.error("Gagal mengambil desa:", error);
      } finally {
        if (!controller.signal.aborted) {
          setLoadingVillages(false);
        }
      }
    };

    fetchVillages();

    return () => controller.abort();
  }, [selectedDistrict]);

  // Registrasi pengguna
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        nama,
        noHp,
        email,
        password,
        golDarah,
        provinsi: selectedProvince?.name,
        kabupatenKota: kotaKabupaten,
        kecamatan,
        desaKelurahan: desa,
      };

      await axiosInstance.post(
        "/api/auth/register",
        payload
      );
      
      router.replace("/login");

      setShowModal(true);
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;

      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||
            "Registrasi gagal. Periksa koneksi dan coba lagi."
        );
      } else {
        setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Panel kiri */}
        <section className="flex min-h-screen flex-col justify-between bg-[#1759BD] px-8 py-8 text-white lg:px-14 lg:py-12">
          <div className="flex items-center gap-3">
            <Image
              src="/Frame.png"
              alt="MedLink"
              width={50}
              height={50}
            />
            <span className="text-xl font-bold tracking-tight">
              MEDLINK
            </span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight lg:text-[40px]">
              Jaringan Pengiriman
              <br />
              Darurat Darah Hiperlokal
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-white/90">
              Menyediakan akses terverifikasi bagi institusi
              layanan kesehatan untuk menyiarkan peringatan
              pengiriman darah darurat kepada pendonor regional
              yang memenuhi syarat.
            </p>

            <div className="mt-6 space-y-4">
              <Feature text="Pengendalian Akses untuk Verifikasi Kode Fasilitas Pelayanan Kesehatan" />
              <Feature text="Data diawasi oleh Pemerintah" />
              <Feature text="Algoritma pencocokan hiperlocal instan untuk peringatan kritis" />
            </div>
          </div>

          <p className="text-[10px] text-white/80">
            © 2026 MEDLINKSync. Standardizing hyperlocal B2B
            medical dispatch.
          </p>
        </section>

        {/* Panel kanan */}
        <section className="flex min-h-screen items-center justify-center bg-white px-6 py-10 lg:px-12">
          <div className="w-full max-w-[430px]">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                Registrasi Pengguna
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Daftarkan diri Anda untuk bergabung dengan kami.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Nama"
                name="nama"
                type="text"
                placeholder="Nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />

              <InputField
                label="Golongan Darah"
                name="golDarah"
                type="text"
                placeholder="Contoh: O"
                value={golDarah}
                onChange={(e) => setGolDarah(e.target.value)}
              />

              <InputField
                label="Nomor HP"
                name="noHp"
                type="tel"
                placeholder="628123456789"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Minimal sesuai aturan server"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <RegionInput
                label="Provinsi"
                placeholder="Cari provinsi..."
                value={provinceSearch}
                regions={provinces}
                onChange={(e) => {
                  setProvinceSearch(e.target.value);
                  setSelectedProvince(null);
                  setSelectedRegency(null);
                  setSelectedDistrict(null);
                  setKotaKabupaten("");
                  setKecamatan("");
                  setDesa("");
                }}
                onSelect={(region) => {
                  setSelectedProvince(region);
                  setProvinceSearch(region.name);
                  setSelectedRegency(null);
                  setSelectedDistrict(null);
                  setKotaKabupaten("");
                  setKecamatan("");
                  setDesa("");
                }}
              />

              <RegionInput
                label="Kota / Kabupaten"
                placeholder="Cari kota atau kabupaten..."
                value={kotaKabupaten}
                regions={regencies}
                loading={loadingRegencies}
                disabled={!selectedProvince}
                onChange={(e) => {
                  setKotaKabupaten(e.target.value);
                  setSelectedRegency(null);
                  setSelectedDistrict(null);
                  setKecamatan("");
                  setDesa("");
                }}
                onSelect={(region) => {
                  setSelectedRegency(region);
                  setKotaKabupaten(region.name);
                  setSelectedDistrict(null);
                  setKecamatan("");
                  setDesa("");
                }}
              />

              <RegionInput
                label="Kecamatan"
                placeholder="Cari kecamatan..."
                value={kecamatan}
                regions={districts}
                loading={loadingDistricts}
                disabled={!selectedRegency}
                onChange={(e) => {
                  setKecamatan(e.target.value);
                  setSelectedDistrict(null);
                  setDesa("");
                }}
                onSelect={(region) => {
                  setSelectedDistrict(region);
                  setKecamatan(region.name);
                  setDesa("");
                }}
              />

              <RegionInput
                label="Desa"
                placeholder="Cari desa..."
                value={desa}
                regions={villages}
                loading={loadingVillages}
                disabled={!selectedDistrict}
                onChange={(e) => setDesa(e.target.value)}
                onSelect={(region) => setDesa(region.name)}
              />

              {errorMessage && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded-md bg-[#1759BD] py-2.5 text-sm font-semibold text-white transition hover:bg-[#124da8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Memproses..." : "Verifikasi"}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-400">
              Sudah registrasi?{" "}
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

      {/* Modal sukses */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-[340px] rounded-xl bg-white p-6 shadow-2xl">
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

            <h3 className="text-base font-bold text-gray-900">
              Registrasi Berhasil
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Pendaftaran Anda sedang menunggu verifikasi manual.
              Perkiraan waktu pemrosesan: 24 jam.
            </p>

            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="mt-5 w-full rounded-md bg-[#1759BD] py-2 text-xs font-medium text-white hover:bg-[#124da8]"
            >
              Lanjut ke Login
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

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