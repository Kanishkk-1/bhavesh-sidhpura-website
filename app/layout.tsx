import type { Metadata, Viewport } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EmberCursor } from "@/components/ui/EmberCursor";
import { Grain } from "@/components/ui/Grain";
import { JsonLd } from "@/components/seo/JsonLd";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Access Consciousness",
    "Access Bars",
    "Access Bars Pune",
    "Access Energetic Facelift",
    "Bars facilitator India",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name}, ${site.role}`,
    description: site.description,
    url: site.domain,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, ${site.role}`,
    description: site.description,
  },
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  publisher: site.name,
  category: "Wellbeing",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#14120e",
};

const base = site.domain.replace(/\/$/, "");
const socials = Object.values(site.social).filter(Boolean);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: `${base}/`,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${base}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${base}/#person`,
      name: site.name,
      jobTitle: site.role,
      description: site.description,
      url: `${base}/`,
      sameAs: socials,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${base}/#service`,
      name: `${site.name} \u2014 ${site.role}`,
      url: `${base}/`,
      image: `${base}/opengraph-image`,
      description: site.description,
      areaServed: ["Pune", "India"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      founder: { "@id": `${base}/#person` },
      email: site.email,
      sameAs: socials,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${newsreader.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <JsonLd data={structuredData} />
        <Grain />
        <EmberCursor />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
