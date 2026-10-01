import Link from "next/link";
import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#075ca8] px-6 pb-5 pt-12 text-white lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#16b8a6]">
                <HeartPulse size={15} />
              </div>

              <span>VenaSync</span>
            </div>

            <p className="mt-4 max-w-xs text-xs leading-5 text-blue-100">
              Ministry of Health coordinated logistical infrastructure
              for emergency blood supply and universal interoperable
              health reports.
            </p>
          </div>

          {/* Rumah Sakit */}
          <FooterColumn
            title="UNTUK RUMAH SAKIT"
            links={[
              "Daftarkan Fasilitas",
              "Otorisasi Kementerian Kesehatan",
              "API Permintaan Darurat",
              "Peta Operasional",
            ]}
          />

          {/* Masyarakat */}
          <FooterColumn
            title="UNTUK MASYARAKAT"
            links={[
              "Pendaftaran Donor Darah",
              "Lokasi Bank Darah",
              "Pedoman Donor Darah",
              "Bantuan Paspor Kesehatan",
            ]}
          />

          {/* Hotline */}
          <div>
            <h3 className="text-xs font-bold">
              HOTLINES
            </h3>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-[#14d2bd]">
                ☎
              </span>

              <span className="text-sm font-bold">
                119 (Ext. 4)
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-blue-100">
              Available 24/7 for critical blood stock
              redistribution emergencies.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-blue-400/30" />

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-4 text-[10px] text-blue-100 md:flex-row">
          <p>
            © 2026 Ministry of Health / VenaSync Emergency
            Network. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/security">
              Security & Privacy Protocol
            </Link>

            <Link href="/terms">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold">
        {title}
      </h3>

      <div className="mt-3 space-y-3">
        {links.map((link) => (
          <Link
            key={link}
            href="#"
            className="block text-xs text-blue-100 transition hover:text-white"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}   