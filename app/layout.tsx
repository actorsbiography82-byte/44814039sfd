import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/data/portfolioData";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zeeshan Web Solution | WordPress & AI Website Developer",
    template: "%s | Zeeshan Web Solution",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Web Development",
  keywords: [
    "WordPress developer",
    "AI website developer",
    "WooCommerce developer",
    "Elementor Pro developer",
    "freelance web developer",
    "technical SEO",
    "Core Web Vitals optimization",
    "website speed optimization",
    "WordPress developer Pakistan",
    "custom WordPress themes",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteConfig.name,
    title: "Zeeshan Web Solution | WordPress & AI Website Developer",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Zeeshan Web Solution — WordPress and AI Website Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeeshan Web Solution | WordPress & AI Website Developer",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
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
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f7f4",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteConfig.author,
      url: siteUrl,
      jobTitle: "WordPress & AI Website Developer",
      email: `mailto:${siteConfig.email}`,
      knowsAbout: [
        "WordPress Engineering",
        "WooCommerce Architecture",
        "AI Website Development",
        "OpenAI API Integration",
        "Technical SEO",
        "Core Web Vitals Optimization",
        "Elementor Pro",
        "JetEngine",
        "PHP & JavaScript",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: siteConfig.name,
      url: siteUrl,
      email: siteConfig.email,
      founder: { "@id": `${siteUrl}/#person` },
      areaServed: "Worldwide",
      priceRange: "$$",
      serviceType: [
        "WordPress Development",
        "WooCommerce Development",
        "AI Website Development",
        "Technical SEO",
        "Website Performance Optimization",
      ],
      description: siteConfig.description,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      publisher: { "@id": `${siteUrl}/#business` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontSans.variable} suppressHydrationWarning>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
