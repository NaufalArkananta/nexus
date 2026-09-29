import { ArrowRight, Menu } from "lucide-react";
import React from "react";

type ServiceCardProps = {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  description: string;
  linkClass: string;
};

export default function ServiceCard({
  icon,
  iconClass,
  title,
  description,
  linkClass,
}: ServiceCardProps) {
  return (
    <div className="min-h-[174px] rounded-lg border border-gray-200 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </div>

        <Menu
          size={17}
          className="text-gray-500"
        />
      </div>

      <h3 className="mt-4 text-base font-bold text-[#111827]">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500">
        {description}
      </p>

      <button
        className={`mt-8 flex items-center gap-1 text-[10px] font-bold ${linkClass}`}
      >
        View Technical Specs

        <ArrowRight size={11} />
      </button>
    </div>
  );
}