"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Hide footer on login/register pages
  if (isAuthPage) return null;

  return (
    <footer className="border-t border-ink-100 mt-20 bg-gradient-to-b from-ink-50/50 to-ink-100/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-ink-900 to-ink-700 text-white flex items-center justify-center font-voice text-sm font-semibold shadow-sm">
                Q
              </span>
              <span className="font-voice text-lg font-semibold">Quire</span>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed">
              A publishing desk for writers and readers — every submission reads through editorial
              review before it reaches the shelf.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white border border-ink-100 flex items-center justify-center text-ink-400 hover:text-accent-600 hover:border-accent-400 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white border border-ink-100 flex items-center justify-center text-ink-400 hover:text-accent-600 hover:border-accent-400 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white border border-ink-100 flex items-center justify-center text-ink-400 hover:text-accent-600 hover:border-accent-400 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="RSS"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 01-2.18 2.18A2.18 2.18 0 011.82 15.64a2.18 2.18 0 012.18-2.18 2.18 2.18 0 012.18 2.18zM4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83A15.56 15.56 0 004 4.44zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83A9.9 9.9 0 004 10.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-ink-900">Explore</h4>
            <ul className="space-y-2.5 text-sm text-ink-400">
              <li>
                <Link href="/blogs" className="hover:text-accent-600 transition-colors inline-flex items-center gap-1 group">
                  All blogs
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-accent-600 transition-colors inline-flex items-center gap-1 group">
                  Categories
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-accent-600 transition-colors inline-flex items-center gap-1 group">
                  Write a blog
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-ink-900">Account</h4>
            <ul className="space-y-2.5 text-sm text-ink-400">
              <li>
                <Link href="/login" className="hover:text-accent-600 transition-colors inline-flex items-center gap-1 group">
                  Log in
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-accent-600 transition-colors inline-flex items-center gap-1 group">
                  Create account
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-100 mt-8 sm:mt-10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <span>© 2026 Quire — a place for reviewed writing</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Next.js · Prisma · PostgreSQL
          </span>
        </div>
      </div>
    </footer>
  );
}