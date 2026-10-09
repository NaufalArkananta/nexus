import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type NewsCardProps = {
  image: string;
  title: string;
  description: string;
};

export default function NewsCard({
  image,
  title,
  description,
}: NewsCardProps) {
  return (
    <Link
      href="#"
      className="group flex min-h-[106px] items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md"
    >
      {/* Image */}
      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-[#111827]">
          {title}
        </h3>

        <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-gray-500">
          {description}
        </p>
      </div>

      {/* Arrow */}
      <ArrowRight
        size={16}
        className="shrink-0 text-gray-800 transition group-hover:translate-x-1"
      />
    </Link>
  );
}