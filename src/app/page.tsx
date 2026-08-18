import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_COLOR_MAP } from "@/types";

export default async function HomePage() {
  const [featured, latest, categories] = await Promise.all([
    prisma.blog.findFirst({
      where: { status: "PUBLISHED", isFeatured: true },
      include: { author: true, category: true },
      orderBy: { publishedAt: "desc" }
    }),
    prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      include: { author: true, category: true },
      orderBy: { publishedAt: "desc" },
      take: 6
    }),
    prisma.category.findMany({
      include: { _count: { select: { blogs: true } } }
    })
  ]);

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="decorative-blob w-72 h-72 bg-accent-400 -top-20 -left-20" />
      <div className="decorative-blob w-96 h-96 bg-accent-100 top-40 -right-32" />

      {/* Hero Section */}
      <section className="pt-20 pb-14 text-center max-w-2xl mx-auto fade-in-up relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100 text-accent-600 text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in-down">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
          Volume 12 · Est. 2026
        </div>
        <h1 className="font-voice text-5xl md:text-6xl leading-tight font-semibold mb-6">
          Every page <span className="hero-gradient-text">reviewed</span>, before it's bound.
        </h1>
        <p className="text-ink-400 leading-relaxed text-lg mb-10 max-w-xl mx-auto">
          A publishing desk for writers and readers — every submission reads through editorial
          review before it reaches the shelf.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/blogs" className="btn-primary">
            Browse blogs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/submit" className="btn-secondary">
            Start writing
          </Link>
        </div>
      </section>

      {/* Featured Blog */}
      {featured && (
        <section className="mb-14 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Link
            href={`/blogs/${featured.slug}`}
            className="card-hover grid md:grid-cols-2 gap-0 border border-ink-100 rounded-2xl overflow-hidden bg-white group shadow-soft hover:shadow-lift"
          >
            <div className="h-64 bg-gradient-to-br from-accent-50 to-ink-100 relative overflow-hidden">
              {featured.featuredImage ? (
                <Image
                  src={featured.featuredImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #B5D4F4, #E7E5DD)" }} />
              )}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-ink-900 text-white shadow-lg">
                  <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full self-start mb-3"
                style={{
                  background: CATEGORY_COLOR_MAP[featured.category.colorTag ?? "blue"].bg,
                  color: CATEGORY_COLOR_MAP[featured.category.colorTag ?? "blue"].text
                }}
              >
                {featured.category.name}
              </span>
              <h2 className="font-voice text-2xl font-semibold mb-3 group-hover:text-accent-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm text-ink-400 mb-4 line-clamp-3">{featured.description}</p>
              <div className="flex items-center gap-3 text-xs text-ink-400">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white flex items-center justify-center font-semibold shadow-sm">
                  {featured.author.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{featured.author.name}</span>
                <span>·</span>
                <span>{featured.readingTimeMins} min read</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Latest Blogs */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Latest from the desk</h2>
            <p className="text-sm text-ink-400 mt-3">Fresh writing, freshly reviewed</p>
          </div>
          <Link href="/blogs" className="text-sm text-accent-600 font-medium hover:text-accent-800 transition-colors inline-flex items-center gap-1 group">
            View all
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {latest.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={{
                ...blog,
                author: { name: blog.author.name },
                category: {
                  name: blog.category.name,
                  slug: blog.category.slug,
                  colorTag: blog.category.colorTag
                }
              }}
            />
          ))}
          {latest.length === 0 && (
            <p className="text-sm text-ink-400 col-span-3 text-center py-10">
              No published blogs yet — run the seed script to add sample content.
            </p>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Browse by shelf</h2>
            <p className="text-sm text-ink-400 mt-3">Find your next read by topic</p>
          </div>
          <Link href="/categories" className="text-sm text-accent-600 font-medium hover:text-accent-800 transition-colors inline-flex items-center gap-1 group">
            All categories
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((c) => {
            const colors = CATEGORY_COLOR_MAP[c.colorTag ?? "blue"];
            return (
              <Link
                key={c.id}
                href={`/blogs?category=${c.slug}`}
                className="card-hover border border-ink-100 rounded-xl p-5 bg-white hover:border-accent-400/50 group shadow-soft hover:shadow-lift"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: colors.bg }}
                >
                  <span className="text-lg" style={{ color: colors.text }}>
                    {c.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-medium group-hover:text-accent-600 transition-colors">{c.name}</h3>
                <p className="text-xs text-ink-400 mt-1">{c._count.blogs} posts</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}