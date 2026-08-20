import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function approveBlog(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.blog.update({
    where: { id },
    data: { status: "PUBLISHED", publishedAt: new Date(), reviewedAt: new Date() }
  });
  revalidatePath("/admin/blogs");
}

async function rejectBlog(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.blog.update({
    where: { id },
    data: { status: "REJECTED", reviewedAt: new Date() }
  });
  revalidatePath("/admin/blogs");
}

async function deleteBlog(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/admin/blogs");
}

const STATUS_STYLES: Record<string, string> = {
  PUBLISHED: "status-badge status-published",
  PENDING_REVIEW: "status-badge status-pending",
  REJECTED: "status-badge status-rejected",
  DRAFT: "status-badge status-draft",
  APPROVED: "status-badge status-approved"
};

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    include: { author: true, category: true },
    orderBy: { submittedAt: "desc" }
  });

  const pendingCount = blogs.filter((b) => b.status === "PENDING_REVIEW").length;

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-voice text-xl sm:text-2xl font-semibold mb-1">Manage blogs</h1>
        <p className="text-sm text-ink-400">
          {pendingCount} {pendingCount === 1 ? "blog" : "blogs"} awaiting review
        </p>
      </div>

      <div className="bg-white border border-ink-100 rounded-xl overflow-hidden shadow-soft">
        <div className="divide-y divide-ink-50">
          {blogs.map((b) => (
            <div key={b.id} className="px-4 sm:px-5 py-4 table-row-hover">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={STATUS_STYLES[b.status] ?? "status-badge"}>
                      {b.status.replace("_", " ").toLowerCase()}
                    </span>
                    <span className="text-xs text-ink-400">
                      {b.category.name}
                    </span>
                  </div>
                  <h3 className="font-medium mb-0.5 truncate">{b.title}</h3>
                  <p className="text-xs text-ink-400">
                    {b.author.name} · Submitted{" "}
                    {new Date(b.submittedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0 flex-wrap">
                  {b.status === "PENDING_REVIEW" && (
                    <>
                      <form action={approveBlog}>
                        <input type="hidden" name="id" value={b.id} />
                        <button className="text-xs bg-emerald-600 text-white rounded-lg px-3 py-1.5 font-medium hover:bg-emerald-700 transition-all duration-200 hover:-translate-y-0.5 shadow-sm">
                          Approve
                        </button>
                      </form>
                      <form action={rejectBlog}>
                        <input type="hidden" name="id" value={b.id} />
                        <button className="text-xs bg-red-600 text-white rounded-lg px-3 py-1.5 font-medium hover:bg-red-700 transition-all duration-200 hover:-translate-y-0.5 shadow-sm">
                          Reject
                        </button>
                      </form>
                    </>
                  )}
                  {b.status === "PUBLISHED" && (
                    <Link
                      href={`/blogs/${b.slug}`}
                      className="text-xs border border-ink-200 rounded-lg px-3 py-1.5 font-medium text-ink-700 hover:border-accent-400 hover:text-accent-600 transition-colors"
                    >
                      View
                    </Link>
                  )}
                  <form action={deleteBlog}>
                    <input type="hidden" name="id" value={b.id} />
                    <button className="text-xs border border-red-200 text-red-600 rounded-lg px-3 py-1.5 font-medium hover:bg-red-50 transition-colors">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <p className="px-5 py-4 text-sm text-ink-400">No blogs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}