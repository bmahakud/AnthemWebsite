import type { Metadata } from "next";
import { Suspense } from "react";
import BlogPageClient from "./BlogPageClient";
import { getAllBlogPostsServer } from "@/lib/blog-data";

const SITE_URL = "https://anthemgt.com";

export const metadata: Metadata = {
  title: "Blog | Anthem Global — AI & Technology Insights",
  description:
    "Explore Anthem Global's blog for expert insights on Artificial Intelligence, Machine Learning, Blockchain, Data Analytics, FinTech, and modern software development.",
  keywords:
    "Anthem Global blog, AI insights, machine learning, blockchain, data analytics, fintech, software development, technology trends",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    title: "Blog | Anthem Global",
    description:
      "Expert insights on AI, Machine Learning, Blockchain, and Software Development from the Anthem Global team.",
    url: `${SITE_URL}/blog`,
    siteName: "Anthem Global Blog",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Anthem Global Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Anthem Global",
    description:
      "Expert insights on AI, Machine Learning, Blockchain, and Software Development.",
    images: [`${SITE_URL}/logo.png`],
    site: "@AnthemGlobal",
  },
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
};

export default async function BlogPage() {
  const posts = await getAllBlogPostsServer();

  // Blog listing JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Anthem Global Blog",
    description:
      "Expert insights on AI, Machine Learning, Blockchain, Data Analytics, and Software Development.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Anthem Global",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      image: post.image,
      datePublished: post.date ? new Date(post.date).toISOString() : undefined,
      keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
      articleSection: post.category,
      author: {
        "@type": "Person",
        name: post.author?.name ?? "Anthem Global Team",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        </div>
      }>
        <BlogPageClient initialPosts={posts} blogBase="/blog" />
      </Suspense>
    </>
  );
}
