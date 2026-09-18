import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/jwt";
import { loginSchema } from "@/validations/auth.validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { error, value } = loginSchema.validate(body, {
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

    const { email, password } = value;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Email atau password salah",
        },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "Email atau password salah",
        },
        { status: 401 }
      );
    }

    const token = generateToken(user.id);

    const response = NextResponse.json(
      {
        message: "Login berhasil",
        data: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          token : token
        },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
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