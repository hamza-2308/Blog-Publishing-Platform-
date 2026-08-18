"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function SubmitForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Couldn't upload the image. Try again.");
      setUploading(false);
      return;
    }

    const data = await res.json();
    setFeaturedImage(data.url);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({
        title: form.get("title"),
        description: form.get("description"),
        content: form.get("content"),
        categorySlug: form.get("category"),
        references: form.get("references"),
        featuredImage
      })
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Couldn't submit your blog. Try again.");
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-ink-700 mb-1.5">
          Blog title
        </label>
        <input
          id="title"
          name="title"
          placeholder="A compelling title for your article"
          required
          className="w-full border border-ink-100 rounded-lg px-3.5 py-2.5 text-sm bg-ink-50/50 input-focus"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-ink-700 mb-1.5">
          Short description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="1-2 sentences that summarize your article"
          required
          rows={2}
          className="w-full border border-ink-100 rounded-lg px-3.5 py-2.5 text-sm bg-ink-50/50 input-focus resize-none"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-ink-700 mb-1.5">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          className="w-full border border-ink-100 rounded-lg px-3.5 py-2.5 text-sm bg-ink-50/50 input-focus"
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Featured image */}
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">Featured image</label>
        {featuredImage ? (
          <div className="relative">
            <div className="h-40 rounded-lg overflow-hidden border border-ink-100 relative shadow-soft">
              <Image
                src={featuredImage}
                alt="Featured image preview"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setFeaturedImage(null);
                  setFileInputKey((k) => k + 1);
                }}
                className="text-xs border border-red-200 text-red-600 rounded-lg px-3 py-1.5 font-medium hover:bg-red-50 transition-colors"
              >
                Remove image
              </button>
            </div>
          </div>
        ) : (
          <label
            className={`flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
              uploading
                ? "border-accent-400 bg-accent-50/50"
                : "border-ink-200 bg-ink-50/30 hover:border-accent-400 hover:bg-accent-50/30 hover:-translate-y-0.5"
            }`}
          >
            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <svg
              className="w-8 h-8 mb-2 text-ink-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-ink-400">
              {uploading ? "Uploading..." : "Click to upload a cover image"}
            </p>
            <p className="text-xs text-ink-300 mt-1">JPG or PNG</p>
          </label>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-ink-700 mb-1.5">
          Article content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Write your full article here..."
          required
          rows={12}
          className="w-full border border-ink-100 rounded-lg px-3.5 py-2.5 text-sm bg-ink-50/50 input-focus font-mono leading-relaxed"
        />
      </div>

      <div>
        <label htmlFor="references" className="block text-sm font-medium text-ink-700 mb-1.5">
          References and sources
        </label>
        <textarea
          id="references"
          name="references"
          placeholder="One per line — links, books, papers"
          rows={3}
          className="w-full border border-ink-100 rounded-lg px-3.5 py-2.5 text-sm bg-ink-50/50 input-focus resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 animate-fade-in">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full bg-gradient-to-r from-ink-900 to-ink-700 text-white rounded-lg py-3 text-sm font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-md shadow-ink-900/10 hover:shadow-accent-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          "Submit for review"
        )}
      </button>
    </form>
  );
}