type RegisterFeatureProps = {
  text: string;
};

export default function RegisterFeature({
  text,
}: RegisterFeatureProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-white/80">
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 12L10 17L19 7"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span className="text-xs text-white/95">
        {text}
      </span>
    </div>
  );
}