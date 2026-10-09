import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";
import { deletePhoto, savePhoto, UploadError } from "@/lib/upload";

const fail = (message: string, status: number) =>
  NextResponse.json({ message }, { status });

// =====================================
// GET LIST
// Query: page, limit, category, search, exclude
// Contoh berita terkait:
//   /api/berita?category=Teknologi Medis&exclude=5&limit=3
// =====================================

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.min(50, Math.max(1, Number(params.get("limit")) || 10));

    const category = params.get("category")?.trim();
    const search = params.get("search")?.trim();
    const exclude = Number(params.get("exclude"));

    const where: {
      category?: string;
      id?: { not: number };
      OR?: (
        | { title: { contains: string } }
        | { author: { contains: string } }
      )[];
    } = {};

    if (category) where.category = category;
    if (exclude) where.id = { not: exclude };
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { author: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.berita.findMany({
        where,
        // content tidak ikut agar list tetap ringan
        select: {
          id: true,
          title: true,
          category: true,
          author: true,
          photo: true,
          photoCaption: true,
          publishedAt: true,
          createdAt: true,
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.berita.count({ where }),
    ]);

    return NextResponse.json(
      {
        message: "Data berita berhasil diambil",
        data,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET BERITA LIST ERROR:", error);
    return fail("Terjadi kesalahan pada server", 500);
  }
}

// =====================================
// CREATE
// FormData: title, category, author, content (wajib)
//           published_at, photo_caption, editor_note, photo (opsional)
// =====================================

export async function POST(request: NextRequest) {
  let photoPath: string | null = null;

  try {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        {
          message: "Anda harus login terlebih dahulu",
        },
        {
          status: 401,
        },
      );
    }

    const formData = await request.formData();
    const text = (key: string) => formData.get(key)?.toString().trim();

    const title = text("title");
    const category = text("category");
    const author = text("author");
    const content = text("content");
    const publishedAtRaw = text("published_at");
    const photoCaption = text("photo_caption");
    const editorNote = text("editor_note");

    if (!title || !category || !author || !content) {
      return fail("title, category, author, dan content wajib diisi", 400);
    }

    let publishedAt: Date | undefined;

    if (publishedAtRaw) {
      publishedAt = new Date(publishedAtRaw);

      if (Number.isNaN(publishedAt.getTime())) {
        return fail("Format published_at tidak valid", 400);
      }
    }

    photoPath = await savePhoto(formData.get("photo"), "berita");

    const berita = await prisma.berita.create({
      data: {
        title,
        category,
        author,
        content,
        publishedAt,
        photoCaption: photoCaption || null,
        editorNote: editorNote || null,
        photo: photoPath,
        createdBy: user.userId,
      },
    });

    return NextResponse.json(
      {
        message: "Berita berhasil dibuat",
        data: berita,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof UploadError) {
      return fail(error.message, error.status);
    }

    console.error("CREATE BERITA ERROR:", error);

    // Jika DB gagal setelah foto tersimpan, hapus foto tersebut
    await deletePhoto(photoPath);

    return fail("Terjadi kesalahan pada server", 500);
  }
}
