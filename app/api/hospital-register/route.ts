import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

import { validateUploadedFile } from "@/middleware/validateFile";

import fs from "fs/promises";
import path from "path";
import { rumahSakitRegisterSchema } from "@/validations/hospital.validation";

export async function POST(request: NextRequest) {
  try {
    /* =====================================================
       1. AMBIL FORMDATA
    ===================================================== */

    const formData = await request.formData();

    /* =====================================================
       2. AMBIL DATA
    ===================================================== */

    const namaRumahSakit = formData.get("namaRumahSakit")?.toString() || "";

    const jenisRumahSakit = formData.get("jenisRumahSakit")?.toString() || "";

    const kelasTipe = formData.get("kelasTipe")?.toString() || "";

    const statusKepemilikan =
      formData.get("statusKepemilikan")?.toString() || "";

    const nomorIzinOperasional =
      formData.get("nomorIzinOperasional")?.toString() || "";

    const alamatLengkap = formData.get("alamatLengkap")?.toString() || "";

    const provinsi = formData.get("provinsi")?.toString() || "";

    const kabupatenKota = formData.get("kabupatenKota")?.toString() || "";

    const kecamatan = formData.get("kecamatan")?.toString() || "";

    const desaKelurahan = formData.get("desaKelurahan")?.toString() || "";

    const nomorTelepon = formData.get("nomorTelepon")?.toString() || "";

    const emailResmi = formData.get("emailResmi")?.toString() || "";

    const namaPIC = formData.get("namaPIC")?.toString() || "";

    const emailPIC = formData.get("emailPIC")?.toString() || "";

    const password = formData.get("password")?.toString() || "";

    const persetujuan = formData.get("persetujuan") === "true";

    const file = formData.get("dokumenIzinOperasional");

    /* =====================================================
       3. VALIDASI DATA
    ===================================================== */

    const { error, value } = rumahSakitRegisterSchema.validate(
      {
        namaRumahSakit,
        jenisRumahSakit,
        kelasTipe,
        statusKepemilikan,
        nomorIzinOperasional,
        alamatLengkap,

        provinsi,
        kabupatenKota,
        kecamatan,
        desaKelurahan,

        nomorTelepon,
        emailResmi,
        namaPIC,
        emailPIC,
        password,
        persetujuan,
      },
      {
        abortEarly: false,
      },
    );

    if (error) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: error.details.map((detail) => detail.message),
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       4. VALIDASI FILE
    ===================================================== */

    const fileValidation = validateUploadedFile(file);

    if (!fileValidation.valid) {
      return NextResponse.json(
        {
          message: fileValidation.message,
        },
        {
          status: 400,
        },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          message: "File tidak valid",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       5. CEK DUPLIKASI
    ===================================================== */

    const existingHospital = await prisma.hospital.findFirst({
      where: {
        OR: [
          {
            emailResmi: value.emailResmi,
          },
          {
            nomorIzinOperasional: value.nomorIzinOperasional,
          },
        ],
      },
    });

    if (existingHospital) {
      if (existingHospital.emailResmi === value.emailResmi) {
        return NextResponse.json(
          {
            message: "Email resmi institusi sudah terdaftar",
          },
          {
            status: 409,
          },
        );
      }

      if (
        existingHospital.nomorIzinOperasional === value.nomorIzinOperasional
      ) {
        return NextResponse.json(
          {
            message: "Nomor izin operasional sudah terdaftar",
          },
          {
            status: 409,
          },
        );
      }
    }

    /* =====================================================
       6. HASH PASSWORD
    ===================================================== */

    const hashedPassword = await bcrypt.hash(value.password, 10);

    /* =====================================================
       7. SIMPAN FILE
    ===================================================== */

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "izin-operasional",
    );

    await fs.mkdir(uploadDirectory, {
      recursive: true,
    });

    const extension = ".pdf";

    const fileName = `${crypto.randomUUID()}${extension}`;

    const filePath = path.join(uploadDirectory, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/izin-operasional/${fileName}`;

    /* =====================================================
       8. SIMPAN KE DATABASE
    ===================================================== */

    const rumahSakit = await prisma.hospital.create({
      data: {
        namaRumahSakit: value.namaRumahSakit,

        jenisRumahSakit: value.jenisRumahSakit,

        kelasTipe: value.kelasTipe,

        statusKepemilikan: value.statusKepemilikan,

        nomorIzinOperasional: value.nomorIzinOperasional,

        alamatLengkap: value.alamatLengkap,

        provinsi: value.provinsi,

        kabupatenKota: value.kabupatenKota,

        kecamatan: value.kecamatan,

        desaKelurahan: value.desaKelurahan,

        nomorTelepon: value.nomorTelepon,

        emailResmi: value.emailResmi,

        namaPIC: value.namaPIC,

        emailPIC: value.emailPIC,

        password: hashedPassword,

        dokumenIzinOperasional: fileUrl,

        persetujuan: value.persetujuan,
      },
    });

    /* =====================================================
       9. RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        message:
          "Pendaftaran rumah sakit berhasil dikirim dan menunggu verifikasi",
        data: {
          id: rumahSakit.id,
          namaRumahSakit: rumahSakit.namaRumahSakit,
          emailResmi: rumahSakit.emailResmi,
          statusVerifikasi: rumahSakit.statusVerifikasi,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("REGISTER RUMAH SAKIT ERROR:", error);

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
