"use client";

import { useEffect, useRef, useState } from "react";

type Region = {
  code: string;
  name: string;
};

type RegionInputProps = {
  label: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  regions: Region[];
  loading?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (region: Region) => void;
};

export default function RegionInput({
  label,
  placeholder,
  value,
  disabled = false,
  regions,
  loading = false,
  onChange,
  onSelect,
}: RegionInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredRegions = regions
    .filter((region) => region.name.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 10);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-1.5 block text-[11px] font-semibold text-gray-800">
        {label}
      </label>

      <input
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={() => {
          if (!disabled) {
            setShowDropdown(true);
          }
        }}
        onChange={onChange}
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#1759BD] focus:ring-1 focus:ring-[#1759BD] disabled:cursor-not-allowed disabled:bg-gray-100"
      />

      {showDropdown && !disabled && value.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {loading ? (
            <div className="px-3 py-3 text-xs text-gray-400">
              Memuat data...
            </div>
          ) : filteredRegions.length > 0 ? (
            filteredRegions.map((region) => (
              <button
                key={region.code}
                type="button"
                onClick={() => {
                  onSelect(region);
                  setShowDropdown(false);
                }}
                className="block w-full px-3 py-2.5 text-left text-xs text-gray-700 hover:bg-blue-50 hover:text-[#1759BD]"
              >
                {region.name}
              </button>
            ))
          ) : (
            <div className="px-3 py-3 text-xs text-gray-400">
              Wilayah tidak ditemukan
            </div>
          )}
        </div>
      )}
    </div>
  );
}
