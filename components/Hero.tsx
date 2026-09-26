"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Compass, Layers, Orbit, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { heroAnchors, siteConfig } from "@/data/portfolioData";
import { Hero3DCanvas } from "@/components/Hero3DCanvas";

const profileImageUrl =
  "https://zeeshan-snowy.vercel.app/wp-content/uploads/2026/08/e081a0e1-79db-4081-ba5f-0b153db2e6c4.png";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 lg:py-24"
      id="home"
      aria-label="Introduction"
    >
      {/* ========================================================= */}
      {/* 1. FULL-WIDTH INTERACTIVE 3D CANVAS CONTAINER */}
      {/* ========================================================= */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Hero3DCanvas avatarUrl={profileImageUrl} />
      </div>

      {/* Atmospheric lighting gradients */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f8f7f4] via-[#f8f7f4]/60 to-transparent z-[1]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8f7f4] via-[#f8f7f4]/70 to-transparent z-[1]"
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* 2. TAILWIND CLEAN OVERLAY CONTENT LAYER */}
      {/* ========================================================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Copy Box with Frosted Glassmorphism */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              className="pointer-events-auto rounded-3xl border border-stone-200/90 bg-[#f8f7f4]/85 p-6 sm:p-9 lg:p-10 shadow-2xl backdrop-blur-md transition-shadow hover:shadow-emerald-950/5"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/20 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm">
                <Sparkles size={13} className="text-emerald-700 animate-pulse" aria-hidden="true" />
                <span>WordPress Development · WooCommerce · AI Integrations</span>
              </div>

              {/* Headline */}
              <h1 className="mt-4 text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-stone-900 leading-[1.12]">
                {siteConfig.name}
                <span className="block mt-2 text-lg sm:text-2xl font-semibold text-emerald-850 font-sans tracking-normal text-[#285141]">
                  {siteConfig.title}
                </span>
              </h1>

              {/* Lead Paragraph */}
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-stone-700">
                I engineer bespoke WordPress websites, high-speed WooCommerce stores, and AI-enabled web workflows
                for founders, businesses, and digital agencies worldwide. Focused on clean code, fast page
                loads, and clear conversion paths.
              </p>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#285141] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/15 transition-all duration-200 hover:bg-[#1e3e32] hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>View Selected Work</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>

                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white/95 px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-sm transition-all duration-200 hover:bg-stone-50 hover:border-stone-400 hover:-translate-y-0.5"
                >
                  <span>Discuss Your Project</span>
                </a>
              </div>

              {/* Core Proof Capability Anchors */}
              <dl
                className="mt-8 pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4"
                aria-label="Core capability areas"
              >
                {heroAnchors.map((anchor) => (
                  <div key={anchor.title} className="space-y-1">
                    <dd className="text-sm font-bold text-stone-900">{anchor.title}</dd>
                    <dt className="text-xs text-stone-500 font-medium">{anchor.subtitle}</dt>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* Right Column: Floating 3D Control & Status Overlay Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <motion.div
              className="pointer-events-auto rounded-3xl border border-stone-200/90 bg-white/80 p-5 sm:p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-emerald-700/30"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  <CheckCircle2 size={13} className="text-emerald-700" aria-hidden="true" />
                  <span>Independent Specialist</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  <span>Available for Select Projects</span>
                </div>
              </div>

              {/* Orbit Info Highlight */}
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-[#285141] shadow-md">
                  <Image
                    src={profileImageUrl}
                    alt="Zeeshan - WordPress Developer & AI Website Developer"
                    fill
                    priority
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-stone-900 truncate">Zeeshan</h3>
                  <p className="text-xs font-medium text-[#285141] truncate">WordPress & AI Website Developer</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Direct Engineer Collaboration · Zero Agency Overhead</p>
                </div>
              </div>

              {/* 3D Orbit Universe Visual Legend */}
              <div className="mt-5 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <Orbit size={13} className="text-[#285141]" aria-hidden="true" />
                    <span>3D Orbiting Architecture</span>
                  </span>
                  <span className="text-[10px] text-emerald-800 font-mono bg-emerald-100/70 px-2 py-0.5 rounded">
                    ACTIVE 60 FPS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 rounded-lg bg-white/90 px-2.5 py-1.5 border border-stone-200/80 shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-[#21759b]" />
                    <span className="font-semibold text-stone-800 text-[11px]">WordPress Core</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/90 px-2.5 py-1.5 border border-stone-200/80 shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                    <span className="font-semibold text-stone-800 text-[11px]">OpenAI & APIs</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/90 px-2.5 py-1.5 border border-stone-200/80 shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-[#96588a]" />
                    <span className="font-semibold text-stone-800 text-[11px]">WooCommerce</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/90 px-2.5 py-1.5 border border-stone-200/80 shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-[#d97706]" />
                    <span className="font-semibold text-stone-800 text-[11px]">AI Copilots</span>
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed text-stone-500 pt-1">
                  Interact directly with the 3D canvas behind this card: drag to spin the orbit, or hover to tilt perspectives.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
