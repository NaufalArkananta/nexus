const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES = ["application/pdf"];

const ALLOWED_EXTENSIONS = [".pdf"];

export function validateUploadedFile(file: FormDataEntryValue | null) {
  if (!file) {
    return {
      valid: false,
      message: "Dokumen izin operasional wajib diupload",
    };
  }

  if (!(file instanceof File)) {
    return {
      valid: false,
      message: "File yang dikirim tidak valid",
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      message: "File tidak boleh kosong",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      message: "Ukuran file maksimal 5 MB",
    };
  }

  const extension = file.name
    .substring(file.name.lastIndexOf("."))
    .toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      message: "File harus berformat PDF",
    };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      message: "Tipe file harus PDF",
    };
  }

  return {
    valid: true,
    message: "File valid",
  };
}
