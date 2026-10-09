import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

export class UploadError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "UploadError";
    this.status = status;
  }
}

/**
 * Validasi + simpan foto ke public/uploads/<folder>.
 * - return null  : tidak ada foto yang dikirim (null / file kosong dari form)
 * - return string: path publik, mis. "/uploads/berita/123-abc.jpg"
 * - throw UploadError jika foto tidak valid
 */
export async function savePhoto(
  entry: FormDataEntryValue | null,
  folder: string,
): Promise<string | null> {
  if (entry === null) return null;

  if (!(entry instanceof File)) {
    throw new UploadError("Photo yang dikirim tidak valid");
  }

  // Form HTML tanpa file mengirim File kosong -> anggap tidak ada foto
  if (entry.size === 0) return null;

  if (entry.size > MAX_FILE_SIZE) {
    throw new UploadError("Ukuran photo maksimal 5 MB");
  }

  if (!ALLOWED_TYPES.includes(entry.type)) {
    throw new UploadError("Photo harus berupa JPG, PNG, atau WEBP");
  }

  const uploadDir = path.join(UPLOAD_ROOT, folder);
  await mkdir(uploadDir, { recursive: true });

  const extension = path.extname(entry.name).toLowerCase();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}${extension}`;

  try {
    const buffer = Buffer.from(await entry.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), buffer);
  } catch (error) {
    console.error("UPLOAD PHOTO ERROR:", error);
    throw new UploadError("Photo gagal disimpan", 500);
  }

  return `/uploads/${folder}/${fileName}`;
}

/**
 * Hapus file foto dari disk. Tidak pernah throw,
 * karena kegagalan hapus file tidak boleh menggagalkan response.
 */
export async function deletePhoto(publicPath: string | null | undefined) {
  if (!publicPath) return;

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      publicPath.replace(/^\//, ""),
    );

    // Pastikan file memang berada di dalam public/uploads
    if (!filePath.startsWith(UPLOAD_ROOT + path.sep)) {
      console.error("PATH FOTO DI LUAR UPLOAD DIR, DIABAIKAN:", publicPath);
      return;
    }

    await unlink(filePath);
  } catch (error) {
    console.error("GAGAL MENGHAPUS PHOTO:", error);
  }
}