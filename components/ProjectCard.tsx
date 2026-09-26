import Image from "next/image";
import { ArrowUpRight, CheckCircle, ExternalLink, Globe, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import type { ProjectItem } from "@/types/portfolio";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

// Color badges for popular technologies
const getTechBadgeStyle = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("wordpress")) {
    return {
      dot: "bg-sky-500",
      bg: "bg-sky-50 text-sky-900 border-sky-200/80",
    };
  }
  if (t.includes("woocommerce")) {
    return {
      dot: "bg-purple-500",
      bg: "bg-purple-50 text-purple-900 border-purple-200/80",
    };
  }
  if (t.includes("ai") || t.includes("openai")) {
    return {
      dot: "bg-emerald-500",
      bg: "bg-emerald-50 text-emerald-900 border-emerald-200/80",
    };
  }
  if (t.includes("next.js") || t.includes("react")) {
    return {
      dot: "bg-zinc-900",
      bg: "bg-zinc-100 text-zinc-900 border-zinc-200",
    };
  }
  if (t.includes("tailwind")) {
    return {
      dot: "bg-cyan-500",
      bg: "bg-cyan-50 text-cyan-900 border-cyan-200/80",
    };
  }
  if (t.includes("jetengine") || t.includes("php")) {
    return {
      dot: "bg-amber-500",
      bg: "bg-amber-50 text-amber-900 border-amber-200/80",
    };
  }
  return {
    dot: "bg-stone-500",
    bg: "bg-stone-50 text-stone-800 border-stone-200",
  };
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const indexFormatted = String(index + 1).padStart(2, "0");
  const isReversed = index % 2 === 1;

  // Clean URL format for the mockup address bar
  const displayUrl = project.url
    ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.id}.clientportal.io/production`;

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-stone-200/90 bg-white/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-emerald-700/30 ${
        isReversed ? "lg:flex-row-reverse" : ""
      } flex flex-col lg:flex-row gap-6 lg:gap-10 p-5 sm:p-7 lg:p-8 backdrop-blur-sm`}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* ========================================================= */}
      {/* 1. MODERN BROWSER MOCKUP CONTAINER */}
      {/* ========================================================= */}
      <div className="flex-1 w-full flex flex-col justify-between">
        <div className="overflow-hidden rounded-xl border border-stone-300/80 bg-stone-100 shadow-md transition-transform duration-300 group-hover:-translate-y-1">
          {/* Browser Chrome Header */}
          <div className="flex items-center justify-between gap-2 border-b border-stone-200 bg-stone-100/95 px-3.5 py-2.5 sm:px-4">
            {/* Traffic Light Window Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-black/10 transition-opacity hover:opacity-80" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-black/10 transition-opacity hover:opacity-80" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-black/10 transition-opacity hover:opacity-80" />
            </div>

            {/* Address Bar Pill with SSL Padlock */}
            <div className="flex flex-1 max-w-sm sm:max-w-md items-center justify-center gap-1.5 rounded-lg border border-stone-200/90 bg-white px-2.5 py-1 text-xs text-stone-600 shadow-inner font-mono truncate">
              <Lock size={11} className="text-emerald-700 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{displayUrl}</span>
            </div>

            {/* Browser Right Action Icons */}
            <div className="flex items-center gap-1 text-stone-400">
              <RefreshCw size={12} className="hidden sm:inline-block transition-transform duration-500 group-hover:rotate-180" aria-hidden="true" />
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse ml-1" title="Live System Active" />
            </div>
          </div>

          {/* Browser Viewport with Image Preview */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900/5">
            <Image
              src={project.image}
              alt={`Live interface preview of ${project.title} - ${project.subtitle}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            {/* Soft inner vignette */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />

            {/* Floating Live Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full backdrop-blur-md bg-stone-900/80 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Production Architecture</span>
            </div>

            <div className="absolute bottom-3 right-3 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-stone-800 shadow">
              CASE {indexFormatted}
            </div>
          </div>
        </div>

        {/* Technical Highlight Pills under Mockup */}
        {project.technicalHighlights && project.technicalHighlights.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {project.technicalHighlights.map((highlight) => (
              <div
                key={highlight.label}
                className="flex items-center justify-between rounded-lg border border-stone-200/90 bg-stone-50/80 px-3 py-2 text-stone-700"
              >
                <span className="text-stone-500 font-medium text-[11px]">{highlight.label}</span>
                <span className="font-semibold text-emerald-800 text-right truncate pl-1">
                  {highlight.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 2. CASE STUDY CONTENT & CRISP TYPOGRAPHY */}
      {/* ========================================================= */}
      <div className="flex-1 w-full flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header Row */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <Globe size={13} aria-hidden="true" />
                {project.subtitle}
              </span>
              <span className="font-mono text-sm font-bold text-stone-400" aria-label={`Project index ${indexFormatted}`}>
                {indexFormatted} / 04
              </span>
            </div>

            <h3
              id={`project-title-${project.id}`}
              className="mt-1.5 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl"
            >
              {project.title}
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
            {project.description}
          </p>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3.5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Challenge
              </span>
              <p className="mt-1 text-xs leading-relaxed text-stone-700">
                {project.challenge}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-900/10 bg-emerald-50/40 p-3.5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Engineering Solution
              </span>
              <p className="mt-1 text-xs leading-relaxed text-emerald-950">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Outcome highlight row */}
          <div className="flex items-start gap-2.5 rounded-xl border border-stone-200/90 bg-white p-3 text-xs text-stone-700 shadow-sm">
            <ShieldCheck size={16} className="mt-0.5 text-emerald-700 flex-shrink-0" aria-hidden="true" />
            <div>
              <span className="font-semibold text-stone-900">Quantified Result: </span>
              <span>{project.result}</span>
            </div>
          </div>
        </div>

        {/* Services & Clear Tech Stack Badges */}
        <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
          {/* Clear Tech Stack Badges */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
              Integrated Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5" aria-label={`Tech stack for ${project.title}`}>
              {project.technologies.map((tech) => {
                const style = getTechBadgeStyle(tech);
                return (
                  <span
                    key={tech}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${style.bg}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Services Tags */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap gap-1.5 text-[11px] text-stone-500">
              {project.services.slice(0, 3).map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-stone-100 px-2 py-0.5 font-medium text-stone-600"
                >
                  {service}
                </span>
              ))}
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-emerald-800 hover:shadow-md"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
