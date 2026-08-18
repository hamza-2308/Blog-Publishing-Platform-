import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  const blogs = await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
      ...(q ? { title: { contains: q, mode: "insensitive" } } : {}),
      ...(category ? { category: { slug: category } } : {})
    },
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" }
  });

  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Log in to submit a blog." }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, content, categorySlug, references, featuredImage } = body;

  if (!title || !description || !content || !categorySlug) {
    return NextResponse.json({ error: "Fill in every required field." }, { status: 400 });
  }

  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) {
    return NextResponse.json({ error: "Pick a valid category." }, { status: 400 });
  }

  const wordCount = content.split(/\s+/).length;
  const readingTimeMins = Math.max(1, Math.round(wordCount / 200));

  const slug = `${slugify(title, { lower: true, strict: true })}-${Date.now().toString(36)}`;

  const blog = await prisma.blog.create({
    data: {
      title,
      slug,
      description,
      content,
      references,
      featuredImage,
      readingTimeMins,
      status: "PENDING_REVIEW",
      authorId: (session.user as any).id,
      categoryId: category.id
    }
  });

  return NextResponse.json(blog, { status: 201 });
}
