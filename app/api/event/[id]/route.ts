import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";
import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";


type Params = {
  params: Promise<{
    id: string;
  }>;
};

// =====================================
// GET BY ID
// =====================================

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const program = await prisma.event.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        hospital: {
          select: {
            id: true,
            namaRumahSakit: true,
          },
        },
      },
    });

    if (!program) {
      return NextResponse.json(
        {
          message: "Program tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Data program berhasil diambil",

        data: program,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET PROGRAM BY ID ERROR:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
      },
      {
        status: 500,
      },
    );
  }
}

// =====================================
// UPDATE
// =====================================

export async function PUT(
  request: NextRequest,
  { params }: Params,
) {
  let newPhotoPath: string | null = null;

  try {
    // =========================
    // CEK LOGIN
    // =========================

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

    const { id } = await params;

    const eventId = Number(id);

    if (Number.isNaN(eventId)) {
      return NextResponse.json(
        {
          message: "ID event tidak valid",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // CEK EVENT
    // =========================

    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) {
      return NextResponse.json(
        {
          message: "Event tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // =========================
    // AMBIL FORMDATA
    // =========================

    const formData = await request.formData();

    const type = formData.get("type")?.toString();
    const name = formData.get("name")?.toString();
    const startDate = formData.get("start_date")?.toString();
    const endDate = formData.get("end_date")?.toString();
    const fee = formData.get("fee")?.toString();
    const kuota = formData.get("kuota")?.toString();
    const desc = formData.get("desc")?.toString();
    const objective = formData.get("objective")?.toString();

    const photo = formData.get("photo");

    // =========================
    // DATA UPDATE
    // =========================

    const updateData: {
      type?: string;
      name?: string;
      startDate?: Date;
      endDate?: Date;
      fee?: number;
      kuota?: number;
      desc?: string;
      objective?: string;
      photo?: string | null;
    } = {};

    if (type !== undefined) {
      updateData.type = type;
    }

    if (name !== undefined) {
      updateData.name = name;
    }

    if (startDate !== undefined) {
      const date = new Date(startDate);

      if (Number.isNaN(date.getTime())) {
        return NextResponse.json(
          {
            message: "Format start_date tidak valid",
          },
          {
            status: 400,
          },
        );
      }

      updateData.startDate = date;
    }

    if (endDate !== undefined) {
      const date = new Date(endDate);

      if (Number.isNaN(date.getTime())) {
        return NextResponse.json(
          {
            message: "Format end_date tidak valid",
          },
          {
            status: 400,
          },
        );
      }

      updateData.endDate = date;
    }

    if (fee !== undefined) {
      const feeNumber = Number(fee);

      if (Number.isNaN(feeNumber)) {
        return NextResponse.json(
          {
            message: "Fee harus berupa angka",
          },
          {
            status: 400,
          },
        );
      }

      updateData.fee = feeNumber;
    }

    if (kuota !== undefined) {
      const kuotaNumber = Number(kuota);

      if (Number.isNaN(kuotaNumber)) {
        return NextResponse.json(
          {
            message: "Kuota harus berupa angka",
          },
          {
            status: 400,
          },
        );
      }

      updateData.kuota = kuotaNumber;
    }

    if (desc !== undefined) {
      updateData.desc = desc;
    }

    if (objective !== undefined) {
      updateData.objective = objective;
    }

    // =========================
    // UPLOAD PHOTO BARU
    // =========================

    if (photo !== null) {
      // Pastikan yang dikirim benar-benar File
      if (!(photo instanceof File)) {
        return NextResponse.json(
          {
            message: "Photo yang dikirim tidak valid",
          },
          {
            status: 400,
          },
        );
      }

      // Cek file kosong
      if (photo.size === 0) {
        return NextResponse.json(
          {
            message: "Photo tidak boleh kosong",
          },
          {
            status: 400,
          },
        );
      }

      // Maksimal 5 MB
      const MAX_FILE_SIZE = 5 * 1024 * 1024;

      if (photo.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            message: "Ukuran photo maksimal 5 MB",
          },
          {
            status: 400,
          },
        );
      }

      // Tipe file yang diperbolehkan
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(photo.type)) {
        return NextResponse.json(
          {
            message: "Photo harus berupa JPG, PNG, atau WEBP",
          },
          {
            status: 400,
          },
        );
      }

      // =========================
      // BUAT FOLDER
      // =========================

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "event",
      );

      await mkdir(uploadDir, {
        recursive: true,
      });

      // =========================
      // NAMA FILE BARU
      // =========================

      const extension = path
        .extname(photo.name)
        .toLowerCase();

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}${extension}`;

      const filePath = path.join(
        uploadDir,
        fileName,
      );

      // =========================
      // SIMPAN FILE
      // =========================

      try {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await writeFile(filePath, buffer);
      } catch (error) {
        console.error(
          "UPLOAD PHOTO ERROR:",
          error,
        );

        return NextResponse.json(
          {
            message: "Photo gagal disimpan",
          },
          {
            status: 500,
          },
        );
      }

      // Path yang disimpan ke database
      newPhotoPath = `/uploads/event/${fileName}`;

      updateData.photo = newPhotoPath;
    }

    // =========================
    // UPDATE DATABASE
    // =========================

    const event = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: updateData,
    });

    // =========================
    // HAPUS PHOTO LAMA
    // =========================

    if (
      newPhotoPath &&
      existingEvent.photo
    ) {
      try {
        const oldPhotoPath = path.join(
          process.cwd(),
          "public",
          existingEvent.photo.replace(
            /^\//,
            "",
          ),
        );

        await unlink(oldPhotoPath);

        console.log(
          "Photo lama berhasil dihapus:",
          oldPhotoPath,
        );
      } catch (error) {
        // Jangan gagalkan response karena
        // database dan photo baru sudah berhasil
        console.error(
          "GAGAL MENGHAPUS PHOTO LAMA:",
          error,
        );
      }
    }

    return NextResponse.json(
      {
        message: "Event berhasil diperbarui",
        data: event,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "UPDATE EVENT ERROR:",
      error,
    );

    // =========================
    // CLEANUP
    // Jika DB gagal setelah photo baru
    // berhasil disimpan, hapus photo baru
    // =========================

    if (newPhotoPath) {
      try {
        const newPhotoFilePath = path.join(
          process.cwd(),
          "public",
          newPhotoPath.replace(/^\//, ""),
        );

        await unlink(newPhotoFilePath);

        console.log(
          "Photo baru dihapus karena update database gagal",
        );
      } catch (cleanupError) {
        console.error(
          "GAGAL CLEANUP PHOTO BARU:",
          cleanupError,
        );
      }
    }

    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
      },
      {
        status: 500,
      },
    );
  }
}

// =====================================
// DELETE
// =====================================

export async function DELETE(request: NextRequest, { params }: Params) {
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

    const { id } = await params;

    const programId = Number(id);

    if (Number.isNaN(programId)) {
      return NextResponse.json(
        {
          message: "ID program tidak valid",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // CEK PROGRAM
    // =========================

    const existingProgram = await prisma.event.findUnique({
      where: {
        id: programId,
      },
    });

    if (!existingProgram) {
      return NextResponse.json(
        {
          message: "Program tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // =========================
    // DELETE
    // =========================

    await prisma.event.delete({
      where: {
        id: programId,
      },
    });

    // =========================
    // HAPUS PHOTO
    // =========================

    if (existingProgram.photo) {
      try {
        const photoFilePath = path.join(
          process.cwd(),
          "public",
          existingProgram.photo.replace(/^\//, ""),
        );

        await unlink(photoFilePath);

        console.log("Photo berhasil dihapus:", photoFilePath);
      } catch (error) {
        // Jangan gagalkan response karena data di database
        // sudah berhasil dihapus
        console.error("GAGAL MENGHAPUS PHOTO:", error);
      }
    }

    return NextResponse.json(
      {
        message: "Program berhasil dihapus",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("DELETE PROGRAM ERROR:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
      },
      {
        status: 500,
      },
    );
  }
}
