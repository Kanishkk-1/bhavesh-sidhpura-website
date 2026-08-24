import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain.replace(/\/$/, "");
  const now = new Date();

  const posts = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/sessions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/classes`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...posts,
  ];
}

