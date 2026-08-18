import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_COLOR_MAP } from "@/types";

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug } });
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.featuredImage ? [blog.featuredImage] : []
    }
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: { author: true, category: true }
  });

  if (!blog || blog.status !== "PUBLISHED") notFound();

  const related = await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: blog.categoryId,
      NOT: { id: blog.id }
    },
    take: 3,
    include: { author: true, category: true }
  });

  const colors = CATEGORY_COLOR_MAP[blog.category.colorTag ?? "blue"];

  return (
    <article className="py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-ink-400 mb-6">
        <Link href="/" className="hover:text-accent-600 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blogs" className="hover:text-accent-600 transition-colors">
          Blogs
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{blog.category.name}</span>
      </nav>

      {/* Header */}
      <header className="max-w-2xl mx-auto text-center mb-8">
        <span
          className="inline-block text-xs font-medium px-3 py-1.5 rounded-full mb-4 shadow-sm"
          style={{ background: colors.bg, color: colors.text }}
        >
          {blog.category.name}
        </span>
        <h1 className="font-voice text-4xl font-semibold leading-tight mb-4">{blog.title}</h1>
        <p className="text-ink-400 text-lg mb-6">{blog.description}</p>
        <div className="flex items-center justify-center gap-3 text-sm text-ink-400">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white shadow-sm"
            style={{ background: colors.text }}
          >
            {blog.author.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-left">
            <p className="font-medium text-ink-900">{blog.author.name}</p>
            <p className="text-xs">
              {blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })
                : ""}{" "}
              · {blog.readingTimeMins} min read
            </p>
          </div>
        </div>
      </header>

      {/* Cover image */}
      <div className="h-72 rounded-2xl mb-10 relative overflow-hidden bg-gradient-to-br from-accent-50 via-ink-50 to-ink-100 shadow-card">
        {blog.featuredImage ? (
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="absolute inset-0 opacity-15"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          />
        )}
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        <div className="prose-content whitespace-pre-line">{blog.content}</div>

        {blog.references && (
          <div className="mt-10 bg-ink-50 rounded-xl p-6 border border-ink-100">
            <h3 className="font-voice font-semibold text-lg mb-3">References</h3>
            <p className="text-sm text-ink-400 whitespace-pre-line">{blog.references}</p>
          </div>
        )}

        {/* Author card */}
        <div className="mt-10 border border-ink-100 rounded-xl p-6 bg-white flex items-center gap-4 shadow-soft">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white text-lg shadow-sm"
            style={{ background: colors.text }}
          >
            {blog.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">Written by {blog.author.name}</p>
            <p className="text-sm text-ink-400">
              {blog.author.bio ?? "Contributing writer at Quire."}
            </p>
          </div>
        </div>
      </div>

      {/* Related blogs */}
      {related.length > 0 && (
        <section className="mt-16 max-w-4xl mx-auto">
          <div className="border-t border-ink-100 pt-8">
            <h2 className="font-voice text-2xl font-semibold mb-6">Related blogs</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => {
                const rColors = CATEGORY_COLOR_MAP[r.category.colorTag ?? "blue"];
                return (
                  <Link
                    key={r.id}
                    href={`/blogs/${r.slug}`}
                    className="card-hover block border border-ink-100 rounded-xl p-5 bg-white hover:border-accent-400/50 group shadow-soft hover:shadow-lift"
                  >
                    <span
                      className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2"
                      style={{ background: rColors.bg, color: rColors.text }}
                    >
                      {r.category.name}
                    </span>
                    <h3 className="font-medium mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                    <p className="text-xs text-ink-400">
                      {r.author.name} · {r.readingTimeMins} min read
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}