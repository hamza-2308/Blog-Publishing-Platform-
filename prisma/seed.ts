import { PrismaClient, Role, BlogStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@quire.dev" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@quire.dev",
      passwordHash,
      role: Role.ADMIN
    }
  });

  const author = await prisma.user.upsert({
    where: { email: "author@quire.dev" },
    update: {},
    create: {
      name: "Sara Malik",
      email: "author@quire.dev",
      passwordHash,
      role: Role.AUTHOR,
      bio: "Backend engineer writing about distributed systems."
    }
  });

  const categories = [
    { name: "Technology", slug: "technology", colorTag: "blue" },
    { name: "Artificial Intelligence", slug: "artificial-intelligence", colorTag: "purple" },
    { name: "Web Development", slug: "web-development", colorTag: "teal" },
    { name: "Cybersecurity", slug: "cybersecurity", colorTag: "amber" },
    { name: "Business", slug: "business", colorTag: "coral" },
    { name: "Productivity", slug: "productivity", colorTag: "pink" }
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c
    });
  }

  const webDev = await prisma.category.findUniqueOrThrow({ where: { slug: "web-development" } });
  const tech = await prisma.category.findUniqueOrThrow({ where: { slug: "technology" } });
  const ai = await prisma.category.findUniqueOrThrow({ where: { slug: "artificial-intelligence" } });
  const cyber = await prisma.category.findUniqueOrThrow({ where: { slug: "cybersecurity" } });
  const business = await prisma.category.findUniqueOrThrow({ where: { slug: "business" } });
  const productivity = await prisma.category.findUniqueOrThrow({ where: { slug: "productivity" } });

  const blogs = [
    {
      title: "Server actions vs API routes, chosen right",
      slug: "server-actions-vs-api-routes",
      description: "A practical guide to picking the right backend approach in Next.js.",
      content: `# Server Actions vs API Routes

When building a Next.js application, one of the most common questions is whether to use Server Actions or traditional API Routes for handling data mutations.

## What are Server Actions?

Server Actions are functions that run on the server and can be called directly from client components. They were introduced in Next.js 14 and represent a shift toward a more integrated full-stack approach.

## What are API Routes?

API Routes are the traditional way to create REST endpoints in Next.js. They work well when you need to expose your data to external clients or when you want a clear separation between your frontend and backend.

## When to use Server Actions

- Form submissions that don't need to be reused by external clients
- Mutations that are tightly coupled to your UI
- When you want to avoid writing boilerplate fetch calls

## When to use API Routes

- Building a public API for third-party consumers
- Webhook endpoints
- When you need fine-grained control over HTTP caching

## Conclusion

Both approaches have their place. Start with Server Actions for internal mutations and reach for API Routes when you need a public interface.`,
      status: BlogStatus.PUBLISHED,
      isFeatured: true,
      readingTimeMins: 6,
      featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      authorId: author.id,
      categoryId: webDev.id,
      publishedAt: new Date()
    },
    {
      title: "The Rise of Edge Computing in 2026",
      slug: "rise-of-edge-computing-2026",
      description: "How edge computing is reshaping the cloud landscape and what it means for developers.",
      content: `# The Rise of Edge Computing

Edge computing is no longer a buzzword — it's becoming the default architecture for modern applications.

## Why Edge?

Latency is the enemy of user experience. By moving computation closer to the user, edge computing reduces round-trip times from hundreds of milliseconds to single digits.

## Key Benefits

- **Reduced latency**: Process data where it's generated
- **Better reliability**: Distributed systems are more resilient
- **Cost efficiency**: Less bandwidth means lower costs

## Getting Started

Start by identifying which parts of your application are latency-sensitive. Those are the candidates for edge deployment.`,
      status: BlogStatus.PUBLISHED,
      isFeatured: false,
      readingTimeMins: 8,
      featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      authorId: author.id,
      categoryId: tech.id,
      publishedAt: new Date(Date.now() - 86400000)
    },
    {
      title: "AI Agents: The Next Frontier in Automation",
      slug: "ai-agents-next-frontier",
      description: "Exploring how AI agents are transforming workflows and what developers need to know.",
      content: `# AI Agents: The Next Frontier

AI agents represent a fundamental shift in how we think about automation. Unlike traditional scripts that follow predetermined paths, agents can reason, plan, and adapt.

## What Makes an Agent?

An AI agent combines a large language model with tools and memory. It can break down complex tasks, use tools to gather information, and iterate on its approach.

## Real-World Applications

- Customer support automation
- Code generation and review
- Data analysis and reporting
- Personal productivity assistants

## Building Your First Agent

Start simple. Give your agent one tool and one clear objective. As you understand its behavior, add more capabilities.`,
      status: BlogStatus.PUBLISHED,
      isFeatured: false,
      readingTimeMins: 10,
      featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      authorId: author.id,
      categoryId: ai.id,
      publishedAt: new Date(Date.now() - 172800000)
    },
    {
      title: "Zero Trust Security: A Practical Guide",
      slug: "zero-trust-security-guide",
      description: "Why the perimeter is dead and how to implement zero trust in your organization.",
      content: `# Zero Trust Security

The traditional castle-and-moat security model is obsolete. Zero trust assumes breach and verifies every request.

## Core Principles

1. **Never trust, always verify**
2. **Least privilege access**
3. **Assume breach**

## Implementation Steps

Start with identity as the new perimeter. Implement multi-factor authentication everywhere, then move to micro-segmentation of your network.`,
      status: BlogStatus.PUBLISHED,
      isFeatured: false,
      readingTimeMins: 7,
      featuredImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      authorId: author.id,
      categoryId: cyber.id,
      publishedAt: new Date(Date.now() - 259200000)
    },
    {
      title: "Building a Sustainable Startup Culture",
      slug: "sustainable-startup-culture",
      description: "How to build a company culture that survives growth and change.",
      content: `# Building a Sustainable Startup Culture

Culture isn't what you write on a wall — it's what people do when no one is watching.

## The Foundation

Start with values that are specific enough to guide decisions. "Be excellent" is not a value. "Ship weekly" is.

## Scaling Culture

As you grow, culture doesn't scale automatically. You need systems that reinforce it: hiring rubrics, decision frameworks, and feedback loops.`,
      status: BlogStatus.PUBLISHED,
      isFeatured: false,
      readingTimeMins: 5,
      featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      authorId: author.id,
      categoryId: business.id,
      publishedAt: new Date(Date.now() - 345600000)
    },
    {
      title: "Deep Work in a Distracted World",
      slug: "deep-work-distracted-world",
      description: "Practical strategies for reclaiming focus in an age of constant notifications.",
      content: `# Deep Work in a Distracted World

Deep work is the ability to focus without distraction on a cognitively demanding task. It's becoming rarer — and more valuable.

## The Problem

The average knowledge worker checks their phone 58 times a day. Each interruption costs up to 23 minutes to recover from.

## Strategies That Work

- **Time blocking**: Schedule deep work like a meeting
- **Digital minimalism**: Turn off all non-essential notifications
- **Environment design**: Make distraction harder and focus easier

## Start Today

Pick one 90-minute block tomorrow. Turn off everything. Work on your most important task.`,
      status: BlogStatus.PUBLISHED,
      isFeatured: false,
      readingTimeMins: 4,
      featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
      authorId: author.id,
      categoryId: productivity.id,
      publishedAt: new Date(Date.now() - 432000000)
    }
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {},
      create: blog
    });
  }

  console.log("Seed complete. Admin login: admin@quire.dev / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });