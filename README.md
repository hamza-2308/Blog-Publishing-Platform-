# Quire — full-stack blog publishing platform

A blog platform built with Next.js (App Router), Prisma, PostgreSQL, and NextAuth.
Built for the NTS Web Development Internship Task 02.

## What's included in this starter

- Public site: homepage, blog listing (search + category filter), blog detail page, categories page
- Auth: register/login with role-based sessions (Admin / Author / Visitor) via NextAuth credentials
- Blog submission flow: authors submit → status `PENDING_REVIEW` → admin approves/rejects → `PUBLISHED`
- Admin panel: dashboard with stats, blog management (approve/reject/delete), category management, user management (block/unblock)
- Database schema: Users, Roles, Blogs, Categories, Tags, Media, Comments — all relations wired in Prisma
- SEO basics: dynamic sitemap.xml, robots.txt, per-blog metadata + Open Graph tags
- Design system: "Quire" ink/paper editorial theme (see `tailwind.config.ts`) matching the approved homepage mockup

## What you still need to build

This is a working scaffold, not the finished 7-day deliverable. Still to do:
- Rich text / markdown editor for the submission form (currently plain textarea)
- Image upload integration (Cloudinary or Uploadthing) — `featuredImage` and `Media` fields are ready in the schema
- Pagination or infinite scroll on `/blogs`
- Sorting (latest/popular) and more advanced filters
- Author dashboard (view own submissions + status)
- 50 published blogs with real researched content (2,000–3,000 words each)
- Comments, likes, bookmarks (optional features)
- Deployment to Vercel + hosted Postgres (Neon/Supabase)

## Getting started

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the env file and fill in your database URL:
   ```
   cp .env.example .env
   ```
   Get a free Postgres database from [Neon](https://neon.tech) or [Supabase](https://supabase.com).

3. Push the schema and seed sample data:
   ```
   npx prisma db push
   npm run seed
   ```

4. Run the dev server:
   ```
   npm run dev
   ```

5. Log in as admin: `admin@quire.dev` / `password123`
   Log in as author: `author@quire.dev` / `password123`

## Project structure

```
src/
  app/
    page.tsx              homepage
    blogs/                public blog listing + [slug] detail page
    categories/            category browse page
    login/, register/      auth pages
    submit/                 author blog submission form
    admin/                  protected admin panel (dashboard, blogs, categories, users)
    api/                    route handlers (auth, blogs, register)
  components/               Navbar, Footer, BlogCard
  lib/                       prisma client, auth config
  types/                     shared TypeScript types
prisma/
  schema.prisma             database schema
  seed.ts                   sample data seeder
```

## Tech stack

- Next.js 14 (App Router, Server Actions)
- PostgreSQL + Prisma ORM
- NextAuth.js (credentials provider, JWT sessions, role-based access)
- Tailwind CSS
- Deployed target: Vercel
