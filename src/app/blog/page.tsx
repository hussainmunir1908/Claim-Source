import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Claim Source",
  description: "Read insights, guides, and updates about housing disrepair and personal injury claims in the UK from the Claim Source team.",
};

export const dynamic = "force-dynamic";

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-card/40 to-brand-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-accent/6 blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
            Insights & Guides
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-text leading-[1.08] mb-6 max-w-3xl">
            The Claim Source Blog
          </h1>
          <p className="text-base md:text-lg text-brand-muted max-w-xl leading-relaxed">
            Expert insights on housing disrepair, personal injury, and your rights as a UK resident.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {posts.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-16 h-16 rounded-full bg-brand-card border border-brand-border flex items-center justify-center mx-auto mb-6">
                <Tag className="w-6 h-6 text-brand-muted" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-brand-text mb-3">No posts yet</h2>
              <p className="text-brand-muted text-sm">Check back soon for insights and guides.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <article
                  key={post.id}
                  className={`group flex flex-col bg-brand-card border border-brand-border rounded-sm overflow-hidden hover:border-brand-accent/40 transition-all duration-500 premium-card ${
                    idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Cover image */}
                  <div className={`relative overflow-hidden bg-brand-bg flex-shrink-0 ${idx === 0 ? "h-[300px] md:h-[400px]" : "h-[220px]"}`}>
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-accent/20 to-brand-card flex items-center justify-center">
                        <span className="font-serif text-4xl text-brand-accent/30 font-bold">{post.title[0]}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card/80 to-transparent" />
                    {/* Tags overlay */}
                    {post.tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest font-bold bg-brand-accent text-white px-3 py-1 rounded-full shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-xs text-brand-muted uppercase tracking-widest font-semibold mb-3">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </div>
                    )}
                    <h2 className={`font-serif font-bold text-brand-text leading-snug mb-3 group-hover:text-brand-accent transition-colors duration-300 ${idx === 0 ? "text-2xl md:text-3xl" : "text-xl"}`}>
                      {post.title}
                    </h2>
                    <p className="text-sm text-brand-muted leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/link inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-accent hover:text-brand-accent-hover transition-colors"
                    >
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
