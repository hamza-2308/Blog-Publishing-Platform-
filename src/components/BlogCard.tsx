import Link from "next/link";
import Image from "next/image";
import { BlogCardData, CATEGORY_COLOR_MAP } from "@/types";

export default function BlogCard({ blog }: { blog: BlogCardData }) {
  const colors = CATEGORY_COLOR_MAP[blog.category.colorTag ?? "blue"];

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="card-hover block border border-ink-100 rounded-xl overflow-hidden bg-white hover:border-accent-400/50 group shadow-soft hover:shadow-lift"
    >
      <div className="h-28 relative overflow-hidden bg-gradient-to-br from-ink-50 to-ink-100">
        {blog.featuredImage ? (
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          />
        )}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm"
            style={{ background: colors.bg, color: colors.text }}
          >
            {blog.category.name}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 text-xs text-ink-400 font-medium bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
          {blog.readingTimeMins} min read
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-voice font-semibold text-lg mb-2 leading-snug group-hover:text-accent-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-ink-400 mb-4 line-clamp-2">{blog.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-ink-50">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white shadow-sm"
              style={{ background: colors.text }}
            >
              {blog.author.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-ink-400 font-medium">{blog.author.name}</span>
          </div>
          <span className="text-xs text-accent-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}