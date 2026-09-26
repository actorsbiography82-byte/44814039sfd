"use client";

import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { heroAnchors, siteConfig } from "@/data/portfolioData";
import { Hero3DCanvas } from "@/components/Hero3DCanvas";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-center overflow-hidden pt-28 pb-16 lg:py-24" id="home" aria-label="Introduction">
      {/* ========================================================= */}
      {/* 1. FULL-WIDTH 3D BACKGROUND CANVAS */}
      {/* ========================================================= */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
        <Hero3DCanvas avatarUrl={siteConfig.profileImage} />
      </div>

      {/* Atmospheric lighting gradient overlays */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#f8f7f4] via-[#f8f7f4]/60 to-transparent z-[1]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8f7f4] via-[#f8f7f4]/70 to-transparent z-[1]"
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* 2. CENTERED OVERLAY CONTENT LAYER */}
      {/* ========================================================= */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full pointer-events-none flex flex-col items-center text-center">
        
        {/* Eyebrow Pill */}
        <motion.div
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/85 px-4 py-1.5 text-xs font-semibold text-[#285141] shadow-sm backdrop-blur-md"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Sparkles size={13} className="text-emerald-700 animate-pulse" aria-hidden="true" />
          <span>WordPress Development · WooCommerce · AI Integrations</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.12] pointer-events-auto"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          {siteConfig.name}
          <span className="block mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-[#285141] font-sans tracking-normal">
            {siteConfig.title}
          </span>
        </motion.h1>

        {/* Lead Summary */}
        <motion.p
          className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-stone-700 pointer-events-auto backdrop-blur-xs"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {siteConfig.description}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-xl bg-[#285141] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/15 transition-all duration-200 hover:bg-[#1e3e32] hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>View Selected Work</span>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white/95 px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-sm transition-all duration-200 hover:bg-stone-50 hover:border-stone-400 hover:-translate-y-0.5"
          >
            <span>Discuss Your Project</span>
          </a>
        </motion.div>

        {/* Dead-Center 3D Stage Clearance Area */}
        <div className="w-full h-44 sm:h-56 my-2 pointer-events-none" aria-hidden="true" />

        {/* Status Pill & 3D Interactive Instruction */}
        <motion.div
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/90 px-4 py-1.5 text-xs font-medium text-stone-700 shadow-sm backdrop-blur-md"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span>Profile dead-center with 3D orbiting WordPress, Elementor, WooCommerce, OpenAI & PHP</span>
        </motion.div>

        {/* Capability Anchors Row */}
        <motion.dl
          className="mt-8 pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl pointer-events-auto text-left"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          aria-label="Core capability areas"
        >
          {heroAnchors.map((anchor) => (
            <div key={anchor.title} className="space-y-1 bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-stone-200/50 sm:border-0">
              <dd className="text-sm font-bold text-stone-900">{anchor.title}</dd>
              <dt className="text-xs text-stone-500 font-medium">{anchor.subtitle}</dt>
            </div>
          ))}
        </motion.dl>

      </div>
    </section>
  );
}
