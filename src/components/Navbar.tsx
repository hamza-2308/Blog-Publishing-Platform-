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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-ink-900 to-ink-700 text-white flex items-center justify-center font-voice text-base sm:text-lg font-semibold group-hover:from-accent-600 group-hover:to-accent-800 transition-all duration-300 shadow-md shadow-ink-900/10 group-hover:shadow-accent-600/20 group-hover:scale-105">
            Q
          </span>
          <span className="font-voice text-lg sm:text-xl font-semibold tracking-tight group-hover:text-accent-600 transition-colors">
            Quire
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
          <Link
            href="/blogs"
            className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group whitespace-nowrap"
          >
            Blogs
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/categories"
            className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group whitespace-nowrap"
          >
            Categories
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
          </Link>

          {user ? (
            <>
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group whitespace-nowrap"
                >
                  Admin
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group whitespace-nowrap"
                >
                  My Blogs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
                </Link>
              )}
              <Link
                href="/submit"
                className="bg-gradient-to-r from-ink-900 to-ink-700 text-white px-3 lg:px-4 py-2 rounded-lg font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-md shadow-ink-900/10 hover:shadow-accent-600/20 hover:-translate-y-0.5 whitespace-nowrap"
              >
                Write a blog
              </Link>
              <div className="flex items-center gap-2 lg:gap-3 pl-3 border-l border-ink-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-ink-700 font-medium hidden lg:block">{user.name}</span>
                </div>
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-ink-400 hover:text-ink-900 transition-colors font-medium relative group whitespace-nowrap"
              >
                Log in
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-ink-900 to-ink-700 text-white px-3 lg:px-4 py-2 rounded-lg font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-md shadow-ink-900/10 hover:shadow-accent-600/20 hover:-translate-y-0.5 whitespace-nowrap"
              >
                Start writing
              </Link>
            </>
          )}
        </nav>

        {/* Mobile nav */}
        <details className="md:hidden relative">
          <summary className="flex items-center justify-center w-9 h-9 rounded-lg border border-ink-100 bg-white text-ink-700 cursor-pointer list-none shadow-sm hover:border-accent-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <div className="absolute right-0 top-11 w-56 bg-white border border-ink-100 rounded-xl shadow-lg p-3 space-y-1 z-50">
            <Link
              href="/blogs"
              className="block px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-ink-50 hover:text-ink-900 transition-colors font-medium"
            >
              Blogs
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-ink-50 hover:text-ink-900 transition-colors font-medium"
            >
              Categories
            </Link>
            {user ? (
              <>
                {isAdmin ? (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-ink-50 hover:text-ink-900 transition-colors font-medium"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-ink-50 hover:text-ink-900 transition-colors font-medium"
                  >
                    My Blogs
                  </Link>
                )}
                <Link
                  href="/submit"
                  className="block px-3 py-2 rounded-lg text-sm bg-gradient-to-r from-ink-900 to-ink-700 text-white font-medium hover:from-accent-600 hover:to-accent-700 transition-colors"
                >
                  Write a blog
                </Link>
                <div className="flex items-center justify-between px-3 py-2 border-t border-ink-50 mt-1 pt-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-ink-700 font-medium truncate">{user.name}</span>
                  </div>
                  <LogoutButton />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-ink-50 hover:text-ink-900 transition-colors font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-lg text-sm bg-gradient-to-r from-ink-900 to-ink-700 text-white font-medium hover:from-accent-600 hover:to-accent-700 transition-colors"
                >
                  Start writing
                </Link>
              </>
            )}
          </div>
        </details>
      </div>
    </header>
  );
}