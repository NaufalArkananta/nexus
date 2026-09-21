import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://wilayah.id/api/provinces.json",
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Gagal mengambil data provinsi",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Province API error:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data provinsi",
      },
      {
        status: 500,
      }
    );
  }
}