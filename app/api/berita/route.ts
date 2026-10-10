import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";
import { deletePhoto, savePhoto, UploadError } from "@/lib/upload";

const fail = (message: string, status: number) =>
  NextResponse.json({ message }, { status });

// =====================================
// GET LIST
// Query: page, limit, category, search, exclude, status
//
// - Publik (tanpa ?status=): hanya berita TERBIT
// - Admin (login + ?status=all|DRAF|TERBIT): sesuai filter,
//   plus `stats` (total / terbit / draf) untuk kartu ringkasan
// =====================================

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.min(50, Math.max(1, Number(params.get("limit")) || 10));

    const category = params.get("category")?.trim();
    const search = params.get("search")?.trim();
    const exclude = Number(params.get("exclude"));
    const statusParam = params.get("status");

    const loggedIn = !!getAuthenticatedUser(request);
    const adminView = loggedIn && !!statusParam;

    const where: {
      category?: string;
      id?: { not: number };
      status?: "DRAF" | "TERBIT";
      OR?: (
        | { title: { contains: string } }
        | { author: { contains: string } }
      )[];
    } = {};

    if (adminView) {
      if (statusParam === "DRAF" || statusParam === "TERBIT") {
        where.status = statusParam;
      }
    } else {
      where.status = "TERBIT";
    }

    if (category) where.category = category;
    if (exclude) where.id = { not: exclude };
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { author: { contains: search } },
      ];
    }

    const [data, total, grouped] = await Promise.all([
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
          status: true,
          readMinutes: true,
          publishedAt: true,
          createdAt: true,
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.berita.count({ where }),
      adminView
        ? prisma.berita.groupBy({ by: ["status"], _count: { _all: true } })
        : Promise.resolve(null),
    ]);

    let stats: { total: number; terbit: number; draf: number } | undefined;

    if (grouped) {
      const count = (status: "DRAF" | "TERBIT") =>
        grouped.find((item) => item.status === status)?._count._all ?? 0;

      const terbit = count("TERBIT");
      const draf = count("DRAF");

      stats = { total: terbit + draf, terbit, draf };
    }

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
        ...(stats && { stats }),
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
// FormData: title, category, author, content, status (wajib)
//           published_at, read_minutes, photo_caption, editor_note, photo (opsional)
// =====================================

export async function POST(request: NextRequest) {
  let photoPath: string | null = null;

  try {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return fail("Anda harus login terlebih dahulu", 401);
    }

    const formData = await request.formData();
    const text = (key: string) => formData.get(key)?.toString().trim();

    const title = text("title");
    const category = text("category");
    const author = text("author");
    const content = text("content");
    const statusRaw = text("status");
    const publishedAtRaw = text("published_at");
    const readMinutesRaw = text("read_minutes");
    const photoCaption = text("photo_caption");
    const editorNote = text("editor_note");

    if (!title || !category || !author || !content) {
      return fail("title, category, author, dan content wajib diisi", 400);
    }

    if (statusRaw !== "DRAF" && statusRaw !== "TERBIT") {
      return fail("status harus DRAF atau TERBIT", 400);
    }

    let publishedAt: Date | undefined;

    if (publishedAtRaw) {
      publishedAt = new Date(publishedAtRaw);

      if (Number.isNaN(publishedAt.getTime())) {
        return fail("Format published_at tidak valid", 400);
      }
    }

    let readMinutes: number | null = null;

    if (readMinutesRaw) {
      const value = Number(readMinutesRaw);

      if (!Number.isInteger(value) || value < 1) {
        return fail("read_minutes harus berupa angka bulat positif", 400);
      }

      readMinutes = value;
    }

    photoPath = await savePhoto(formData.get("photo"), "berita");

    const berita = await prisma.berita.create({
      data: {
        title,
        category,
        author,
        content,
        status: statusRaw,
        readMinutes,
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