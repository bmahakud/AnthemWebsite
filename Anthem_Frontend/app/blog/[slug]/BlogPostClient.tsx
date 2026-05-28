"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Check,
  Copy,
  BookOpen,
  ArrowRight,
  Twitter,
  Linkedin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  subscribeBlogUpdates,
  PublicBlogPost,
  fetchBlogBySlug,
  fetchPublicBlogsClient,
} from "@/lib/blog-data";

const imagePositionClass = (pos?: PublicBlogPost["imagePosition"]) => {
  if (pos === "left") return "object-left";
  if (pos === "right") return "object-right";
  return "object-center";
};

export default function BlogPostClient() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const blogBase = pathname?.startsWith("/blogs") ? "/blogs" : "/blog";

  const slug = typeof params?.slug === "string" ? params.slug : null;

  const [post, setPost] = useState<PublicBlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PublicBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareStatus, setShareStatus] = useState<"idle" | "shared" | "copied">("idle");
  const [readingProgress, setReadingProgress] = useState(0);
  // Counter for alternating image float direction
  const imgCounter = useRef(0);

  /* Reading progress bar */
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setReadingProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Load blog post */
  useEffect(() => {
    if (!slug) return;
    imgCounter.current = 0;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const current = await fetchBlogBySlug(slug);
      if (cancelled) return;
      if (!current) {
        setPost(null);
        setRelatedPosts([]);
        setLoading(false);
        return;
      }
      setPost(current);
      const blogs = (await fetchPublicBlogsClient()).filter(
        (b): b is PublicBlogPost => Boolean(b?.slug)
      );
      if (cancelled) return;
      setRelatedPosts(
        blogs
          .filter((b) => b.slug !== current.slug && b.category === current.category)
          .slice(0, 3)
      );
      setLoading(false);
    };
    void load();
    const unsub = subscribeBlogUpdates(() => void load());
    return () => { cancelled = true; unsub?.(); };
  }, [slug]);

  const onShare = async () => {
    if (!post) return;
    const url = window.location.href;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as any).share({ title: post.title || "", text: post.excerpt || "", url });
        setShareStatus("shared");
        window.setTimeout(() => setShareStatus("idle"), 2000);
        return;
      } catch { }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      alert("Please copy the URL from the address bar.");
    }
  };

  const shareOnTwitter = () => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title || "");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  /* Loading state */
  if (loading || !slug) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-background">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="size-6 text-primary/60" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading article…</p>
      </div>
    );
  }

  /* Not found */
  if (!post) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <div className="text-center space-y-4 px-6">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold">Article not found</h2>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push(blogBase)} className="mt-4">
            <ArrowLeft className="mr-2 size-4" /> Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const tags = post.tags ?? [];

  return (
    <div className="min-h-[100dvh] bg-background">

      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[100] h-1 bg-gradient-to-r from-primary to-blue-500 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      {/* ── Hero Banner ── */}
      <section className="relative w-full overflow-hidden">
        {post.image ? (
          <div className="absolute inset-0 z-0">
            <img
              src={post.image}
              alt=""
              className={`h-full w-full object-cover ${imagePositionClass(post.imagePosition)}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/90 via-blue-600/80 to-purple-700/80" />
        )}

        <div className="relative z-10 container max-w-6xl px-4 md:px-8 pt-24 md:pt-32 pb-14 md:pb-20">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href={blogBase}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors mb-8 group"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </motion.div>

          {/* ── Hero grid: title + excerpt LEFT | Article Info RIGHT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12 items-start">

            {/* LEFT — category, title, excerpt, author strip */}
            <div>
              {post.category && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white uppercase tracking-widest border border-white/20">
                    {post.category}
                  </span>
                </motion.div>
              )}

              {post.title && (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                  className="mb-4 md:mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-lg"
                >
                  {post.title}
                </motion.h1>
              )}

              {post.excerpt && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6 text-sm md:text-base text-white/80 leading-relaxed"
                >
                  {post.excerpt}
                </motion.p>
              )}

              {/* Author + date strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap items-center gap-4 md:gap-6"
              >
                {(post.author?.name || post.author?.avatar) && (
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border-2 border-white/40">
                      {post.author?.avatar && <AvatarImage src={post.author.avatar} />}
                      <AvatarFallback className="bg-primary text-white text-sm font-bold">
                        {post.author?.name?.[0] ?? "D"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      {post.author?.name && <p className="text-sm font-semibold text-white">{post.author.name}</p>}
                      {post.author?.role && <p className="text-xs text-white/60">{post.author.role}</p>}
                    </div>
                  </div>
                )}
                {post.date && (
                  <span className="flex items-center gap-1.5 text-sm text-white/70">
                    <Calendar className="size-4" />
                    {post.date}
                  </span>
                )}
                {typeof post.readingTime === "number" && (
                  <span className="flex items-center gap-1.5 text-sm text-white/70">
                    <Clock className="size-4" />
                    {post.readingTime} min read
                  </span>
                )}
              </motion.div>
            </div>

            {/* RIGHT — Article Info card (sits beside the title) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 space-y-4 text-white">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/70">Article Info</h3>
                {post.category && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Category</span>
                    <span className="font-medium text-primary-foreground bg-primary/70 rounded-full px-2.5 py-0.5 text-xs">{post.category}</span>
                  </div>
                )}
                {post.date && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Published</span>
                    <span className="font-medium">{post.date}</span>
                  </div>
                )}
                {typeof post.readingTime === "number" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Reading time</span>
                    <span className="font-medium">{post.readingTime} min</span>
                  </div>
                )}
                {tags.length > 0 && (
                  <div className="pt-3 border-t border-white/20">
                    <p className="text-xs text-white/50 mb-2 font-medium uppercase tracking-wider">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.slice(0, 6).map((t, i) => (
                        <span key={i} className="rounded-full bg-white/15 text-white/80 px-2.5 py-0.5 text-[11px]">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ── Main Content (full width, wider) ── */}
      <section className="container max-w-8xl px-4 md:px-8 py-8 md:py-12">

        {/* Article body — full width, max readable */}
        <motion.article
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Content card */}
          <div className="rounded-2xl border border-border/50 bg-card shadow-sm p-4 sm:p-8 md:p-12 mb-8">
            <div className="max-w-none text-foreground">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="mb-5 leading-[1.85] text-foreground/85 text-base text-justify" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2 clear-both" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="mt-7 mb-3 text-xl font-bold text-foreground clear-both" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="mt-5 mb-2 text-lg font-semibold text-foreground clear-both" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="mb-5 list-disc space-y-2 pl-5 sm:pl-6 text-foreground/85" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="mb-5 list-decimal space-y-2 pl-5 sm:pl-6 text-foreground/85" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="leading-relaxed text-justify" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="my-6 border-l-4 border-primary bg-primary/5 pl-5 pr-3 py-3 rounded-r-lg italic text-muted-foreground clear-both" {...props} />
                  ),
                  hr: () => <hr className="my-8 border-border/50 clear-both" />,
                  code: ({ node, inline, ...props }: { node?: any; inline?: boolean;[key: string]: any }) =>
                    inline ? (
                      <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-primary" {...props} />
                    ) : (
                      <code className="block overflow-x-auto rounded-xl bg-muted p-5 text-sm font-mono leading-relaxed" {...props} />
                    ),
                  img: ({ src, alt }: { src?: string; alt?: string }) => {
                    if (!src) return null;
                    imgCounter.current += 1;
                    const isRight = imgCounter.current % 2 === 1;
                    const hasCaption = alt && alt.trim() && alt !== src;
                    return (
                      <figure
                        className={`my-4 ${isRight
                            ? "float-right ml-6 mb-4 w-full sm:w-[45%]"
                            : "float-left mr-6 mb-4 w-full sm:w-[45%]"
                          }`}
                        style={{ clear: "none" }}
                      >
                        <div className="overflow-hidden rounded-xl border border-border/40 shadow-md">
                          <img
                            src={src}
                            alt={alt || ""}
                            className="w-full h-auto"
                            style={{ display: "block" }}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                          />
                        </div>
                        {hasCaption && (
                          <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
                            {alt}
                          </figcaption>
                        )}
                      </figure>
                    );
                  },
                }}
              >
                {((post as any).content || "")
                  .replace(/\r\n/g, "\n")
                  .replace(/\r/g, "\n")
                  .replace(/!\[([^\]]*)\]\s*\(([^)]*)\)/g, (match: string, alt: string, url: string) => {
                    const cleanUrl = url.trim().replace(/\s+/g, "%20");
                    return `![${alt.trim()}](${cleanUrl})`;
                  })
                }
              </ReactMarkdown>
              {/* Clear floats */}
              <div className="clear-both" />
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium mr-1">
                  <Tag className="size-4" /> Tags:
                </span>
                {tags.map((t, i) => (
                  <span key={i} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Share Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
            className="rounded-2xl border border-border/50 bg-card p-4 sm:p-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between mb-8"
          >
            <div>
              <p className="font-semibold text-sm">Found this helpful?</p>
              <p className="text-xs text-muted-foreground">Share it with your network</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={shareOnTwitter} className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 text-sky-600 hover:bg-sky-500 hover:text-white px-4 py-2 text-xs font-semibold transition-all duration-200">
                <Twitter className="size-3.5" /> Twitter
              </button>
              <button onClick={shareOnLinkedIn} className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 text-blue-700 hover:bg-blue-600 hover:text-white px-4 py-2 text-xs font-semibold transition-all duration-200">
                <Linkedin className="size-3.5" /> LinkedIn
              </button>
              <button onClick={onShare} className="inline-flex items-center gap-1.5 rounded-full bg-muted text-foreground hover:bg-primary hover:text-white px-4 py-2 text-xs font-semibold transition-all duration-200">
                {shareStatus === "copied" ? <><Check className="size-3.5" /> Copied!</> : shareStatus === "shared" ? <><Check className="size-3.5" /> Shared!</> : <><Copy className="size-3.5" /> Copy Link</>}
              </button>
            </div>
          </motion.div>

          {/* Author Card */}
          {(post.author?.name || post.author?.avatar) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
              className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-blue-50/30 p-6 flex items-center gap-5 mb-10"
            >
              <Avatar className="size-16 border-2 border-primary/20 shrink-0">
                {post.author?.avatar && <AvatarImage src={post.author.avatar} />}
                <AvatarFallback className="bg-primary text-white text-xl font-bold">
                  {post.author?.name?.[0] ?? "D"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Written by</p>
                <p className="font-bold text-lg leading-tight">{post.author.name ?? "Anthem Global Team"}</p>
                {post.author?.role && (
                  <span className="inline-block mt-1 rounded-full bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5">
                    {post.author.role}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </motion.article>

        {/* ── Related Posts — horizontal cards ── */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-6xl mx-auto border-t border-border/40 pt-10"
          >
            <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
              <BookOpen className="size-5 text-primary" /> Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((r) => (
                <Link key={r.slug} href={`${blogBase}/${r.slug}`}>
                  <motion.div whileHover={{ y: -4 }} className="group rounded-xl border border-border/50 bg-card overflow-hidden hover:shadow-md transition-all duration-200">
                    <div className="h-36 overflow-hidden bg-gradient-to-br from-primary/10 to-blue-500/10">
                      {r.image ? (
                        <img src={r.image} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={r.title ?? ""} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="size-8 text-primary/40" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors leading-snug mb-2">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href={blogBase} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                View all articles <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {relatedPosts.length === 0 && (
          <div className="max-w-6xl mx-auto border-t border-border/50 pt-10 text-center">
            <h3 className="text-xl font-bold mb-2">Explore More Articles</h3>
            <p className="text-muted-foreground mb-6 text-sm">Discover more insights on AI, technology, and business strategy.</p>
            <Link href={blogBase}>
              <Button size="lg" className="rounded-full h-12 px-8 group">
                Browse All Articles <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
