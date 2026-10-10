import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-600 text-xl tracking-wider">MEDLINK</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="text-blue-600 font-semibold flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            Home
          </a>
          <a href="#" className="hover:text-blue-600 transition">Tentang Kami</a>
          <a href="#" className="hover:text-blue-600 transition">Riwayat Kesehatan</a>
        </nav>
        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-200 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 px-8 py-16 lg:py-24 overflow-hidden border-b border-blue-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
          <div className="max-w-xl mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Selamat Pagi, Rafi 👋
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Temukan layanan kesehatan dan event medis terbaik hari ini.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-7 py-3.5 rounded-full shadow-lg shadow-blue-500/25 transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Jelajahi Layanan
            </button>
          </div>
          {/* Ilustrasi Dekoratif / Grafis Latar Belakang */}
          <div className="w-full lg:w-1/2 h-64 lg:h-80 opacity-40 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/placeholder-medical-bg.png')" }} />
        </div>
      </section>

      {/* 3. Event Mendatang */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12 text-slate-900">Event Mendatang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-48 bg-slate-200 relative">
                  {/* Ganti dengan <Image> dari Next.js jika ada aset gambar */}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Jakarta • 24 Mei
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2 leading-snug">Seminar Kardiologi Nasional 2025</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nemo incidunt minus aliquid quas quis laborum in expedita sit.
                  </p>
                  <a href="#" className="text-xs font-semibold text-blue-600 hover:underline inline-block mb-4">Lebih banyak</a>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium text-sm shadow-md shadow-blue-600/10 transition">
                  Daftar Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-medium px-8 py-3 rounded-full transition text-sm">
            Lihat Semua Event
          </button>
        </div>
      </section>

      {/* 4. Fasilitas Kesehatan CTA Banner */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden shadow-xl">
          <span className="text-xs lg:text-sm font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mb-4">
            Fasilitas Kesehatan
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold mb-8 max-w-2xl mx-auto leading-tight">
            Apakah Anda ingin bergabung sebagai Fasilitas Kesehatan?
          </h2>
          <button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-3.5 rounded-full shadow-lg transition text-sm">
            Daftar Sekarang
          </button>
        </div>
      </section>

      {/* 5. Berita Terkini */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold mb-10 text-slate-900">Berita Terkini</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-48 bg-slate-200 relative" />
              <div className="p-6">
                <div className="text-xs text-slate-400 mb-2">Hari Ini • MedLink News</div>
                <h3 className="font-bold text-lg text-slate-900 mb-3 leading-snug">Kemkes Luncurkan Standar Baru Integrasi SatuSehat</h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  Informasi terkini mengenai pembaruan sistem integrasi data kesehatan nasional...
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-blue-950 text-white pt-16 pb-8 mt-16 border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-extrabold text-white text-xl tracking-wider mb-4">MEDLINK</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ministry of Health coordinated logistical infrastructure for emergency blood supply and universal telepath healthcare.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider uppercase text-blue-200">Untuk Rumah Sakit</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Daftar Faskes Fasilitas</a></li>
              <li><a href="#" className="hover:text-white transition">Otorisasi Keamanan Kesehatan</a></li>
              <li><a href="#" className="hover:text-white transition">API Permintaan Darurat</a></li>
              <li><a href="#" className="hover:text-white transition">Peta Operasional</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider uppercase text-blue-200">Untuk Masyarakat</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Pendaftaran Donor Darah</a></li>
              <li><a href="#" className="hover:text-white transition">Lokasi Bank</a></li>
              <li><a href="#" className="hover:text-white transition">Pedoman Donor Darah</a></li>
              <li><a href="#" className="hover:text-white transition">Bantuan Paspor Kesehatan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider uppercase text-blue-200">Hotline</h4>
            <div className="bg-blue-900/50 p-4 rounded-xl border border-blue-800">
              <span className="text-xs text-blue-300 font-medium block mb-1">📞 119 (Ext. 4)</span>
              <p className="text-xs text-slate-400">Available 24/7 for critical blood stock redistribution emergencies.</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-blue-900/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 Ministry of Health / MetaDyns. Emergency Network. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Security & Privacy Protocol</a>
            <a href="#" className="hover:text-white transition">Terms of Use</a>
          </div>
        </div>
      </footer>
    </main>
  );
}