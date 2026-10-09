import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    provinceCode: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { provinceCode } = await params;

    const response = await fetch(
      `https://wilayah.id/api/regencies/${provinceCode}.json`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Gagal mengambil data kabupaten/kota",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Regency API error:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data kabupaten/kota",
      },
      {
        status: 500,
      }
    );
  }
}