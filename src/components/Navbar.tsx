import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 bg-[#F7F6F1]/80 backdrop-blur-xl border-b border-ink-100/80 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-ink-900 to-ink-700 text-white flex items-center justify-center font-voice text-lg font-semibold group-hover:from-accent-600 group-hover:to-accent-800 transition-all duration-300 shadow-md shadow-ink-900/10 group-hover:shadow-accent-600/20 group-hover:scale-105">
            Q
          </span>
          <span className="font-voice text-xl font-semibold tracking-tight group-hover:text-accent-600 transition-colors">
            Quire
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/blogs"
            className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group"
          >
            Blogs
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/categories"
            className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group"
          >
            Categories
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
          </Link>

          {user ? (
            <>
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group"
                >
                  Admin
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group"
                >
                  My Blogs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
                </Link>
              )}
              <Link
                href="/submit"
                className="bg-gradient-to-r from-ink-900 to-ink-700 text-white px-4 py-2 rounded-lg font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-md shadow-ink-900/10 hover:shadow-accent-600/20 hover:-translate-y-0.5"
              >
                Write a blog
              </Link>
              <div className="flex items-center gap-3 pl-3 border-l border-ink-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-ink-700 font-medium hidden sm:block">{user.name}</span>
                </div>
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group"
              >
                Log in
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-ink-900 to-ink-700 text-white px-4 py-2 rounded-lg font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-md shadow-ink-900/10 hover:shadow-accent-600/20 hover:-translate-y-0.5"
              >
                Start writing
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}