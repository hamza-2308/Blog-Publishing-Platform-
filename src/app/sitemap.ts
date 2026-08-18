import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const blogs = await prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true }
  });

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/blogs`, lastModified: new Date() },
    { url: `${base}/categories`, lastModified: new Date() },
    ...blogs.map((b) => ({
      url: `${base}/blogs/${b.slug}`,
      lastModified: b.updatedAt
    }))
  ];
}
