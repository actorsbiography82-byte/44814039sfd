"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { heroAnchors, siteConfig } from "@/data/portfolioData";
import { Hero3DCanvas } from "@/components/Hero3DCanvas";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 lg:py-24 bg-[#f8f7f4]"
      id="home"
      aria-label="Introduction"
    >
      {/* Ambient background glows - strictly behind all content */}
      <div
        className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full bg-emerald-50/50 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-14 items-center">
          
          {/* ========================================================= */}
          {/* 1. LEFT COLUMN: CRISP, HIGH-READABILITY TYPOGRAPHY & CTAs */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Live Status Pill */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/95 px-4 py-1.5 text-xs font-semibold text-[#285141] shadow-xs backdrop-blur-md"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Select Projects</span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-500 font-normal">WordPress & AI Integrations</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="mt-5 text-4xl sm:text-5xl lg:text-[54px] xl:text-6xl font-black tracking-tight text-stone-900 leading-[1.08]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              {siteConfig.name}
              <span className="block mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#285141] font-sans tracking-normal">
                {siteConfig.title}
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              className="mt-5 text-base sm:text-lg leading-relaxed text-stone-700 max-w-2xl font-normal"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {siteConfig.description}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <a
                href="#case-studies"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#285141] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 transition-all duration-200 hover:bg-[#1e3e32] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Selected Work</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-xs transition-all duration-200 hover:bg-stone-50 hover:border-stone-400 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Discuss Your Project</span>
              </a>
            </motion.div>

            {/* Core Capability Anchors Grid */}
            <motion.dl
              className="mt-10 pt-8 border-t border-stone-200/90 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={shouldReduceMotion ? {} : { opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              aria-label="Core capability areas"
            >
              {heroAnchors.map((anchor) => (
                <div key={anchor.title} className="space-y-1">
                  <dd className="text-sm font-bold text-stone-900 tracking-tight">{anchor.title}</dd>
                  <dt className="text-xs text-stone-500 font-medium">{anchor.subtitle}</dt>
                </div>
              ))}
            </motion.dl>

          </div>

          {/* ========================================================= */}
          {/* 2. RIGHT COLUMN: UPRIGHT PORTRAIT + DEDICATED 3D TECH ORBIT */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[440px] sm:max-w-[460px] aspect-square flex items-center justify-center">
              
              {/* 3D Tech Orbit Canvas strictly confined inside this visual stage */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <Hero3DCanvas avatarUrl={siteConfig.profileImage} />
              </div>

              {/* Fixed, Upright, Pristine Profile Picture Container */}
              <motion.div
                className="relative z-10 flex flex-col items-center pointer-events-none select-none"
                initial={shouldReduceMotion ? false : { scale: 0.94, opacity: 0 }}
                animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Soft Ambient Halo */}
                <div
                  className="absolute -inset-4 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-400/15 to-transparent blur-md -z-10"
                  aria-hidden="true"
                />

                {/* Fixed, Upright Avatar Frame */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 xl:w-56 xl:h-56 rounded-full p-1.5 bg-gradient-to-b from-white via-white to-stone-200 shadow-2xl shadow-[#141716]/15 ring-2 ring-[#285141]/20">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-100">
                    <img
                      src={siteConfig.profileImage}
                      alt="Zeeshan - WordPress & AI Website Developer"
                      width={448}
                      height={448}
                      className="w-full h-full object-cover object-center pointer-events-auto"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Upright Verified / Online Badge */}
                <div className="mt-3.5 pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-stone-800 shadow-md border border-stone-200 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  <span>Zeeshan · Ready to Build</span>
                </div>
              </motion.div>

            </div>

            {/* Subtle Tech Stack Badges Indicators for Mobile / Fast Reference */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] text-stone-600 font-medium">
              <span className="inline-flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-md border border-stone-200/80 shadow-2xs">WordPress</span>
              <span className="inline-flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-md border border-stone-200/80 shadow-2xs">Elementor</span>
              <span className="inline-flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-md border border-stone-200/80 shadow-2xs">WooCommerce</span>
              <span className="inline-flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-md border border-stone-200/80 shadow-2xs">OpenAI</span>
              <span className="inline-flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-md border border-stone-200/80 shadow-2xs">PHP</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
