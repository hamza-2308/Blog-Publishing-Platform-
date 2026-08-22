/**
 * One-time migration: fix existing blogs whose featuredImage points to
 * local /uploads/ paths (which 404 on serverless platforms).
 *
 * Run with: npx tsx scripts/fix-image-urls.ts
 *
 * It replaces broken /uploads/ paths with a fallback Unsplash image so
 * existing blogs get a valid image again.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Pick a placeholder that the next.config.js already allows.
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80";

async function main() {
  const blogs = await prisma.blog.findMany({
    where: {
      OR: [
        { featuredImage: { startsWith: "/uploads/" } },
        { featuredImage: { startsWith: "uploads/" } }
      ]
    },
    select: { id: true, slug: true, featuredImage: true }
  });

  console.log(`Found ${blogs.length} blog(s) with broken local image paths.`);

  for (const blog of blogs) {
    await prisma.blog.update({
      where: { id: blog.id },
      data: { featuredImage: FALLBACK_IMAGE }
    });
    console.log(
      `  ✓ Fixed "${blog.slug}" -> ${blog.featuredImage ? blog.featuredImage : "(null)"} => ${FALLBACK_IMAGE}`
    );
  }

  console.log("Migration complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });