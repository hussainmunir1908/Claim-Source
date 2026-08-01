"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Upload, X, ImagePlus, Eye, EyeOff,
  Tag, Send, Save, CheckCircle, AlertCircle, Loader2,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [postId, setPostId] = useState<string>("");
  const [form, setForm] = useState<Partial<BlogPost> | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadingExtra, setUploadingExtra] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [preview, setPreview] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const extraInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    params.then(({ id }) => {
      setPostId(id);
      // Load post
      fetch(`/api/blog/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (!data.post) { router.push("/admin/dashboard"); return; }
          const post = data.post as BlogPost;
          setForm({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            images: post.images,
            tags: post.tags,
            published: post.published,
          });
          if (post.coverImage) setCoverPreview(post.coverImage);
          if (post.images?.length) setImagePreviews(post.images);
        })
        .catch(() => router.push("/admin/dashboard"))
        .finally(() => setLoading(false));
    });
  }, [params, router]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch("/api/blog/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      return data.url as string;
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Upload failed", "error");
      return null;
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !form) return;
    setUploading(true);
    setCoverPreview(URL.createObjectURL(file));
    const url = await uploadImage(file);
    if (url) setForm((f) => ({ ...f, coverImage: url }));
    else setCoverPreview(form.coverImage ?? "");
    setUploading(false);
    e.target.value = "";
  };

  const handleExtraImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length || !form) return;
    setUploadingExtra(true);
    const localPreviews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...localPreviews]);
    const urls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }
    setForm((f) => ({ ...f, images: [...(f?.images ?? []), ...urls] }));
    setUploadingExtra(false);
    e.target.value = "";
  };

  const removeExtraImage = (idx: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
    setForm((f) => ({ ...f, images: (f?.images ?? []).filter((_, i) => i !== idx) }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form?.tags?.includes(tag)) setForm((f) => ({ ...f, tags: [...(f?.tags ?? []), tag] }));
    setTagInput("");
  };

  const removeTag = (tag: string) => setForm((f) => ({ ...f, tags: (f?.tags ?? []).filter((t) => t !== tag) }));

  const handleSave = async (publish: boolean) => {
    if (!form?.title?.trim() || !form?.content?.trim()) {
      showToast("Title and content are required", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, published: publish, author: "Admin" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      showToast(publish ? "Post published!" : "Draft saved!");
      setTimeout(() => router.push("/admin/dashboard"), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a100d] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3A4F41] animate-spin" />
      </div>
    );
  }

  if (!form) return null;

  return (
    <div className="min-h-screen bg-[#0a100d]">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl text-sm font-semibold ${
          toast.type === "success" ? "bg-[#0d1f12] border-[#3A4F41]/60 text-[#8AAF93]" : "bg-[#1f0d0d] border-red-700/40 text-red-300"
        }`}>
          {toast.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      <div className="sticky top-0 z-30 bg-[#0d1611] border-b border-white/6 px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-white/40 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-white font-serif text-base font-bold">Edit Post</h1>
            <p className="text-white/30 text-[10px] uppercase tracking-widest truncate max-w-[200px]">{form.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setPreview(!preview)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold uppercase tracking-widest transition-all focus:outline-none ${preview ? "bg-[#3A4F41]/40 border-[#3A4F41]/60 text-[#8AAF93]" : "border-white/10 text-white/40 hover:text-white/70 hover:bg-white/4"}`}>
            {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {preview ? "Edit" : "Preview"}
          </button>
          <button disabled={saving} onClick={() => handleSave(false)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 text-xs font-semibold uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all focus:outline-none disabled:opacity-40">
            <Save className="w-3.5 h-3.5" /> Draft
          </button>
          <button disabled={saving || !form.title || !form.content} onClick={() => handleSave(true)} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#3A4F41] hover:bg-[#4a6152] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none shadow-lg">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            Publish
          </button>
        </div>
      </div>

      {/* Reuse same body layout */}
      <div className={`max-w-7xl mx-auto px-5 md:px-8 py-8 ${preview ? "" : "grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8"}`}>
        {preview ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#0d1611] border border-white/8 rounded-xl overflow-hidden p-8">
              {form.tags && form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {form.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest font-bold bg-[#3A4F41]/40 text-[#8AAF93] border border-[#3A4F41]/40 px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              )}
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">{form.title || "Post Title"}</h1>
              {form.excerpt && <p className="text-white/50 text-sm italic mb-6 border-l-2 border-[#3A4F41] pl-4">{form.excerpt}</p>}
              <div className="space-y-4">
                {(form.content || "").split(/\n\n+/).map((para, i) => (
                  <p key={i} className="text-white/65 text-sm leading-relaxed">{para.replace(/^[#]+\s/, "")}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-white/40 mb-2">Post Title *</label>
                <input type="text" value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Write a compelling headline…" className="w-full bg-[#0d1611] border border-white/8 rounded-xl px-5 py-4 text-white text-lg font-serif font-bold placeholder-white/15 focus:outline-none focus:border-[#3A4F41]/60 transition-all" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-white/40 mb-2">Excerpt</label>
                <textarea value={form.excerpt ?? ""} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} placeholder="Brief description…" rows={2} className="w-full bg-[#0d1611] border border-white/8 rounded-xl px-5 py-4 text-white text-sm placeholder-white/15 focus:outline-none focus:border-[#3A4F41]/60 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-white/40 mb-2">Content *</label>
                <textarea value={form.content ?? ""} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={20} className="w-full bg-[#0d1611] border border-white/8 rounded-xl px-5 py-4 text-white text-sm leading-relaxed placeholder-white/15 focus:outline-none focus:border-[#3A4F41]/60 transition-all resize-y font-mono" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-white/40">Additional Images</label>
                  <button type="button" onClick={() => extraInputRef.current?.click()} disabled={uploadingExtra} className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-[#8AAF93] hover:text-white transition-colors disabled:opacity-40 focus:outline-none">
                    {uploadingExtra ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />} Add Images
                  </button>
                  <input ref={extraInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleExtraImages} />
                </div>
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-white/8 bg-[#111a14]">
                        <Image src={src} alt="" fill className="object-cover" sizes="120px" unoptimized />
                        <button onClick={() => removeExtraImage(idx)} className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#0d1611] border border-white/8 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/6">
                  <h3 className="text-white/60 text-[11px] uppercase tracking-[0.2em] font-semibold">Cover Image</h3>
                </div>
                <div className="p-5">
                  <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                  {coverPreview ? (
                    <div className="relative">
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/8">
                        <Image src={coverPreview} alt="Cover" fill className="object-cover" sizes="360px" unoptimized />
                      </div>
                      <button onClick={() => { setCoverPreview(""); setForm((f) => ({ ...f, coverImage: "" })); }} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-600 transition-colors focus:outline-none shadow-lg">
                        <X className="w-3 h-3" />
                      </button>
                      {uploading && <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center"><Loader2 className="w-6 h-6 text-white animate-spin" /></div>}
                      <button type="button" onClick={() => coverInputRef.current?.click()} className="mt-3 w-full py-2 rounded-lg border border-white/8 text-white/40 text-xs hover:bg-white/5 hover:text-white transition-all focus:outline-none text-center">
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => coverInputRef.current?.click()} disabled={uploading} className="w-full aspect-video bg-[#111a14] border-2 border-dashed border-white/8 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-[#3A4F41]/60 hover:bg-[#0d1f12] transition-all disabled:opacity-40 focus:outline-none group">
                      <Upload className="w-6 h-6 text-white/25 group-hover:text-[#8AAF93] transition-colors" />
                      <span className="text-[11px] uppercase tracking-widest font-semibold text-white/25 group-hover:text-white/50 transition-colors">Choose from Device</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-[#0d1611] border border-white/8 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/6">
                  <h3 className="text-white/60 text-[11px] uppercase tracking-[0.2em] font-semibold">Tags</h3>
                </div>
                <div className="p-5">
                  <div className="flex gap-2 mb-3">
                    <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }} placeholder="Add a tag…" className="flex-1 bg-white/5 border border-white/8 rounded-lg px-3 py-2 text-white text-xs placeholder-white/20 focus:outline-none focus:border-[#3A4F41]/60 transition-all" />
                    <button onClick={addTag} disabled={!tagInput.trim()} className="px-3 py-2 bg-[#3A4F41]/30 border border-[#3A4F41]/40 rounded-lg text-[#8AAF93] text-xs font-bold hover:bg-[#3A4F41]/50 disabled:opacity-30 transition-colors focus:outline-none"><Tag className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(form.tags ?? []).map((tag) => (
                      <span key={tag} className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold bg-[#3A4F41]/25 border border-[#3A4F41]/30 text-[#8AAF93] px-2.5 py-1 rounded-full">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-white transition-colors focus:outline-none"><X className="w-2.5 h-2.5" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#0d1611] border border-white/8 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/6">
                  <h3 className="text-white/60 text-[11px] uppercase tracking-[0.2em] font-semibold">Visibility</h3>
                </div>
                <div className="p-5 space-y-3">
                  <button onClick={() => handleSave(true)} disabled={saving || !form.title || !form.content} className="w-full flex items-center justify-center gap-2 bg-[#3A4F41] hover:bg-[#4a6152] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg transition-colors focus:outline-none shadow">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Publish
                  </button>
                  <button onClick={() => handleSave(false)} disabled={saving || !form.title || !form.content} className="w-full flex items-center justify-center gap-2 border border-white/10 text-white/50 text-xs font-semibold uppercase tracking-widest py-3 rounded-lg hover:bg-white/5 hover:text-white disabled:opacity-40 transition-all focus:outline-none">
                    <Save className="w-4 h-4" /> Save Draft
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
