import { NextResponse } from "next/server";
import { getAllPosts, getPublishedPosts, createPost } from "@/lib/blog";
import { checkAuthFromRequest } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const admin = url.searchParams.get("admin") === "true";
  const limit = parseInt(url.searchParams.get("limit") ?? "100");

  if (admin) {
    if (!checkAuthFromRequest(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const posts = (await getAllPosts()).slice(0, limit);
    return NextResponse.json({ posts });
  }

  const posts = (await getPublishedPosts()).slice(0, limit);
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  if (!checkAuthFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, excerpt, content, coverImage, images, tags, author, published } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const post = await createPost({
      title: title.trim(),
      excerpt: excerpt?.trim() ?? content.slice(0, 160) + "...",
      content: content.trim(),
      coverImage: coverImage ?? "",
      images: images ?? [],
      tags: tags ?? [],
      author: author ?? "Admin",
      published: published ?? false,
      publishedAt: published ? new Date().toISOString() : null,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error("Create post error:", err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
