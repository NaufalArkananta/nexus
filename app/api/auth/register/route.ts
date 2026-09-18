import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/validations/auth.validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi menggunakan Joi
    const { error, value } = registerSchema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: error.details.map((detail) => detail.message),
        },
        { status: 400 }
      );
    }

    const {
      nama,
      noHp,
      email,
      password,
      provinsi,
      kabupatenKota,
      kecamatan,
      desaKelurahan,
      alamat,
      kodePos,
    } = value;

    // Cek email
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          message: "Email sudah terdaftar",
        },
        { status: 409 }
      );
    }

    // Cek nomor HP
    const existingNoHp = await prisma.user.findUnique({
      where: {
        noHp,
      },
    });

    if (existingNoHp) {
      return NextResponse.json(
        {
          message: "Nomor HP sudah terdaftar",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user
    const user = await prisma.user.create({
      data: {
        nama,
        noHp,
        email,
        password: hashedPassword,
        provinsi,
        kabupatenKota,
        kecamatan,
        desaKelurahan,
        alamat,
        kodePos,
      },
    });

    return NextResponse.json(
      {
        message: "Register berhasil",
        data: {
          id: user.id,
          nama: user.nama,
          noHp: user.noHp,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  }
}