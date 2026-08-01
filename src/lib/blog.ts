import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images: string[];
  tags: string[];
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "blog-posts.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
}

export function getAllPosts(): BlogPost[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime());
}

export function getPostById(id: string): BlogPost | null {
  return getAllPosts().find((p) => p.id === id) ?? null;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function createPost(data: Omit<BlogPost, "id" | "slug" | "createdAt" | "updatedAt">): BlogPost {
  const posts = getAllPosts();
  const slug = slugify(data.title) + "-" + Date.now();
  const now = new Date().toISOString();
  const post: BlogPost = {
    ...data,
    id: randomUUID(),
    slug,
    createdAt: now,
    updatedAt: now,
    publishedAt: data.published ? (data.publishedAt ?? now) : null,
  };
  posts.unshift(post);
  savePosts(posts);
  return post;
}

export function updatePost(id: string, data: Partial<BlogPost>): BlogPost | null {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const existing = posts[idx];
  const now = new Date().toISOString();
  const updated: BlogPost = {
    ...existing,
    ...data,
    id: existing.id,
    slug: data.title ? slugify(data.title) + "-" + existing.id.slice(0, 6) : existing.slug,
    updatedAt: now,
    publishedAt: data.published && !existing.publishedAt ? now : (data.publishedAt ?? existing.publishedAt),
  };
  posts[idx] = updated;
  savePosts(posts);
  return updated;
}

export function deletePost(id: string): boolean {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  posts.splice(idx, 1);
  savePosts(posts);
  return true;
}

function savePosts(posts: BlogPost[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), "utf8");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
