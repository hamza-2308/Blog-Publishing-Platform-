import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const media = await prisma.media.findMany();
  const broken = media.filter(
    (m) => m.url.startsWith("/uploads/") || m.url.startsWith("uploads/")
  );

  console.log(`Total media records: ${media.length}`);
  console.log(`Broken media records (local /uploads/ paths): ${broken.length}`);

  if (broken.length > 0) {
    await prisma.media.deleteMany({
      where: { id: { in: broken.map((b) => b.id) } }
    });
    console.log("Deleted broken media records.");
  } else {
    console.log("No broken media records found.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });