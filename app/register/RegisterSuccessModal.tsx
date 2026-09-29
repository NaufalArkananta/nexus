type RegisterSuccessModalProps = {
  show: boolean;
  onClose: () => void;
};

export default function RegisterSuccessModal({
  show,
  onClose,
}: RegisterSuccessModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <div className="w-full max-w-[340px] rounded-xl bg-white p-6 shadow-2xl">
        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 3L20 6V11C20 16.1 16.6 20.7 12 22C7.4 20.7 4 16.1 4 11V6L12 3Z"
              stroke="#16A34A"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            <path
              d="M8.5 12L11 14.5L15.5 9.5"
              stroke="#16A34A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900">
          Verifikasi Berhasil
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-5 text-gray-500">
          Pendaftaran Anda sedang menunggu verifikasi manual.
          Perkiraan waktu pemrosesan: 24 jam.
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-md border border-[#1759BD] py-2 text-xs font-medium text-[#1759BD] transition hover:bg-[#1759BD] hover:text-white"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}