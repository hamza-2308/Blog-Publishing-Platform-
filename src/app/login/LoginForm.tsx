"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false
    });

    if (res?.error) {
      setError("That email or password isn't right. Try again.");
      setLoading(false);
      return;
    }

    // Full page reload to ensure server components (Navbar) see the fresh session
    window.location.href = "/";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          className="w-full border border-ink-100 rounded-lg px-3.5 py-2.5 text-sm bg-ink-50/50 input-focus"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink-700 mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="w-full border border-ink-100 rounded-lg px-3.5 py-2.5 text-sm bg-ink-50/50 input-focus"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 animate-fade-in">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-ink-900 to-ink-700 text-white rounded-lg py-2.5 text-sm font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-md shadow-ink-900/10 hover:shadow-accent-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing in...
          </span>
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
}