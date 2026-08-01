import { put, list } from "@vercel/blob";
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

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const { blobs } = await list({ prefix: "blog-posts.json" });
    if (blobs.length > 0) {
      // Append timestamp to bypass Vercel Blob CDN caching
      const res = await fetch(blobs[0].url + "?t=" + Date.now(), { cache: "no-store" });
      if (res.ok) {
        return (await res.json()) as BlogPost[];
      }
    }
  } catch (err) {
    console.error("Failed to load blog posts:", err);
  }
  return [];
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime());
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.id === id) ?? null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function createPost(data: Omit<BlogPost, "id" | "slug" | "createdAt" | "updatedAt">): Promise<BlogPost> {
  const posts = await getAllPosts();
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
  await savePosts(posts);
  return post;
}

export async function updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  const posts = await getAllPosts();
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
  await savePosts(posts);
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  posts.splice(idx, 1);
  await savePosts(posts);
  return true;
}

async function savePosts(posts: BlogPost[]) {
  await put("blog-posts.json", JSON.stringify(posts, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
