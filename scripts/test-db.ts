
import { prisma } from "../lib/prisma";

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 AS test`;
    console.log("Prisma query berhasil:", result);
  } catch (error) {
    console.error("PRISMA QUERY ERROR:");
    console.dir(error, { depth: 10 });
  } finally {
    await prisma.$disconnect();
  }
}

main();