"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, FileText, PlusCircle, LogOut, Edit, Trash2,
  Eye, EyeOff, Calendar, BarChart2, CheckCircle, Clock, X,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function AdminShell({ children, activePath }: { children: React.ReactNode; activePath: string }) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const nav = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "All Posts", href: "/admin/dashboard#posts", icon: FileText },
    { label: "New Post", href: "/admin/new", icon: PlusCircle },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a100d]">
      {/* Sidebar */}
      <aside className="w-[240px] flex-shrink-0 bg-[#0d1611] border-r border-white/6 flex flex-col hidden md:flex">
        {/* Brand */}
        <div className="p-6 border-b border-white/6">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="relative w-9 h-9 bg-white/90 rounded-lg p-1 shadow flex-shrink-0">
              <Image src="/logo.png" alt="Claim Source" fill className="object-contain" />
            </div>
            <div>
              <div className="text-white font-serif text-sm font-bold">Claim Source</div>
              <div className="text-white/35 text-[9px] uppercase tracking-widest font-semibold">Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ label, href, icon: Icon }) => {
            const isActive = activePath === href || (href !== "/admin/dashboard" && activePath.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-200 focus:outline-none ${
                  isActive
                    ? "bg-[#3A4F41]/50 text-[#8AAF93] border border-[#3A4F41]/40"
                    : "text-white/45 hover:text-white/80 hover:bg-white/4"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/6 space-y-2">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest text-white/35 hover:text-white/60 hover:bg-white/4 transition-all">
            <Eye className="w-4 h-4" />
            View Site
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest text-red-400/60 hover:text-red-400 hover:bg-red-900/10 transition-all focus:outline-none"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-5 py-4 bg-[#0d1611] border-b border-white/6">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="relative w-8 h-8 bg-white/90 rounded-md p-0.5 shadow">
              <Image src="/logo.png" alt="Claim Source" fill className="object-contain" />
            </div>
            <span className="text-white font-serif text-sm font-bold">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/admin/new" className="text-xs uppercase tracking-widest font-bold text-[#8AAF93] flex items-center gap-1.5">
              <PlusCircle className="w-3.5 h-3.5" /> New
            </Link>
            <button onClick={logout} className="text-red-400/60 hover:text-red-400 transition-colors focus:outline-none">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// --- Confirm Delete Modal ---
function ConfirmModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#111a14] border border-white/10 rounded-xl p-8 max-w-sm w-full shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-red-900/20 border border-red-700/30 flex items-center justify-center mx-auto mb-5">
          <Trash2 className="w-5 h-5 text-red-400" />
        </div>
        <h3 className="font-serif text-xl font-bold text-white text-center mb-2">Delete Post?</h3>
        <p className="text-white/50 text-sm text-center mb-8 leading-relaxed">
          &ldquo;{title}&rdquo; will be permanently deleted and cannot be recovered.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-lg border border-white/10 text-white/60 text-xs uppercase tracking-widest font-bold hover:bg-white/5 transition-colors focus:outline-none">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs uppercase tracking-widest font-bold transition-colors focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Dashboard Component ---
export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blog?admin=true");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch {
      showToast("Failed to load posts", "error");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // Check auth first
    fetch("/api/admin/auth").then((r) => r.json()).then((d) => {
      if (!d.authenticated) router.push("/admin/login");
      else loadPosts();
    }).catch(() => router.push("/admin/login"));
  }, [router, loadPosts]);

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      if (res.ok) {
        showToast(post.published ? "Post set to draft" : "Post published!");
        loadPosts();
      }
    } catch {
      showToast("Failed to update post", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/blog/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Post deleted");
        setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      } else {
        showToast("Delete failed", "error");
      }
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;

  return (
    <AdminShell activePath="/admin/dashboard">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl text-sm font-semibold transition-all ${
          toast.type === "success"
            ? "bg-[#0d1f12] border-[#3A4F41]/60 text-[#8AAF93]"
            : "bg-[#1f0d0d] border-red-700/40 text-red-300"
        }`}>
          {toast.type === "success" ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="p-6 md:p-10">
        {/* Page header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-white font-serif text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="text-white/35 text-xs mt-1">Manage your blog posts and content</p>
          </div>
          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 bg-[#3A4F41] hover:bg-[#4a6152] text-white text-xs uppercase tracking-widest font-bold px-5 py-3 rounded-lg transition-colors focus:outline-none shadow-lg"
          >
            <PlusCircle className="w-4 h-4" />
            New Post
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Posts", value: posts.length, icon: FileText, color: "text-white" },
            { label: "Published", value: published, icon: CheckCircle, color: "text-emerald-400" },
            { label: "Drafts", value: drafts, icon: Clock, color: "text-amber-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0d1611] border border-white/7 rounded-xl p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-serif text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-white/35 text-[10px] uppercase tracking-widest font-semibold mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Posts list */}
        <div id="posts">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white/70 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <BarChart2 className="w-4 h-4" /> All Posts
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-white/10 border-t-[#3A4F41] rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24 bg-[#0d1611] border border-white/6 rounded-xl">
              <FileText className="w-10 h-10 text-white/15 mx-auto mb-4" />
              <p className="text-white/40 text-sm mb-5">No posts yet. Create your first post!</p>
              <Link href="/admin/new" className="inline-flex items-center gap-2 bg-[#3A4F41] hover:bg-[#4a6152] text-white text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-lg transition-colors focus:outline-none">
                <PlusCircle className="w-4 h-4" /> Create Post
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-[#0d1611] border border-white/6 rounded-xl overflow-hidden hover:border-white/12 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 p-4 md:p-5">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-[#111a14] flex-shrink-0 border border-white/6">
                      {post.coverImage ? (
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="80px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-serif text-2xl text-white/15 font-bold">{post.title[0]}</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[9px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full border ${
                          post.published
                            ? "bg-emerald-900/30 border-emerald-700/40 text-emerald-400"
                            : "bg-amber-900/20 border-amber-700/30 text-amber-400"
                        }`}>
                          {post.published ? "Published" : "Draft"}
                        </span>
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-white text-sm font-serif font-bold leading-snug truncate">
                        {post.title}
                      </h3>
                      <p className="text-white/30 text-xs mt-1 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        {post.excerpt && <span className="truncate hidden md:inline ml-2 text-white/20">{post.excerpt.slice(0, 60)}…</span>}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Toggle publish */}
                      <button
                        onClick={() => handleTogglePublish(post)}
                        title={post.published ? "Set to draft" : "Publish"}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200 focus:outline-none ${
                          post.published
                            ? "bg-amber-900/20 border-amber-700/30 text-amber-400 hover:bg-amber-900/40"
                            : "bg-emerald-900/20 border-emerald-700/30 text-emerald-400 hover:bg-emerald-900/40"
                        }`}
                      >
                        {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>

                      {/* Edit */}
                      <Link
                        href={`/admin/edit/${post.id}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/4 border border-white/8 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-200 focus:outline-none"
                        title="Edit post"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => setDeleteTarget(post)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/4 border border-white/8 text-white/50 hover:text-red-400 hover:bg-red-900/20 hover:border-red-700/30 transition-all duration-200 focus:outline-none"
                        title="Delete post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* View on site */}
                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/4 border border-white/8 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-200 focus:outline-none"
                          title="View on site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
