import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SubmitForm from "./SubmitForm";

export default async function SubmitBlogPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-0">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 text-accent-600 mb-4 shadow-sm">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h1 className="font-voice text-2xl sm:text-3xl font-semibold mb-2">Submit a blog</h1>
          <p className="text-ink-400 text-sm sm:text-base">
            Your submission enters pending review. An editor will approve or reject it before it
            publishes.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white border border-ink-100 rounded-2xl p-5 sm:p-8 shadow-card">
          <SubmitForm categories={categories} />
        </div>
      </div>
    </div>
  );
}