export type BlogCardData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage: string | null;
  readingTimeMins: number;
  publishedAt: Date | null;
  author: { name: string };
  category: { name: string; slug: string; colorTag: string | null };
};

export const CATEGORY_COLOR_MAP: Record<string, { bg: string; text: string; from: string; to: string }> = {
  blue: { bg: "#E6F1FB", text: "#0C447C", from: "#DCEBFB", to: "#B5D4F4" },
  purple: { bg: "#EEEDFE", text: "#26215C", from: "#E6E4FD", to: "#C9C5FA" },
  teal: { bg: "#E1F5EE", text: "#085041", from: "#D5F2E7", to: "#A9E4CC" },
  amber: { bg: "#FAEEDA", text: "#412402", from: "#F9E8C8", to: "#F0CE8E" },
  coral: { bg: "#FAECE7", text: "#4A1B0C", from: "#F9E1D8", to: "#F1BEA8" },
  pink: { bg: "#FBEAF0", text: "#4B1528", from: "#FADEE9", to: "#F2B9D0" }
};

export const CATEGORY_ICON_MAP: Record<string, string> = {
  blue: "cpu",
  purple: "sparkles",
  teal: "code-2",
  amber: "shield-check",
  coral: "briefcase",
  pink: "zap"
};