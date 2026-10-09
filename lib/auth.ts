import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET belum diset di .env");
}

export function getAuthenticatedUser(
  request: NextRequest
) {
  const token =
    request.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(
      token,
      JWT_SECRET
    ) as {
      userId: number;
    };

    return {
      userId: payload.userId,
    };
  } catch {
    return null;
  }
}