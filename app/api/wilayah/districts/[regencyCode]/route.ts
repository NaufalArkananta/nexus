import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    regencyCode: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { regencyCode } = await params;

    const response = await fetch(
      `https://wilayah.id/api/districts/${regencyCode}.json`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Gagal mengambil data kecamatan",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("District API error:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data kecamatan",
      },
      {
        status: 500,
      }
    );
  }
}