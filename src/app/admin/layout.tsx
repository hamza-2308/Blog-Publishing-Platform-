import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/blogs", label: "Blogs", icon: "📝" },
  { href: "/admin/categories", label: "Categories", icon: "🏷️" },
  { href: "/admin/users", label: "Users", icon: "👥" }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="py-10">
      <div className="grid grid-cols-[200px_1fr] gap-8">
        <aside className="text-sm">
          <div className="bg-white border border-ink-100 rounded-xl p-4 sticky top-24 shadow-soft">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-ink-50">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ink-900 to-ink-700 text-white flex items-center justify-center font-voice font-semibold shadow-sm">
                Q
              </div>
              <div>
                <p className="font-semibold text-ink-900">Admin panel</p>
                <p className="text-xs text-ink-400">Editorial desk</p>
              </div>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-ink-50 transition-all duration-200 hover:translate-x-0.5"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}