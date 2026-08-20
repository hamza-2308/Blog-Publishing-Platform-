import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 sm:py-16 relative px-4">
      {/* Decorative background */}
      <div className="decorative-blob w-64 h-64 bg-accent-400 -top-10 -left-10" />
      <div className="decorative-blob w-80 h-80 bg-accent-100 bottom-0 -right-20" />

      <div className="w-full max-w-md relative">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 text-white text-xl sm:text-2xl font-bold mb-4 shadow-lg shadow-accent-600/20 animate-float">
            Q
          </div>
          <h1 className="font-voice text-2xl sm:text-3xl font-semibold mb-2">Welcome back</h1>
          <p className="text-ink-400 text-sm sm:text-base">Sign in to continue to Quire</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-ink-100 rounded-2xl p-5 sm:p-8 shadow-card">
          <LoginForm />
        </div>

        <p className="text-center text-sm text-ink-400 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-accent-600 hover:text-accent-700 font-medium hover:underline underline-offset-2">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}