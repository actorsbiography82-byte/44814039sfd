"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Trash2,
  Sparkles,
  Type,
  FileText,
  Share2,
  AlertTriangle,
  ArrowRight,
  Sliders,
} from "lucide-react";

interface SocialPlatform {
  id: string;
  name: string;
  limit: number;
  description: string;
  recommendedMax?: number;
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "meta",
    name: "Meta Description (SEO)",
    limit: 160,
    description: "Search engine snippet limit for Google & Bing (150-160 chars)",
    recommendedMax: 155,
  },
  {
    id: "twitter",
    name: "Twitter / X Post",
    limit: 280,
    description: "Standard tweet limit for non-premium accounts",
    recommendedMax: 260,
  },
  {
    id: "linkedin",
    name: "LinkedIn Post",
    limit: 3000,
    description: "Maximum post length before 'see more' truncation",
    recommendedMax: 1300,
  },
  {
    id: "instagram",
    name: "Instagram Caption",
    limit: 2200,
    description: "Caption limit (first 125 chars shown before truncation)",
    recommendedMax: 150,
  },
];

export function TextFormatterTool() {
  const [text, setText] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [activePlatform, setActivePlatform] = useState<string>("meta");

  // Push to history for Undo functionality
  const updateText = useCallback(
    (newText: string) => {
      setHistory((prev) => [...prev.slice(-15), text]);
      setText(newText);
    },
    [text]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setText(lastState);
  }, [history]);

  const handleClear = useCallback(() => {
    if (!text) return;
    updateText("");
  }, [text, updateText]);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  // ==========================================
  // 1. TEXT FORMATTING LOGIC
  // ==========================================

  // Ek hi click mein extra spaces remove karna
  const removeExtraSpaces = useCallback(() => {
    if (!text) return;
    // Replace multiple spaces/tabs in each line with single space, trim line boundaries
    const cleaned = text
      .split("\n")
      .map((line) => line.replace(/[^\S\r\n]+/g, " ").trim())
      .join("\n")
      .trim();
    updateText(cleaned);
  }, [text, updateText]);

  // Line breaks khatam karna (convert multiline to single continuous text)
  const removeLineBreaks = useCallback(() => {
    if (!text) return;
    const cleaned = text
      .replace(/(\r\n|\n|\r)+/g, " ")
      .replace(/[^\S\r\n]+/g, " ")
      .trim();
    updateText(cleaned);
  }, [text, updateText]);

  // Remove empty / blank lines only (preserve paragraphs)
  const removeBlankLines = useCallback(() => {
    if (!text) return;
    const cleaned = text
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0)
      .join("\n");
    updateText(cleaned);
  }, [text, updateText]);

  // Tabs saaf karna
  const cleanTabs = useCallback(() => {
    if (!text) return;
    const cleaned = text.replace(/\t+/g, " ");
    updateText(cleaned);
  }, [text, updateText]);

  // One-Click Clean All: Extra spaces, tabs, and redundant line breaks
  const cleanAllFormatting = useCallback(() => {
    if (!text) return;
    const cleaned = text
      .replace(/\t+/g, " ") // replace tabs
      .split(/\r?\n/)
      .map((line) => line.replace(/[^\S\r\n]+/g, " ").trim()) // remove extra spaces
      .filter((line) => line.length > 0) // remove empty lines
      .join("\n");
    updateText(cleaned);
  }, [text, updateText]);

  // ==========================================
  // 2. CASE CONVERSION LOGIC
  // ==========================================

  // UPPERCASE
  const toUpperCase = useCallback(() => {
    if (!text) return;
    updateText(text.toUpperCase());
  }, [text, updateText]);

  // lowercase
  const toLowerCase = useCallback(() => {
    if (!text) return;
    updateText(text.toLowerCase());
  }, [text, updateText]);

  // Title Case (Capitalizes first letter of words)
  const toTitleCase = useCallback(() => {
    if (!text) return;
    const minorWords = new Set([
      "a",
      "an",
      "the",
      "and",
      "but",
      "or",
      "for",
      "nor",
      "on",
      "at",
      "to",
      "from",
      "by",
      "in",
      "of",
    ]);

    const cleaned = text.toLowerCase().replace(/\b[a-z]+(\'[a-z]+)?\b/gi, (word, _, index) => {
      const isFirstWord = index === 0;
      if (!isFirstWord && minorWords.has(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    updateText(cleaned);
  }, [text, updateText]);

  // Sentence case
  const toSentenceCase = useCallback(() => {
    if (!text) return;
    const cleaned = text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, prefix, char) => {
      return prefix + char.toUpperCase();
    });
    updateText(cleaned);
  }, [text, updateText]);

  // ==========================================
  // 3. METRICS & SOCIAL MEDIA LIMIT CALCULATIONS
  // ==========================================

  const metrics = useMemo(() => {
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const sentences = text.trim()
      ? text
          .split(/[.!?]+/)
          .map((s) => s.trim())
          .filter(Boolean).length
      : 0;
    const paragraphs = text.trim()
      ? text
          .split(/\n+/)
          .map((p) => p.trim())
          .filter(Boolean).length
      : 0;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return {
      charCount,
      charNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTimeMinutes: words > 0 ? readingTimeMinutes : 0,
    };
  }, [text]);

  const selectedPlatform = useMemo(() => {
    return (
      SOCIAL_PLATFORMS.find((p) => p.id === activePlatform) || SOCIAL_PLATFORMS[0]
    );
  }, [activePlatform]);

  const remainingChars = selectedPlatform.limit - metrics.charCount;
  const percentUsed = Math.min(100, Math.round((metrics.charCount / selectedPlatform.limit) * 100));
  const isOverLimit = remainingChars < 0;
  const isWarningZone = remainingChars >= 0 && remainingChars <= selectedPlatform.limit * 0.15;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans">
      {/* Top Banner / Heading */}
      <div className="border border-stone-200 bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Content Creator & Developer Utility
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Text Formatter & Social Limits Counter
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Clean spaces, strip line breaks, convert letter casing, and track real-time character
              limits for Twitter (X), Meta description, and social copy.
            </p>
          </div>

          {/* Quick Undo & Clear */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-stone-200 text-stone-700 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Undo last change"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Undo
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-rose-200 text-rose-700 bg-rose-50/60 hover:bg-rose-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Clear all text"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
            <button
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Text
                </>
              )}
            </button>
          </div>
        </div>

        {/* Text Area Input */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => updateText(e.target.value)}
            placeholder="Apna text yahan paste ya type karein (Paste your text here to format or count characters)..."
            rows={8}
            className="w-full p-4 sm:p-5 rounded-xl border border-stone-200 focus:border-stone-800 focus:ring-2 focus:ring-stone-900/10 outline-none text-stone-800 placeholder-stone-400 text-base leading-relaxed resize-y transition-all bg-stone-50/50"
          />
          {text.length === 0 && (
            <div className="absolute bottom-4 right-4 pointer-events-none text-xs text-stone-400 hidden sm:block">
              Type or paste anywhere
            </div>
          )}
        </div>

        {/* Real-time Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 pt-4 border-t border-stone-100 text-center">
          <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100">
            <span className="block text-xl font-bold text-stone-900">{metrics.charCount}</span>
            <span className="text-xs text-stone-500 font-medium">Characters</span>
          </div>
          <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100">
            <span className="block text-xl font-bold text-stone-900">{metrics.charNoSpaces}</span>
            <span className="text-xs text-stone-500 font-medium">Chars (no spaces)</span>
          </div>
          <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100">
            <span className="block text-xl font-bold text-stone-900">{metrics.words}</span>
            <span className="text-xs text-stone-500 font-medium">Words</span>
          </div>
          <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100">
            <span className="block text-xl font-bold text-stone-900">{metrics.sentences}</span>
            <span className="text-xs text-stone-500 font-medium">Sentences</span>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-stone-50 rounded-xl p-2.5 border border-stone-100">
            <span className="block text-xl font-bold text-stone-900">{metrics.paragraphs}</span>
            <span className="text-xs text-stone-500 font-medium">Paragraphs</span>
          </div>
        </div>
      </div>

      {/* Control Groups: 1. Text Formatting & 2. Case Conversion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Text Formatting Options */}
        <div className="border border-stone-200 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-stone-900 font-semibold">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <h2 className="text-base font-bold">1. Text Formatting Options</h2>
            </div>
            <p className="text-xs text-stone-500 mb-4">
              Ek click mein redundant spaces, line breaks, aur tabs ko saaf karein.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={removeExtraSpaces}
                disabled={!text}
                className="w-full text-left px-3.5 py-2.5 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-stone-800 text-xs font-medium disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-between group"
              >
                <span>Remove Extra Spaces</span>
                <span className="text-[11px] text-stone-400 group-hover:text-emerald-700 font-mono">
                  [  ] → [ ]
                </span>
              </button>

              <button
                onClick={cleanTabs}
                disabled={!text}
                className="w-full text-left px-3.5 py-2.5 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-stone-800 text-xs font-medium disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-between group"
              >
                <span>Clean Tabs</span>
                <span className="text-[11px] text-stone-400 group-hover:text-emerald-700 font-mono">
                  \t → &quot; &quot;
                </span>
              </button>

              <button
                onClick={removeLineBreaks}
                disabled={!text}
                className="w-full text-left px-3.5 py-2.5 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-stone-800 text-xs font-medium disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-between group"
              >
                <span>Remove Line Breaks</span>
                <span className="text-[11px] text-stone-400 group-hover:text-emerald-700 font-mono">
                  \n → &quot; &quot;
                </span>
              </button>

              <button
                onClick={removeBlankLines}
                disabled={!text}
                className="w-full text-left px-3.5 py-2.5 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-stone-800 text-xs font-medium disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-between group"
              >
                <span>Strip Empty Lines</span>
                <span className="text-[11px] text-stone-400 group-hover:text-emerald-700 font-mono">
                  Keep text
                </span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100">
            <button
              onClick={cleanAllFormatting}
              disabled={!text}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              One-Click Clean All (Spaces + Tabs + Breaks)
            </button>
          </div>
        </div>

        {/* Section 2: Case Conversion */}
        <div className="border border-stone-200 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-stone-900 font-semibold">
              <Type className="w-4 h-4 text-emerald-700" />
              <h2 className="text-base font-bold">2. Case Conversion</h2>
            </div>
            <p className="text-xs text-stone-500 mb-4">
              Text ko foran UPPERCASE, lowercase, ya Title Case mein badalne ke buttons.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={toUpperCase}
                disabled={!text}
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 hover:border-stone-800 hover:bg-stone-100 text-stone-900 text-xs font-bold tracking-wide disabled:opacity-40 disabled:pointer-events-none transition-all text-center"
              >
                UPPERCASE
              </button>

              <button
                onClick={toLowerCase}
                disabled={!text}
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 hover:border-stone-800 hover:bg-stone-100 text-stone-900 text-xs font-medium lowercase disabled:opacity-40 disabled:pointer-events-none transition-all text-center"
              >
                lowercase
              </button>

              <button
                onClick={toTitleCase}
                disabled={!text}
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 hover:border-stone-800 hover:bg-stone-100 text-stone-900 text-xs font-semibold capitalize disabled:opacity-40 disabled:pointer-events-none transition-all text-center"
              >
                Title Case
              </button>

              <button
                onClick={toSentenceCase}
                disabled={!text}
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 hover:border-stone-800 hover:bg-stone-100 text-stone-900 text-xs font-medium disabled:opacity-40 disabled:pointer-events-none transition-all text-center"
              >
                Sentence case
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 text-center">
            Punctuation and spacing are preserved during casing conversions.
          </div>
        </div>
      </div>

      {/* Section 3: Social Media Limits Indicator */}
      <div className="border border-stone-200 bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-semibold mb-1">
              <Share2 className="w-4 h-4 text-emerald-700" />
              <h2 className="text-base font-bold">3. Social Media & SEO Character Limits</h2>
            </div>
            <p className="text-xs text-stone-500">
              Twitter (X), Meta description, aur social platforms ke liye live limit indicator.
            </p>
          </div>

          {/* Platform Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-xl">
            {SOCIAL_PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(platform.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activePlatform === platform.id
                    ? "bg-white text-stone-900 shadow-sm font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {platform.id === "meta"
                  ? "Meta (160)"
                  : platform.id === "twitter"
                  ? "Twitter (280)"
                  : platform.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Platform Big Indicator Card */}
        <div
          className={`rounded-2xl p-6 border transition-all ${
            isOverLimit
              ? "bg-rose-50/70 border-rose-300"
              : isWarningZone
              ? "bg-amber-50/70 border-amber-300"
              : "bg-stone-50/70 border-stone-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                Target Platform
              </span>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                {selectedPlatform.name}
                <span className="text-xs font-normal text-stone-500">
                  (Limit: {selectedPlatform.limit} chars)
                </span>
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">{selectedPlatform.description}</p>
            </div>

            {/* Live Indicator Bubble */}
            <div className="text-right sm:min-w-[180px]">
              {isOverLimit ? (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {Math.abs(remainingChars)} characters over limit!
                </div>
              ) : (
                <div
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border mb-1 ${
                    isWarningZone
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-emerald-100 text-emerald-900 border-emerald-300"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  {remainingChars} characters left
                </div>
              )}
              <div className="text-xs text-stone-500 font-mono">
                {metrics.charCount} / {selectedPlatform.limit} ({percentUsed}%)
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-200/80 rounded-full h-2.5 mt-5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isOverLimit
                  ? "bg-rose-600"
                  : isWarningZone
                  ? "bg-amber-500"
                  : "bg-emerald-600"
              }`}
              style={{ width: `${Math.min(100, percentUsed)}%` }}
            />
          </div>
        </div>

        {/* All Platforms Quick Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {SOCIAL_PLATFORMS.map((platform) => {
            const left = platform.limit - metrics.charCount;
            const over = left < 0;
            const warning = left >= 0 && left <= platform.limit * 0.15;

            return (
              <div
                key={platform.id}
                onClick={() => setActivePlatform(platform.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  activePlatform === platform.id
                    ? "ring-2 ring-stone-900 border-stone-900 bg-white"
                    : "border-stone-200 bg-stone-50 hover:bg-stone-100/80"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-stone-800">
                    {platform.id === "meta"
                      ? "Meta Description"
                      : platform.id === "twitter"
                      ? "Twitter (X)"
                      : platform.name.split(" ")[0]}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">max {platform.limit}</span>
                </div>
                <div className="text-sm font-semibold">
                  {over ? (
                    <span className="text-rose-600 font-mono text-xs">
                      {Math.abs(left)} chars over
                    </span>
                  ) : (
                    <span
                      className={`font-mono text-xs ${
                        warning ? "text-amber-700" : "text-emerald-700"
                      }`}
                    >
                      {left} chars left
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
