import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import path from "path";
import { checkAuthFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!checkAuthFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 10 MB" }, { status: 400 });
    }

    // Sanitize filename
    const originalName = file.name || "image.jpg";
    const ext = path.extname(originalName).toLowerCase() || ".jpg";
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
    const filename = `${Date.now()}-${baseName}${ext}`;

    // Upload to Vercel Blob
    const blob = await put(`blog/${filename}`, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: filename,
    });
  } catch (err) {
    console.error("Image upload error:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage || "Upload failed" }, { status: 500 });
  }
}
