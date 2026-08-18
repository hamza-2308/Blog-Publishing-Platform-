import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { CATEGORY_COLOR_MAP } from "@/types";

export default async function BlogsPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string };
}) {
  const [blogs, categories] = await Promise.all([
    prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
        ...(searchParams.q
          ? { title: { contains: searchParams.q, mode: "insensitive" } }
          : {}),
        ...(searchParams.category ? { category: { slug: searchParams.category } } : {})
      },
      include: { author: true, category: true },
      orderBy: { publishedAt: "desc" }
    }),
    prisma.category.findMany({
      include: { _count: { select: { blogs: true } } }
    })
  ]);

  const activeCategory = searchParams.category;

  return (
    <div className="py-10">
      <div className="mb-8">
        <h1 className="font-voice text-3xl font-semibold mb-2">All blogs</h1>
        <p className="text-ink-400 text-sm">
          {blogs.length} {blogs.length === 1 ? "article" : "articles"} on the shelf
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/blogs"
          className={`text-sm px-3 py-1.5 rounded-full transition-all duration-200 ${
            !activeCategory
              ? "bg-ink-900 text-white shadow-md shadow-ink-900/10"
              : "bg-ink-50 text-ink-700 hover:bg-ink-100 hover:-translate-y-0.5"
          }`}
        >
          All
        </Link>
        {categories.map((c) => {
          const colors = CATEGORY_COLOR_MAP[c.colorTag ?? "blue"];
          const isActive = activeCategory === c.slug;
          return (
            <Link
              key={c.id}
              href={`/blogs?category=${c.slug}`}
              className={`text-sm px-3 py-1.5 rounded-full transition-all duration-200 ${
                isActive ? "text-white shadow-md" : "hover:opacity-80 hover:-translate-y-0.5"
              }`}
              style={isActive ? { background: colors.text } : { background: colors.bg, color: colors.text }}
            >
              {c.name}
            </Link>
          );
        })}
      </div>

      {/* Search form */}
      <form className="mb-8 flex gap-2" action="/blogs">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            name="q"
            defaultValue={searchParams.q}
            placeholder="Search blogs..."
            className="w-full border border-ink-100 rounded-lg pl-10 pr-3 py-2.5 text-sm bg-white input-focus shadow-soft"
          />
        </div>
        <button className="bg-ink-900 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-accent-600 transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-ink-900/10">
          Search
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-5">
        {blogs.map((blog) => (
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
        {blogs.length === 0 && (
          <div className="col-span-3 text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ink-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-ink-400 mb-4">No blogs found.</p>
            <Link href="/blogs" className="text-sm text-accent-600 font-medium hover:text-accent-800 inline-flex items-center gap-1 group">
              Clear filters
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}