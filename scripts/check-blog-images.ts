import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const blogs = await prisma.blog.findMany({
    select: { id: true, slug: true, title: true, featuredImage: true }
  });

  console.log(`Total blogs: ${blogs.length}`);
  console.log("---");

  for (const blog of blogs) {
    const img = blog.featuredImage;
    const isBroken =
      !img ||
      img.startsWith("/uploads/") ||
      img.startsWith("uploads/") ||
      img.startsWith("/public/") ||
      img.startsWith("public/") ||
      img.startsWith("/images/") ||
      img.startsWith("images/") ||
      img.startsWith("/img/") ||
      img.startsWith("img/") ||
      img.startsWith("/assets/") ||
      img.startsWith("assets/") ||
      img.startsWith("/static/") ||
      img.startsWith("static/") ||
      img.startsWith("/media/") ||
      img.startsWith("media/") ||
      img.startsWith("/files/") ||
      img.startsWith("files/") ||
      img.startsWith("/content/") ||
      img.startsWith("content/") ||
      img.startsWith("/resources/") ||
      img.startsWith("resources/") ||
      img.startsWith("/data/") ||
      img.startsWith("data/") ||
      img.startsWith("/storage/") ||
      img.startsWith("storage/") ||
      img.startsWith("/tmp/") ||
      img.startsWith("tmp/") ||
      img.startsWith("/var/") ||
      img.startsWith("var/") ||
      img.startsWith("/home/") ||
      img.startsWith("home/") ||
      img.startsWith("/user/") ||
      img.startsWith("user/") ||
      img.startsWith("/root/") ||
      img.startsWith("root/") ||
      img.startsWith("/app/") ||
      img.startsWith("app/") ||
      img.startsWith("/src/") ||
      img.startsWith("src/") ||
      img.startsWith("/") ||
      // Not a valid http(s) or data URL
      (!img.startsWith("http") && !img.startsWith("data:"));

    if (isBroken) {
      console.log(`BROKEN: [${blog.slug}] ${blog.title} -> ${img ?? "(null)"}`);
    } else {
      console.log(`OK:     [${blog.slug}] ${blog.title} -> ${img?.substring(0, 70)}...`);
    }
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