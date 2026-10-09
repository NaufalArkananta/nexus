"use client";

import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";
import RegionInput from "../register/RegionInput";

export default function HospitalRegisterForm() {
  const router = useRouter();

  const [namaRumahSakit, setNamaRumahSakit] = useState("");
  const [jenisRumahSakit, setJenisRumahSakit] = useState("");
  const [kelasTipe, setKelasTipe] = useState("");
  const [statusKepemilikan, setStatusKepemilikan] = useState("");
  const [nomorIzinOperasional, setNomorIzinOperasional] = useState("");
  const [alamatLengkap, setAlamatLengkap] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [emailResmi, setEmailResmi] = useState("");
  const [namaPIC, setNamaPIC] = useState("");
  const [emailPIC, setEmailPIC] = useState("");
  const [password, setPassword] = useState("");

  const [provinces, setProvinces] = useState([]);

  const [regencies, setRegencies] = useState([]);

  const [districts, setDistricts] = useState([]);

  const [villages, setVillages] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);

  const [selectedRegency, setSelectedRegency] = useState(null);

  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [provinceSearch, setProvinceSearch] = useState("");

  const [kotaKabupaten, setKotaKabupaten] = useState("");

  const [kecamatan, setKecamatan] = useState("");

  const [desaKelurahan, setDesaKelurahan] = useState("");

  const [loadingRegencies, setLoadingRegencies] = useState(false);

  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const [loadingVillages, setLoadingVillages] = useState(false);

  const [dokumenIzinOperasional, setDokumenIzinOperasional] =
    useState<File | null>(null);

  const [persetujuan, setPersetujuan] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axiosInstance.get("/api/wilayah/provinces");

        setProvinces(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil provinsi:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!selectedProvince) {
      setRegencies([]);
      return;
    }

    const fetchRegencies = async () => {
      try {
        setLoadingRegencies(true);

        const response = await axiosInstance.get(
          `/api/wilayah/regencies/${selectedProvince.code}`,
        );

        setRegencies(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil kabupaten/kota:", error);
      } finally {
        setLoadingRegencies(false);
      }
    };

    fetchRegencies();
  }, [selectedProvince]);

  useEffect(() => {
    if (!selectedRegency) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        setLoadingDistricts(true);

        const response = await axiosInstance.get(
          `/api/wilayah/districts/${selectedRegency.code}`,
        );

        setDistricts(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil kecamatan:", error);
      } finally {
        setLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, [selectedRegency]);

  useEffect(() => {
    if (!selectedDistrict) {
      setVillages([]);
      return;
    }

    const fetchVillages = async () => {
      try {
        setLoadingVillages(true);

        const response = await axiosInstance.get(
          `/api/wilayah/villages/${selectedDistrict.code}`,
        );

        setVillages(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil desa/kelurahan:", error);
      } finally {
        setLoadingVillages(false);
      }
    };

    fetchVillages();
  }, [selectedDistrict]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    if (!persetujuan) {
      toast.error("Anda harus menyetujui pernyataan data", {
        containerId: "toastRegister",
      });
      return;
    }

    if (!dokumenIzinOperasional) {
      toast.error("Dokumen izin operasional wajib diupload", {
        containerId: "toastRegister",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("namaRumahSakit", namaRumahSakit);

      formData.append("jenisRumahSakit", jenisRumahSakit);

      formData.append("kelasTipe", kelasTipe);

      formData.append("statusKepemilikan", statusKepemilikan);

      formData.append("nomorIzinOperasional", nomorIzinOperasional);

      formData.append("alamatLengkap", alamatLengkap);

      formData.append("provinsi", selectedProvince?.name || "");

      formData.append("kabupatenKota", kotaKabupaten);

      formData.append("kecamatan", kecamatan);

      formData.append("desaKelurahan", desaKelurahan);

      formData.append("nomorTelepon", nomorTelepon);

      formData.append("emailResmi", emailResmi);

      formData.append("namaPIC", namaPIC);

      formData.append("emailPIC", emailPIC);

      formData.append("password", password);

      formData.append("persetujuan", String(persetujuan));

      formData.append("dokumenIzinOperasional", dokumenIzinOperasional);

      const response = await axiosInstance.post(
        "/api/hospital-register",
        formData,
      );

      toast.success(response.data?.message || "Pendaftaran berhasil", {
        containerId: "toastRegister",
      });

      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Pendaftaran gagal", {
        containerId: "toastRegister",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen overflow-y-auto bg-white">
      <div className="mx-auto max-w-xl px-6 py-10 md:px-10">
        {/* Header */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-[#075ca8]">
            <span>♙</span>
            VERIFIKASI INSTITUSI
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#172033]">
            Pendaftaran Rumah Sakit
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Lengkapi data institusi untuk proses verifikasi.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Rumah Sakit */}
          <InputField
            label="Nama Rumah Sakit / Faskes"
            placeholder="Masukkan nama resmi institusi"
            value={namaRumahSakit}
            onChange={(e) => setNamaRumahSakit(e.target.value)}
          />

          {/* Jenis Rumah Sakit */}
          <InputField
            label="Jenis Rumah sakit"
            placeholder="Contoh: Rumah Sakit Umum"
            value={jenisRumahSakit}
            onChange={(e) => setJenisRumahSakit(e.target.value)}
          />

          {/* Kelas */}
          <InputField
            label="Kelas/Tipe"
            placeholder="Masukkan Kelas/Tipe"
            value={kelasTipe}
            onChange={(e) => setKelasTipe(e.target.value)}
          />

          {/* Status */}
          <InputField
            label="Status Kepemilikan"
            placeholder="Masukkan Status Kepemilikan"
            value={statusKepemilikan}
            onChange={(e) => setStatusKepemilikan(e.target.value)}
          />

          {/* Nomor Izin */}
          <InputField
            label="Nomor Izin Operasional"
            placeholder="Masukkan Nomor Izin Operasional"
            value={nomorIzinOperasional}
            onChange={(e) => setNomorIzinOperasional(e.target.value)}
          />

          {/* Alamat */}
          <InputField
            label="Alamat Lengkap"
            placeholder="Masukkan Alamat Lengkap"
            value={alamatLengkap}
            onChange={(e) => setAlamatLengkap(e.target.value)}
          />

          {/* Provinsi */}
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
              setDesaKelurahan("");
            }}
            onSelect={(region) => {
              setSelectedProvince(region);
              setProvinceSearch(region.name);

              setSelectedRegency(null);
              setSelectedDistrict(null);

              setKotaKabupaten("");
              setKecamatan("");
              setDesaKelurahan("");
            }}
          />

          {/* Kabupaten */}
          <RegionInput
            label="Kabupaten / Kota"
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
              setDesaKelurahan("");
            }}
            onSelect={(region) => {
              setSelectedRegency(region);
              setKotaKabupaten(region.name);

              setSelectedDistrict(null);

              setKecamatan("");
              setDesaKelurahan("");
            }}
          />

          {/* Kecamatan */}
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
              setDesaKelurahan("");
            }}
            onSelect={(region) => {
              setSelectedDistrict(region);
              setKecamatan(region.name);

              setDesaKelurahan("");
            }}
          />

          {/* Desa */}
          <RegionInput
            label="Desa / Kelurahan"
            placeholder="Cari desa atau kelurahan..."
            value={desaKelurahan}
            regions={villages}
            loading={loadingVillages}
            disabled={!selectedDistrict}
            onChange={(e) => {
              setDesaKelurahan(e.target.value);
            }}
            onSelect={(region) => {
              setDesaKelurahan(region.name);
            }}
          />

          {/* Telepon */}
          <InputField
            label="Nomor Telepon"
            placeholder="Masukkan Nomor Telepon"
            value={nomorTelepon}
            onChange={(e) => setNomorTelepon(e.target.value)}
          />

          {/* Email Resmi */}
          <InputField
            label="Email Resmi Institusi"
            type="email"
            placeholder="nama@rumahsakit.go.id"
            value={emailResmi}
            onChange={(e) => setEmailResmi(e.target.value)}
          />

          {/* Nama PIC */}
          <InputField
            label="Nama PIC"
            placeholder="Masukan Nama PIC"
            value={namaPIC}
            onChange={(e) => setNamaPIC(e.target.value)}
          />

          {/* Email PIC */}
          <InputField
            label="Email PIC"
            type="email"
            placeholder="namaPIC@rumahsakit.go.id"
            value={emailPIC}
            onChange={(e) => setEmailPIC(e.target.value)}
          />

          {/* Password */}
          <InputField
            label="Password Akun"
            type="password"
            placeholder="Masukan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Upload */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-800">
              Dokumen Izin Operasional
            </label>

            <label className="flex min-h-[82px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-400 bg-[#f8fbff] px-4 text-center transition hover:border-[#075ca8] hover:bg-blue-50">
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[#075ca8]">
                <Upload size={15} />
              </div>

              <span className="text-xs font-semibold text-[#075ca8]">
                {dokumenIzinOperasional
                  ? dokumenIzinOperasional.name
                  : "Unggah Dokumen (.PDF)"}
              </span>

              <input
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;

                  setDokumenIzinOperasional(file);
                }}
              />
            </label>
          </div>

          {/* Agreement */}
          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={persetujuan}
              onChange={(e) => setPersetujuan(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5"
            />

            <span className="text-[10px] font-semibold text-gray-600">
              Persetujuan Pernyataan Data
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-md bg-[#1762ad] text-sm font-semibold text-white shadow-sm transition hover:bg-[#125494] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Memproses..." : "Daftar untuk Verifikasi"}
          </button>
        </form>

        {/* Bottom Information */}
        <div className="mt-12 border-t border-gray-200 pt-5">
          <div className="flex items-start gap-3 text-[10px] leading-4 text-gray-500">
            <LockKeyhole size={15} className="mt-0.5 shrink-0 text-[#27816c]" />

            <p>
              Pendaftaran ditinjau oleh tim MEDLINK. Hanya fasilitas dengan
              identitas Kemenkes yang valid dapat bergabung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= INPUT ================= */

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  label,
  placeholder,
  value,
  type = "text",
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold text-gray-800">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#1762ad] focus:ring-1 focus:ring-[#1762ad]"
      />
    </div>
  );
}
