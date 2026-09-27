import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextFormatterTool } from "@/components/TextFormatterTool";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Text Formatter & Social Limits Counter | Zeeshan Web Solution",
  description:
    "Free online text formatter, case converter, and social media character limit counter for Twitter (X), Meta descriptions, LinkedIn, and Instagram.",
};

export default function TextFormatterPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-3 rounded-lg hover:bg-stone-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </Link>
        </div>

        <TextFormatterTool />
      </main>
      <Footer />
    </>
  );
}
