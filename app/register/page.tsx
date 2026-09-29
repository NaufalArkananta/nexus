import RegisterForm from "./RegisterForm";
import RegisterHero from "./RegisterHero";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Hero hanya tampil di desktop */}
        <RegisterHero />

        {/* Form Register */}
        <RegisterForm />
      </div>
    </main>
  );
}