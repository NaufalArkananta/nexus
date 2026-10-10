type Props = {
  label: string;
  value: number | null;
};

export default function StatCard({ label, value }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-4xl font-bold text-[#0f2a4d]">
        {value === null ? "–" : value}
      </p>
    </div>
  );
}
