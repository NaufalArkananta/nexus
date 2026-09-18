import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET belum diset di .env");
}

export function generateToken(userId: number) {
  return jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    userId: number;
  };
}