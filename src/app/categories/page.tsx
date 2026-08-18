import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CATEGORY_COLOR_MAP } from "@/types";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { blogs: true } } }
  });

  return (
    <div className="py-10">
      <div className="mb-8">
        <h1 className="font-voice text-3xl font-semibold mb-2">Categories</h1>
        <p className="text-ink-400 text-sm">
          Browse the shelves — {categories.length} topics to explore
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {categories.map((c) => {
          const colors = CATEGORY_COLOR_MAP[c.colorTag ?? "blue"];
          return (
            <Link
              key={c.id}
              href={`/blogs?category=${c.slug}`}
              className="card-hover block border border-ink-100 rounded-xl p-6 bg-white hover:border-accent-400/50 group shadow-soft hover:shadow-lift"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-semibold mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ background: colors.bg, color: colors.text }}
              >
                {c.name.charAt(0)}
              </div>
              <h3 className="font-voice font-semibold text-lg mb-1 group-hover:text-accent-600 transition-colors">
                {c.name}
              </h3>
              <p className="text-sm text-ink-400 mb-4">
                {c._count.blogs} {c._count.blogs === 1 ? "post" : "posts"}
              </p>
              <span className="text-sm text-accent-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 inline-flex items-center gap-1">
                Browse →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}