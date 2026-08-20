import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { CATEGORY_COLOR_MAP } from "@/types";

async function createCategory(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  if (!name) return;
  await prisma.category.create({
    data: { name, slug: slugify(name, { lower: true, strict: true }) }
  });
  revalidatePath("/admin/categories");
}

async function deleteCategory(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { blogs: true } } }
  });

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-voice text-xl sm:text-2xl font-semibold mb-1">Manage categories</h1>
        <p className="text-sm text-ink-400">
          {categories.length} categories on the shelf
        </p>
      </div>

      {/* Create form */}
      <form action={createCategory} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          name="name"
          placeholder="New category name"
          required
          className="flex-1 border border-ink-100 rounded-lg px-3.5 py-2.5 text-sm bg-white input-focus shadow-soft"
        />
        <button className="bg-gradient-to-r from-ink-900 to-ink-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-md shadow-ink-900/10 hover:shadow-accent-600/20 hover:-translate-y-0.5 sm:w-auto w-full">
          Add category
        </button>
      </form>

      {/* Category list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {categories.map((c) => {
          const colors = CATEGORY_COLOR_MAP[c.colorTag ?? "blue"];
          return (
            <div
              key={c.id}
              className="bg-white border border-ink-100 rounded-xl p-4 sm:p-5 flex items-center justify-between shadow-soft hover:shadow-card transition-shadow gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-semibold shrink-0"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{c.name}</p>
                  <p className="text-xs text-ink-400">
                    {c._count.blogs} {c._count.blogs === 1 ? "blog" : "blogs"}
                  </p>
                </div>
              </div>
              <form action={deleteCategory} className="shrink-0">
                <input type="hidden" name="id" value={c.id} />
                <button className="text-xs border border-red-200 text-red-600 rounded-lg px-3 py-1.5 font-medium hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </form>
            </div>
          );
        })}
        {categories.length === 0 && (
          <p className="text-sm text-ink-400 col-span-1 sm:col-span-2 text-center py-10">
            No categories yet. Add your first one above.
          </p>
        )}
      </div>
    </div>
  );
}