import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Tag, ArrowRight } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found | Claim Source" };
  return {
    title: `${post.title} | Claim Source Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const allPosts = getPublishedPosts();
  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Render content with basic paragraph support
  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Back link */}
      <div className="pt-28 pb-6 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-muted hover:text-brand-accent transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Blog
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold bg-brand-accent-light text-brand-accent border border-brand-accent/20 px-3 py-1 rounded-full">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.08] mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-6 text-xs text-brand-muted uppercase tracking-widest font-semibold border-b border-brand-border pb-6 mb-10">
          {post.publishedAt && (
            <span className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          )}
          <span>By {post.author}</span>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-sm mb-12 border border-brand-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Excerpt */}
        <p className="text-lg md:text-xl text-brand-muted leading-relaxed font-light italic border-l-4 border-brand-accent pl-6 mb-10">
          {post.excerpt}
        </p>

        {/* Body content */}
        <div className="prose-custom space-y-6">
          {paragraphs.map((para, idx) => {
            // Detect headings (## or #)
            if (para.startsWith("## ")) {
              return (
                <h2 key={idx} className="font-serif text-2xl md:text-3xl font-bold text-brand-text pt-4">
                  {para.replace(/^## /, "")}
                </h2>
              );
            }
            if (para.startsWith("# ")) {
              return (
                <h1 key={idx} className="font-serif text-3xl md:text-4xl font-bold text-brand-text pt-4">
                  {para.replace(/^# /, "")}
                </h1>
              );
            }
            // Bullet list
            if (para.startsWith("- ")) {
              const items = para.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={idx} className="space-y-2 list-none">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-brand-muted text-base leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                      {item.replace(/^- /, "")}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-base md:text-lg text-brand-muted leading-relaxed">
                {para}
              </p>
            );
          })}
        </div>

        {/* Additional images */}
        {post.images.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {post.images.map((img, idx) => (
              <div key={idx} className="relative h-[220px] overflow-hidden rounded-sm border border-brand-border">
                <Image src={img} alt={`${post.title} image ${idx + 1}`} fill className="object-cover" sizes="400px" />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 p-8 md:p-10 bg-gradient-to-br from-brand-accent to-[#2E3E33] rounded-sm text-white text-center">
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">Think you have a claim?</h3>
          <p className="text-white/70 text-sm mb-6">Take our free two-minute eligibility check.</p>
          <Link
            href="/#campaign-selector"
            className="inline-flex items-center gap-2 bg-white text-brand-accent text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded-sm hover:bg-brand-accent-light transition-colors"
          >
            Start Free Assessment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="border-t border-brand-border py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-serif text-2xl font-bold text-brand-text mb-10">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group block bg-brand-card border border-brand-border rounded-sm overflow-hidden hover:border-brand-accent/40 transition-all duration-300 premium-card">
                  <div className="relative h-[160px] overflow-hidden bg-brand-bg">
                    {p.coverImage ? (
                      <Image src={p.coverImage} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="400px" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-accent/15 to-brand-card flex items-center justify-center">
                        <span className="font-serif text-3xl text-brand-accent/30 font-bold">{p.title[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-bold text-brand-text leading-snug group-hover:text-brand-accent transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
