"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/lib/axios";

import RegionInput from "./RegionInput";
import RegisterInput from "./RegisterInput";
import RegisterSuccessModal from "./RegisterSuccessModal";

type Region = {
  code: string;
  name: string;
};

export default function RegisterForm() {
  const router = useRouter();

  /* =====================================================
     FORM
  ===================================================== */

  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* =====================================================
     REGION
  ===================================================== */

  const [provinces, setProvinces] =
    useState<Region[]>([]);

  const [regencies, setRegencies] =
    useState<Region[]>([]);

  const [districts, setDistricts] =
    useState<Region[]>([]);

  const [villages, setVillages] =
    useState<Region[]>([]);

  const [selectedProvince, setSelectedProvince] =
    useState<Region | null>(null);

  const [selectedRegency, setSelectedRegency] =
    useState<Region | null>(null);

  const [selectedDistrict, setSelectedDistrict] =
    useState<Region | null>(null);

  const [provinceSearch, setProvinceSearch] =
    useState("");

  const [kotaKabupaten, setKotaKabupaten] =
    useState("");

  const [kecamatan, setKecamatan] =
    useState("");

  const [desa, setDesa] = useState("");

  /* =====================================================
     LOADING REGION
  ===================================================== */

  const [loadingRegencies, setLoadingRegencies] =
    useState(false);

  const [loadingDistricts, setLoadingDistricts] =
    useState(false);

  const [loadingVillages, setLoadingVillages] =
    useState(false);

  /* =====================================================
     LOADING REGISTER
  ===================================================== */

  const [isLoading, setIsLoading] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  /* =====================================================
     GET PROVINCES
  ===================================================== */

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response =
          await axiosInstance.get(
            "/api/wilayah/provinces",
          );

        setProvinces(response.data.data);
      } catch (error) {
        console.error(
          "Gagal mengambil provinsi:",
          error,
        );
      }
    };

    fetchProvinces();
  }, []);

  /* =====================================================
     GET REGENCIES
  ===================================================== */

  useEffect(() => {
    if (!selectedProvince) {
      setRegencies([]);
      return;
    }

    const fetchRegencies = async () => {
      try {
        setLoadingRegencies(true);

        const response =
          await axiosInstance.get(
            `/api/wilayah/regencies/${selectedProvince.code}`,
          );

        setRegencies(response.data.data);
      } catch (error) {
        console.error(
          "Gagal mengambil kabupaten/kota:",
          error,
        );
      } finally {
        setLoadingRegencies(false);
      }
    };

    fetchRegencies();
  }, [selectedProvince]);

  /* =====================================================
     GET DISTRICTS
  ===================================================== */

  useEffect(() => {
    if (!selectedRegency) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        setLoadingDistricts(true);

        const response =
          await axiosInstance.get(
            `/api/wilayah/districts/${selectedRegency.code}`,
          );

        setDistricts(response.data.data);
      } catch (error) {
        console.error(
          "Gagal mengambil kecamatan:",
          error,
        );
      } finally {
        setLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, [selectedRegency]);

  /* =====================================================
     GET VILLAGES
  ===================================================== */

  useEffect(() => {
    if (!selectedDistrict) {
      setVillages([]);
      return;
    }

    const fetchVillages = async () => {
      try {
        setLoadingVillages(true);

        const response =
          await axiosInstance.get(
            `/api/wilayah/villages/${selectedDistrict.code}`,
          );

        setVillages(response.data.data);
      } catch (error) {
        console.error(
          "Gagal mengambil desa:",
          error,
        );
      } finally {
        setLoadingVillages(false);
      }
    };

    fetchVillages();
  }, [selectedDistrict]);

  /* =====================================================
     HANDLE SUBMIT
  ===================================================== */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        nama,
        noHp,
        email,
        password,
        provinsi: selectedProvince?.name,
        kabupatenKota: kotaKabupaten,
        kecamatan,
        desaKelurahan: desa,
      };

      const response =
        await axiosInstance.post(
          "/api/auth/register",
          payload,
        );

    //   toast.success(
    //     response.data?.message ||
    //       "Registrasi berhasil",
    //     {
    //       containerId: "toastRegister",
    //     },
    //   );

      setShowModal(true);
    } catch (error: any) {
    //   toast.error(
    //     error.response?.data?.message ||
    //       "Registrasi gagal",
    //     {
    //       containerId: "toastRegister",
    //     },
    //   );
    } finally {
      setIsLoading(false);
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      <section className="flex min-h-screen items-center justify-center bg-white px-6 py-10 lg:px-12">
        <div className="w-full max-w-[430px]">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
              Registrasi Pengguna
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Daftarkan Diri Anda untuk bergabung dengan
              kami.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Nama */}
            <RegisterInput
              label="Name"
              name="nama"
              type="text"
              placeholder="e.g. Manuel Backher"
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
            />

            {/* No HP */}
            <RegisterInput
              label="No.HP"
              name="noHp"
              type="tel"
              placeholder="e.g. 628123456789"
              value={noHp}
              onChange={(e) =>
                setNoHp(e.target.value)
              }
            />

            {/* Email */}
            <RegisterInput
              label="Email"
              name="email"
              type="email"
              placeholder="e.g. ManuelBackher@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            {/* Password */}
            <RegisterInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {/* =================================================
                PROVINSI
            ================================================= */}

            <RegionInput
              label="Provinsi"
              placeholder="Cari provinsi..."
              value={provinceSearch}
              regions={provinces}
              onChange={(e) => {
                setProvinceSearch(
                  e.target.value,
                );

                setSelectedProvince(null);
                setSelectedRegency(null);
                setSelectedDistrict(null);

                setKotaKabupaten("");
                setKecamatan("");
                setDesa("");
              }}
              onSelect={(region) => {
                setSelectedProvince(region);

                setProvinceSearch(
                  region.name,
                );

                setSelectedRegency(null);
                setSelectedDistrict(null);

                setKotaKabupaten("");
                setKecamatan("");
                setDesa("");
              }}
            />

            {/* =================================================
                KOTA / KABUPATEN
            ================================================= */}

            <RegionInput
              label="Kota / Kabupaten"
              placeholder="Cari kota atau kabupaten..."
              value={kotaKabupaten}
              regions={regencies}
              loading={loadingRegencies}
              disabled={!selectedProvince}
              onChange={(e) => {
                setKotaKabupaten(
                  e.target.value,
                );

                setSelectedRegency(null);
                setSelectedDistrict(null);

                setKecamatan("");
                setDesa("");
              }}
              onSelect={(region) => {
                setSelectedRegency(region);

                setKotaKabupaten(
                  region.name,
                );

                setSelectedDistrict(null);

                setKecamatan("");
                setDesa("");
              }}
            />

            {/* =================================================
                KECAMATAN
            ================================================= */}

            <RegionInput
              label="Kecamatan"
              placeholder="Cari kecamatan..."
              value={kecamatan}
              regions={districts}
              loading={loadingDistricts}
              disabled={!selectedRegency}
              onChange={(e) => {
                setKecamatan(
                  e.target.value,
                );

                setSelectedDistrict(null);
                setDesa("");
              }}
              onSelect={(region) => {
                setSelectedDistrict(region);

                setKecamatan(
                  region.name,
                );

                setDesa("");
              }}
            />

            {/* =================================================
                DESA
            ================================================= */}

            <RegionInput
              label="Desa"
              placeholder="Cari desa..."
              value={desa}
              regions={villages}
              loading={loadingVillages}
              disabled={!selectedDistrict}
              onChange={(e) => {
                setDesa(e.target.value);
              }}
              onSelect={(region) => {
                setDesa(region.name);
              }}
            />

            {/* =================================================
                BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-md bg-[#1759BD] py-2.5 text-sm font-semibold text-white transition hover:bg-[#124da8] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Memproses..."
                : "Verifikasi"}
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

      {/* Modal */}
      <RegisterSuccessModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          router.replace("/login");
        }}
      />
    </>
  );
}