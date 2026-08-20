import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [total, published, pending, rejected, authors, categories] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({ where: { status: "PUBLISHED" } }),
    prisma.blog.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.blog.count({ where: { status: "REJECTED" } }),
    prisma.user.count({ where: { role: "AUTHOR" } }),
    prisma.category.count()
  ]);

  const recent = await prisma.blog.findMany({
    take: 5,
    orderBy: { submittedAt: "desc" },
    include: { author: true }
  });

  const stats = [
    { label: "Total blogs", value: total, color: "text-ink-900", bg: "bg-ink-50", icon: "📚" },
    { label: "Published", value: published, color: "text-emerald-600", bg: "bg-emerald-50", icon: "✅" },
    { label: "Pending review", value: pending, color: "text-amber-600", bg: "bg-amber-50", icon: "⏳" },
    { label: "Rejected", value: rejected, color: "text-red-600", bg: "bg-red-50", icon: "❌" },
    { label: "Authors", value: authors, color: "text-accent-600", bg: "bg-accent-50", icon: "✍️" },
    { label: "Categories", value: categories, color: "text-purple-600", bg: "bg-purple-50", icon: "🏷️" }
  ];

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-voice text-xl sm:text-2xl font-semibold mb-1">Dashboard</h1>
        <p className="text-sm text-ink-400">Overview of your publishing desk</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {stats.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 sm:p-5 shadow-soft hover:shadow-card transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] sm:text-xs text-ink-400">{s.label}</p>
              <span className="text-sm">{s.icon}</span>
            </div>
            <p className={`text-2xl sm:text-3xl font-semibold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent submissions */}
      <div className="bg-white border border-ink-100 rounded-xl overflow-hidden shadow-soft">
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-ink-100">
          <h2 className="font-medium">Recent submissions</h2>
          <Link href="/admin/blogs" className="text-sm text-accent-600 font-medium hover:text-accent-800 inline-flex items-center gap-1 group whitespace-nowrap">
            Manage all
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="divide-y divide-ink-50">
          {recent.map((b) => (
            <div key={b.id} className="flex items-center justify-between px-4 sm:px-5 py-3.5 text-sm table-row-hover gap-3">
              <div className="min-w-0">
                <p className="font-medium truncate">{b.title}</p>
                <p className="text-xs text-ink-400 mt-0.5 truncate">{b.author.name}</p>
              </div>
              <span
                className={`status-badge shrink-0 ${
                  b.status === "PUBLISHED"
                    ? "status-published"
                    : b.status === "PENDING_REVIEW"
                    ? "status-pending"
                    : b.status === "REJECTED"
                    ? "status-rejected"
                    : "status-draft"
                }`}
              >
                {b.status.replace("_", " ").toLowerCase()}
              </span>
            </div>
          ))}
          {recent.length === 0 && (
            <p className="px-5 py-4 text-sm text-ink-400">No submissions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}