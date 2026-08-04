"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { BlogPost } from "@/lib/blog";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/api/blog?limit=3")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || posts.length === 0) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from(".blog-card", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, posts.length]);

  // Don't render section if no posts
  if (!loading && posts.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 border-b border-brand-border relative overflow-hidden bg-brand-bg"
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-accent/4 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-3">
              Latest Insights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text leading-tight">
              From Our Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-accent hover:text-brand-accent-hover transition-colors"
          >
            View All Posts
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full scroll-line-h mb-12 opacity-60" />

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-brand-card border border-brand-border rounded-sm overflow-hidden animate-pulse">
                <div className="h-[200px] bg-brand-border/50" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-brand-border/50 rounded w-1/3" />
                  <div className="h-4 bg-brand-border/50 rounded w-3/4" />
                  <div className="h-3 bg-brand-border/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, idx) => (
              <article
                key={post.id}
                className={`blog-card group flex flex-col bg-brand-card border border-brand-border rounded-sm overflow-hidden hover:border-brand-accent/40 transition-all duration-500 premium-card ${
                  idx === 0 ? "md:col-span-2" : ""
                }`}
              >
                {/* Cover */}
                <div className={`relative overflow-hidden bg-brand-bg flex-shrink-0 ${idx === 0 ? "h-[240px] md:h-[300px]" : "h-[180px]"}`}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-accent/15 via-brand-card to-brand-bg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-brand-accent/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card/70 to-transparent" />
                  {post.tags[0] && (
                    <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest font-bold bg-brand-accent text-white px-3 py-1 rounded-full shadow">
                      {post.tags[0]}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {post.publishedAt && (
                    <div className="flex items-center gap-2 text-[10px] text-brand-muted uppercase tracking-widest font-semibold mb-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  )}
                  <h3 className={`font-serif font-bold text-brand-text leading-snug mb-3 group-hover:text-brand-accent transition-colors duration-300 ${idx === 0 ? "text-xl md:text-2xl" : "text-lg"}`}>
                    {post.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-muted leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/link inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-brand-accent hover:text-brand-accent-hover transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
