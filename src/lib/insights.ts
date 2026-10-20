import type { ComponentType } from "react";

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  cover?: string;
  readTime?: string;
  brand?: string;
  sources?: string[];
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  Component: ComponentType;
}

const modules = import.meta.glob<{ default: ComponentType; frontmatter: PostFrontmatter }>(
  "/content/insights/*.mdx",
  { eager: true }
);

/** All published posts, newest first. Drafts are visible only in `npm run dev`. */
export const posts: Post[] = Object.values(modules)
  .map((m) => ({ ...m.frontmatter, Component: m.default }))
  .filter((p) => !p.draft || import.meta.env.DEV)
  .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
