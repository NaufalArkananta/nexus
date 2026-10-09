import Footer from "@/components/Footer";
import HealthNews from "@/components/landing/HealthNews";
import HealthServices from "@/components/landing/HealthServices";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/Navbar";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <Navbar />

      <Hero />

      <HealthServices />

      <HealthNews />

      <Footer />
    </main>
  );
}