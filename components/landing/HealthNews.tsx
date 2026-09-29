import NewsCard from "./NewsCard";

export default function HealthNews() {
  return (
    <section className="bg-white px-6 pb-16 pt-2 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-black">
          BERITA KESEHATAN
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <NewsCard
            image="/thumbnail-image.png"
            title="Paspor Kesehatan Warga"
            description="Pemantauan biomarker yang dipersonalisasi (tekanan darah, kadar gula) yang disinkronkan setelah donasi."
          />

          <NewsCard
            image="/thumbnail-image1.png"
            title="Portal Fasilitas Kesehatan Terverifikasi"
            description='Onboarding B2B dengan pendekatan "zero-trust" yang mensyaratkan ID resmi Kemenkes.'
          />

          <NewsCard
            image="/thumbnail-image2.png"
            title="Analitik Global"
            description="Wawasan tingkat makro mengenai metrik permintaan dan pasokan darah di tingkat regional."
          />

          <NewsCard
            image="/thumbnail-image3.png"
            title="Pelacak Kelayakan"
            description="Logika masa jeda otomatis 60 hari untuk melindungi kesehatan pendonor."
          />
        </div>
      </div>
    </section>
  );
}