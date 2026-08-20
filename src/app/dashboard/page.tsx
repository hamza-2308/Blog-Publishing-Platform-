import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CATEGORY_COLOR_MAP } from "@/types";

const STATUS_STYLES: Record<string, string> = {
  PUBLISHED: "status-badge status-published",
  PENDING_REVIEW: "status-badge status-pending",
  REJECTED: "status-badge status-rejected",
  DRAFT: "status-badge status-draft",
  APPROVED: "status-badge status-approved"
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as any).id;

  const [blogs, stats] = await Promise.all([
    prisma.blog.findMany({
      where: { authorId: userId },
      include: { category: true },
      orderBy: { submittedAt: "desc" }
    }),
    prisma.blog.groupBy({
      by: ["status"],
      where: { authorId: userId },
      _count: true
    })
  ]);

  const statusCounts = Object.fromEntries(stats.map((s) => [s.status, s._count]));
  const published = statusCounts.PUBLISHED ?? 0;
  const pending = statusCounts.PENDING_REVIEW ?? 0;
  const rejected = statusCounts.REJECTED ?? 0;

  return (
    <div className="py-8 sm:py-10 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-voice text-2xl sm:text-3xl font-semibold mb-1">My blogs</h1>
          <p className="text-ink-400 text-sm">
            Track your submissions and their review status
          </p>
        </div>
        <Link
          href="/submit"
          className="bg-gradient-to-r from-ink-900 to-ink-700 text-white px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-md shadow-ink-900/10 hover:shadow-accent-600/20 hover:-translate-y-0.5 whitespace-nowrap"
        >
          + Write a blog
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white border border-ink-100 rounded-xl p-4 sm:p-5 shadow-soft hover:shadow-card transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs text-ink-400">Published</p>
          </div>
          <p className="text-2xl sm:text-3xl font-semibold text-emerald-600">{published}</p>
        </div>
        <div className="bg-white border border-ink-100 rounded-xl p-4 sm:p-5 shadow-soft hover:shadow-card transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <p className="text-xs text-ink-400">Pending review</p>
          </div>
          <p className="text-2xl sm:text-3xl font-semibold text-amber-600">{pending}</p>
        </div>
        <div className="bg-white border border-ink-100 rounded-xl p-4 sm:p-5 shadow-soft hover:shadow-card transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <p className="text-xs text-ink-400">Rejected</p>
          </div>
          <p className="text-2xl sm:text-3xl font-semibold text-red-600">{rejected}</p>
        </div>
      </div>

      {/* Blog list */}
      <div className="space-y-3">
        {blogs.map((blog) => {
          const colors = CATEGORY_COLOR_MAP[blog.category.colorTag ?? "blue"];
          return (
            <div
              key={blog.id}
              className="bg-white border border-ink-100 rounded-xl p-4 sm:p-5 hover:border-accent-400/50 transition-all duration-200 shadow-soft hover:shadow-card"
            >
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {blog.category.name}
                    </span>
                    <span className={STATUS_STYLES[blog.status] ?? "status-badge"}>
                      {blog.status.replace("_", " ").toLowerCase()}
                    </span>
                  </div>
                  <h3 className="font-medium mb-1 truncate">{blog.title}</h3>
                  <p className="text-sm text-ink-400 line-clamp-1">{blog.description}</p>
                  <p className="text-xs text-ink-400 mt-2">
                    Submitted {new Date(blog.submittedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                    {blog.publishedAt &&
                      ` · Published ${new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}`}
                  </p>
                </div>
                {blog.status === "PUBLISHED" && (
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-sm text-accent-600 font-medium hover:text-accent-800 whitespace-nowrap inline-flex items-center gap-1 group shrink-0"
                  >
                    View
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        {blogs.length === 0 && (
          <div className="text-center py-16 bg-white border border-ink-100 rounded-xl shadow-soft">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ink-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <p className="text-ink-400 mb-4">You haven't submitted any blogs yet.</p>
            <Link
              href="/submit"
              className="inline-block bg-gradient-to-r from-ink-900 to-ink-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-md shadow-ink-900/10 hover:shadow-accent-600/20 hover:-translate-y-0.5"
            >
              Write your first blog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}