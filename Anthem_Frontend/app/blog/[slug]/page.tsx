// Server Component — handles all SEO metadata
import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchBlogBySlug } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";

const SITE_URL = "https://anthemgt.com";
const SITE_NAME = "Anthem Global";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

interface PageProps {
  params: { slug: string };
}

/* ======================================================
   generateMetadata — runs server-side before page renders.
   Google reads ALL of these tags for SEO.
====================================================== */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await fetchBlogBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Anthem Global",
      description: "The requested blog post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = post.title ? `${post.title} | ${SITE_NAME} Blog` : `${SITE_NAME} Blog`;
  const description = post.excerpt ?? `Read ${post.title} on the Anthem Global blog.`;
  const canonicalUrl = `${SITE_URL}/blog/${params.slug}`;
  const ogImage = post.image || DEFAULT_IMAGE;

  // Build keywords from tags + category
  const keywordsList: string[] = [];
  if (post.category) keywordsList.push(post.category);
  if (Array.isArray(post.tags)) keywordsList.push(...post.tags);
  // Add brand keywords
  keywordsList.push("Anthem Global", "AI technology", "software development");
  const keywords = [...new Set(keywordsList)].join(", ");

  // ISO date string for structured data
  const publishedDate =
    post.date
      ? new Date(post.date).toISOString()
      : new Date().toISOString();

  return {
    // ── Basic Meta ──
    title,
    description,
    keywords,

    // ── Canonical URL ──
    alternates: {
      canonical: canonicalUrl,
    },

    // ── Open Graph (Facebook, WhatsApp, LinkedIn previews) ──
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title ?? SITE_NAME,
        },
      ],
      // Article-specific OG properties
      publishedTime: publishedDate,
      authors: post.author?.name ? [post.author.name] : [SITE_NAME],
      tags: Array.isArray(post.tags) ? post.tags : [],
      section: post.category,
    },

    // ── Twitter Card ──
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: "@AnthemGlobal",
      creator: "@AnthemGlobal",
    },

    // ── Robots ──
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ── Author ──
    authors: post.author?.name
      ? [{ name: post.author.name, url: SITE_URL }]
      : [{ name: SITE_NAME, url: SITE_URL }],

    // ── Category ──
    category: post.category,
  };
}

/* ======================================================
   generateStaticParams — tells Next.js which slugs to
   pre-render at build time (improves crawlability).
====================================================== */
export async function generateStaticParams() {
  try {
    const res = await fetch(`${SITE_URL}/api/blogs/`, {
      next: { revalidate: 3600 }, // re-check every hour
    });
    if (!res.ok) return [];
    const data = await res.json();
    const blogs = Array.isArray(data) ? data : data?.results ?? [];
    return blogs
      .filter((b: any) => typeof b?.slug === "string" && b.slug)
      .map((b: any) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

/* ======================================================
   Page Component — renders the interactive client UI.
   JSON-LD structured data is injected here server-side.
====================================================== */
export default async function BlogPostPage({ params }: PageProps) {
  // Pre-fetch for JSON-LD (client re-fetches interactively too)
  const post = await fetchBlogBySlug(params.slug);

  const canonicalUrl = `${SITE_URL}/blog/${params.slug}`;
  const publishedDate = post?.date
    ? new Date(post.date).toISOString()
    : new Date().toISOString();

  // JSON-LD Article Schema for Google Rich Results
  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: post.image || DEFAULT_IMAGE,
        datePublished: publishedDate,
        dateModified: publishedDate,
        author: {
          "@type": "Person",
          name: post.author?.name ?? SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
        articleSection: post.category ?? "",
        url: canonicalUrl,
        inLanguage: "en-US",
        isPartOf: {
          "@type": "Blog",
          name: `${SITE_NAME} Blog`,
          url: `${SITE_URL}/blog`,
        },
      }
    : null;

  return (
    <>
      {/* Inject JSON-LD structured data into <head> server-side */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* The interactive client component */}
      <Suspense fallback={
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-background">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading article…</p>
        </div>
      }>
        <BlogPostClient />
      </Suspense>
    </>
  );
}