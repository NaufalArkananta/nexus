import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 1,
  connectTimeout: 10000,
  ssl: {
    ca: readFileSync(
      join(process.cwd(), "certs", "ca.pem"),
      "utf8"
    ),
  },
});

export const prisma = new PrismaClient({ adapter });