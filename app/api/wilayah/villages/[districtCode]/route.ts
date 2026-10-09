import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    districtCode: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { districtCode } = await params;

    const response = await fetch(
      `https://wilayah.id/api/villages/${districtCode}.json`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Gagal mengambil data desa",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Village API error:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data desa",
      },
      {
        status: 500,
      }
    );
  }
}