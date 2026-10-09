type RegisterInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

export default function RegisterInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: RegisterInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[11px] font-semibold text-gray-800"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#1759BD] focus:ring-1 focus:ring-[#1759BD]"
      />
    </div>
  );
}