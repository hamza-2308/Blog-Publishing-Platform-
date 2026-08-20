import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function toggleActive(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.user.update({ where: { id }, data: { isActive: !isActive } });
  revalidatePath("/admin/users");
}

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    where: { role: { not: "ADMIN" } },
    include: { _count: { select: { blogs: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-voice text-xl sm:text-2xl font-semibold mb-1">Users and authors</h1>
        <p className="text-sm text-ink-400">
          {users.length} {users.length === 1 ? "user" : "users"} on the platform
        </p>
      </div>

      <div className="bg-white border border-ink-100 rounded-xl overflow-hidden shadow-soft">
        <div className="divide-y divide-ink-50">
          {users.map((u) => (
            <div key={u.id} className="px-4 sm:px-5 py-4 table-row-hover">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white flex items-center justify-center font-semibold shrink-0 shadow-sm">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium truncate">{u.name}</p>
                      <span
                        className={`status-badge ${
                          u.isActive ? "status-published" : "status-rejected"
                        }`}
                      >
                        {u.isActive ? "active" : "blocked"}
                      </span>
                    </div>
                    <p className="text-xs text-ink-400 truncate">
                      {u.email} · {u._count.blogs}{" "}
                      {u._count.blogs === 1 ? "submission" : "submissions"} ·{" "}
                      {u.role.toLowerCase()}
                    </p>
                  </div>
                </div>
                <form action={toggleActive} className="shrink-0">
                  <input type="hidden" name="id" value={u.id} />
                  <input type="hidden" name="isActive" value={String(u.isActive)} />
                  <button
                    className={`text-xs rounded-lg px-3 py-1.5 font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                      u.isActive
                        ? "border border-red-200 text-red-600 hover:bg-red-50"
                        : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                    }`}
                  >
                    {u.isActive ? "Block" : "Unblock"}
                  </button>
                </form>
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <p className="px-5 py-4 text-sm text-ink-400">No users yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}