import RegisterForm from "./RegisterForm";
import RegisterHero from "./RegisterHero";

export default function RegisterPage() {
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

              <span className="text-xl font-bold tracking-tight">MEDLINK</span>
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
              Menyediakan akses terverifikasi bagi institusi layanan kesehatan
              untuk menyiarkan peringatan pengiriman darah darurat secara instan
              kepada para pendonor regional yang memenuhi syarat.
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
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <InputField
                label="Name"
                name="nama"
                type="text"
                placeholder="e.g. Manuel Backher"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />

              {/* No HP */}
              <InputField
                label="Nomor HP"
                name="noHp"
                type="tel"
                placeholder="e.g. 628123456789"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
              />

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
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

              {/* Kota / Kabupaten */}
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
                  setDesa("");
                }}
                onSelect={(region) => {
                  setSelectedDistrict(region);

                  setKecamatan(region.name);
                  setDesa("");
                }}
              />

              {/* Desa */}
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
    </main>
  );
}