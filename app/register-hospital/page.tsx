import HospitalRegisterForm from "./HospitalRegisterForm";
import HospitalRegisterHero from "./HospitalRegisterHero";

export default function RegisterRumahSakitPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      <HospitalRegisterHero />

      <HospitalRegisterForm />
    </main>
  );
}