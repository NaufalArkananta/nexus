import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";
import { deletePhoto, savePhoto, UploadError } from "@/lib/upload";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

const fail = (message: string, status: number) =>
  NextResponse.json({ message }, { status });

const parseId = (id: string) => {
  const value = Number(id);
  return Number.isInteger(value) && value > 0 ? value : null;
};

// =====================================
// GET BY ID
// =====================================

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const beritaId = parseId((await params).id);

    if (!beritaId) {
      return fail("ID berita tidak valid", 400);
    }

    const berita = await prisma.berita.findUnique({
      where: { id: beritaId },
    });

    if (!berita) {
      return fail("Berita tidak ditemukan", 404);
    }

    return NextResponse.json(
      {
        message: "Data berita berhasil diambil",
        data: berita,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET BERITA BY ID ERROR:", error);
    return fail("Terjadi kesalahan pada server", 500);
  }
}

// =====================================
// UPDATE
// =====================================

export async function PUT(request: NextRequest, { params }: Params) {
  let newPhotoPath: string | null = null;

  try {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return fail("Anda harus login terlebih dahulu", 401);
    }

    const beritaId = parseId((await params).id);

    if (!beritaId) {
      return fail("ID berita tidak valid", 400);
    }

    const existingBerita = await prisma.berita.findUnique({
      where: { id: beritaId },
    });

    if (!existingBerita) {
      return fail("Berita tidak ditemukan", 404);
    }

    const formData = await request.formData();
    const text = (key: string) => formData.get(key)?.toString().trim();

    const updateData: {
      title?: string;
      category?: string;
      author?: string;
      content?: string;
      photoCaption?: string | null;
      editorNote?: string | null;
      publishedAt?: Date;
      photo?: string | null;
    } = {};

    // Field wajib: kalau dikirim, tidak boleh kosong
    for (const key of ["title", "category", "author", "content"] as const) {
      const value = text(key);

      if (value === undefined) continue;

      if (!value) {
        return fail(`${key} tidak boleh kosong`, 400);
      }

      updateData[key] = value;
    }

    // Field opsional: string kosong berarti dihapus (null)
    const optionalFields = {
      photoCaption: text("photo_caption"),
      editorNote: text("editor_note"),
    };

    for (const [key, value] of Object.entries(optionalFields)) {
      if (value !== undefined) {
        updateData[key as keyof typeof optionalFields] = value || null;
      }
    }

    const publishedAtRaw = text("published_at");

    if (publishedAtRaw !== undefined) {
      const date = new Date(publishedAtRaw);

      if (Number.isNaN(date.getTime())) {
        return fail("Format published_at tidak valid", 400);
      }

      updateData.publishedAt = date;
    }

    // Upload foto baru (kalau ada)
    newPhotoPath = await savePhoto(formData.get("photo"), "berita");

    if (newPhotoPath) {
      updateData.photo = newPhotoPath;
    }

    const berita = await prisma.berita.update({
      where: { id: beritaId },
      data: updateData,
    });

    // DB sudah berhasil -> aman menghapus foto lama
    if (newPhotoPath) {
      await deletePhoto(existingBerita.photo);
    }

    return NextResponse.json(
      {
        message: "Berita berhasil diperbarui",
        data: berita,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof UploadError) {
      return fail(error.message, error.status);
    }

    console.error("UPDATE BERITA ERROR:", error);

    // Jika DB gagal setelah foto baru tersimpan, hapus foto baru
    await deletePhoto(newPhotoPath);

    return fail("Terjadi kesalahan pada server", 500);
  }
}

// =====================================
// DELETE
// =====================================

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return fail("Anda harus login terlebih dahulu", 401);
    }

    const beritaId = parseId((await params).id);

    if (!beritaId) {
      return fail("ID berita tidak valid", 400);
    }

    const existingBerita = await prisma.berita.findUnique({
      where: { id: beritaId },
    });

    if (!existingBerita) {
      return fail("Berita tidak ditemukan", 404);
    }

    await prisma.berita.delete({
      where: { id: beritaId },
    });

    // DB sudah berhasil -> hapus foto dari disk
    await deletePhoto(existingBerita.photo);

    return NextResponse.json(
      { message: "Berita berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE BERITA ERROR:", error);
    return fail("Terjadi kesalahan pada server", 500);
  }
}