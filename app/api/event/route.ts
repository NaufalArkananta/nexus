import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { writeFile, mkdir,unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  let uploadedPhotoPath: string | null = null;

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

    // =========================
    // CEK HOSPITAL
    // =========================

    const rumahSakit = await prisma.hospital.findUnique({
      where: {
        userId: user.userId,
      },
    });

    if (!rumahSakit) {
      return NextResponse.json(
        {
          message: "User belum memiliki data rumah sakit",
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
    // VALIDASI FIELD
    // =========================

    if (
      !type ||
      !name ||
      !startDate ||
      !endDate ||
      !fee ||
      !kuota ||
      !desc ||
      !objective
    ) {
      return NextResponse.json(
        {
          message: "Semua field wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // VALIDASI TANGGAL
    // =========================

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (Number.isNaN(parsedStartDate.getTime())) {
      return NextResponse.json(
        {
          message: "Format start_date tidak valid",
        },
        {
          status: 400,
        },
      );
    }

    if (Number.isNaN(parsedEndDate.getTime())) {
      return NextResponse.json(
        {
          message: "Format end_date tidak valid",
        },
        {
          status: 400,
        },
      );
    }

    if (parsedEndDate < parsedStartDate) {
      return NextResponse.json(
        {
          message: "end_date tidak boleh sebelum start_date",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // VALIDASI FEE
    // =========================

    const feeNumber = Number(fee);

    if (Number.isNaN(feeNumber) || feeNumber < 0) {
      return NextResponse.json(
        {
          message: "Fee harus berupa angka yang valid",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // VALIDASI KUOTA
    // =========================

    const kuotaNumber = Number(kuota);

    if (
      Number.isNaN(kuotaNumber) ||
      kuotaNumber <= 0 ||
      !Number.isInteger(kuotaNumber)
    ) {
      return NextResponse.json(
        {
          message: "Kuota harus berupa bilangan bulat lebih dari 0",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // VALIDASI PHOTO
    // =========================

    let photoPath: string | null = null;

    if (photo) {
      if (!(photo instanceof File)) {
        return NextResponse.json(
          {
            message: "File photo tidak valid",
          },
          {
            status: 400,
          },
        );
      }

      // File kosong
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

      // Hanya gambar
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
      // BUAT FOLDER UPLOAD
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
      // GENERATE NAMA FILE
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

        // Simpan path untuk database
        photoPath = `/uploads/event/${fileName}`;

        // Simpan path fisik untuk cleanup
        uploadedPhotoPath = filePath;
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
    }

    // =========================
    // CREATE EVENT
    // =========================

    const event = await prisma.event.create({
      data: {
        type,
        name,

        startDate: parsedStartDate,
        endDate: parsedEndDate,

        // ID rumah sakit diambil
        // dari user yang sedang login
        idRs: rumahSakit.id,

        fee: feeNumber,
        kuota: kuotaNumber,

        desc,
        objective,

        photo: photoPath,

        createdBy: user.userId,
      },
    });

    // =========================
    // SUCCESS
    // =========================

    return NextResponse.json(
      {
        message: "Event berhasil dibuat",
        data: event,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "CREATE EVENT ERROR:",
      error,
    );

    // =========================
    // CLEANUP PHOTO
    // =========================
    // Jika photo sudah tersimpan tetapi
    // create event gagal, hapus photo tersebut.

    if (uploadedPhotoPath) {
      try {
        await unlink(uploadedPhotoPath);

        console.log(
          "Photo berhasil dihapus karena create event gagal:",
          uploadedPhotoPath,
        );
      } catch (cleanupError) {
        console.error(
          "GAGAL MENGHAPUS PHOTO:",
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
export async function GET(request: NextRequest) {
  try {
    const programs = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
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

    return NextResponse.json(
      {
        message: "Data program berhasil diambil",
        data: programs,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET PROGRAM ERROR:", error);

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
