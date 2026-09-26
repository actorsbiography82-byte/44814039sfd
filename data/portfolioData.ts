import {
  Bot,
  Braces,
  Code2,
  Gauge,
  Layers3,
  Palette,
  Rocket,
  Search,
  ShoppingBag,
  Workflow,
  Wrench,
} from "lucide-react";
import type {
  CapabilityAnchor,
  CapabilityItem,
  FAQItem,
  PrincipleItem,
  ProcessStep,
  ProjectItem,
  ServiceItem,
} from "@/types/portfolio";

export const siteConfig = {
  name: "Zeeshan Web Solution",
  author: "Zeeshan",
  title: "WordPress Developer & AI Website Developer",
  shortTitle: "Zeeshan.ws",
  description:
    "I engineer custom WordPress websites, WooCommerce stores, and AI-enabled web workflows for founders, businesses, and digital agencies worldwide. Focused on clean code, fast page loads, and clear conversion paths.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zeeshan-snowy.vercel.app",
  email: "zeeshanmalikoficial@gmail.com",
  whatsappUrl: "https://wa.me/923057046739",
  whatsappDisplay: "+92 305 7046739",
  location: "Worldwide Delivery · Based in Pakistan",
  availability: "Available for Select Projects",
};

export const heroAnchors: CapabilityAnchor[] = [
  { title: "Custom WordPress", subtitle: "Themes & Dynamic CPTs" },
  { title: "WooCommerce", subtitle: "Store & Checkout UX" },
  { title: "AI Integrations", subtitle: "Practical Workflows & APIs" },
  { title: "Core Web Vitals", subtitle: "Speed & Technical SEO" },
];

export const techStackItems: string[] = [
  "WordPress",
  "WooCommerce",
  "PHP",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "Elementor Pro",
  "JetEngine",
  "REST APIs",
  "OpenAI API",
  "Technical SEO",
  "Core Web Vitals",
];

export const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: "Custom WordPress Engineering",
    description:
      "Bespoke WordPress development built with clean PHP template architecture, structured CMS schemas, and maintainable block or Elementor components.",
    deliverables: [
      "Custom theme architecture & template hierarchy",
      "Dynamic post types & custom fields (ACF / JetEngine)",
      "Reusable block & Elementor Pro development",
      "Clean code architecture & security hardening",
    ],
    icon: Braces,
  },
  {
    number: "02",
    title: "Pragmatic AI & API Solutions",
    description:
      "Integrating practical, business-focused AI tools into web workflows—from automated lead qualification to intelligent on-site search and customer routing.",
    deliverables: [
      "Custom AI chatbot & lead qualification workflows",
      "OpenAI API integrations & automated routing",
      "AI-enhanced catalog & content search",
      "Webhook integrations with CRMs & automation tools",
    ],
    icon: Bot,
  },
  {
    number: "03",
    title: "WooCommerce E-Commerce Stores",
    description:
      "High-speed e-commerce stores designed for high-intent shopping, friction-free checkout flows, and custom inventory or product configuration logic.",
    deliverables: [
      "Streamlined single-page & multi-step checkouts",
      "Custom catalog filtering & product attribute schemas",
      "Payment gateway, tax, and shipping integrations",
      "Mobile shopping speed & cart optimization",
    ],
    icon: ShoppingBag,
  },
  {
    number: "04",
    title: "Core Web Vitals & Technical SEO",
    description:
      "Rigorous Core Web Vitals optimization, speed audits, semantic HTML architecture, structured data schemas, and clean search engine crawl paths.",
    deliverables: [
      "Core Web Vitals remediation (LCP, CLS, INP)",
      "Comprehensive Schema.org JSON-LD structured data",
      "Asset minification, caching & database optimization",
      "Technical SEO auditing & clean crawl paths",
    ],
    icon: Gauge,
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "aura-health",
    title: "Aura Health & MedTech",
    subtitle: "AI-Powered Patient Triage & Custom WordPress Portal",
    description:
      "A medical and wellness digital portal engineered with custom patient intake workflows, headless CMS content delivery, and automated symptom triage.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    url: "https://aurahealth-demo.example.com",
    technologies: ["WordPress", "Next.js", "OpenAI API", "Tailwind CSS", "REST API"],
    services: ["Custom Portal Architecture", "AI Intake Workflow", "Headless CMS", "Core Web Vitals"],
    challenge:
      "A clinic network struggled with fragmented patient onboarding, sluggish mobile loading, and manual intake questionnaires that created provider scheduling bottlenecks.",
    solution:
      "Architected a secure headless WordPress backend coupled with a responsive Next.js frontend and an OpenAI triage assistant that dynamically clarifies symptoms and routes appointments.",
    result:
      "Reduced intake completion drop-offs by 44%, achieved a 98/100 Core Web Vitals score, and automated appointment pre-screening.",
    technicalHighlights: [
      { label: "Core Web Vitals", value: "98/100 Mobile Score" },
      { label: "AI Integration", value: "Automated Triage Flow" },
    ],
  },
  {
    id: "nexus-luxury",
    title: "Nexus Luxury Apparel",
    subtitle: "High-Volume Direct-to-Consumer WooCommerce Architecture",
    description:
      "An editorial apparel boutique engineered for zero-friction browsing, instant color swatch previews, and accelerated mobile single-page checkout.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    url: "https://nexusluxury-demo.example.com",
    technologies: ["WooCommerce", "WordPress", "Stripe API", "JetEngine", "Tailwind CSS"],
    services: ["Store Architecture", "Checkout UX", "Catalog Optimization", "Speed Engineering"],
    challenge:
      "High checkout abandonment on mobile devices due to slow catalog filtering, unoptimized asset payloads, and disjointed multi-step checkout forms.",
    solution:
      "Developed a custom lightweight WooCommerce theme with instantaneous AJAX attribute filtering, responsive lookbook galleries, and a frictionless single-step Stripe payment drawer.",
    result:
      "Achieved sub-850ms page transitions, increased mobile checkout completion by 32%, and safely accommodated flash-sale traffic spikes.",
    technicalHighlights: [
      { label: "Performance", value: "<850ms First Contentful Paint" },
      { label: "Checkout", value: "1-Step Frictionless Funnel" },
    ],
  },
  {
    id: "urban-edge",
    title: "UrbanEdge Real Estate",
    subtitle: "Multi-Agent Commercial & Residential Directory Platform",
    description:
      "A full-scale real estate directory platform featuring front-end agent submissions, relational taxonomy search, and interactive geolocation maps.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    url: "https://urbanedge-demo.example.com",
    technologies: ["WordPress", "JetEngine", "PHP 8.3", "REST APIs", "Mapbox GL"],
    services: ["Directory Architecture", "Custom Field Modeling", "Agent Dashboard UX", "Technical SEO"],
    challenge:
      "Agents lacked a self-serve front-end listing dashboard, forcing staff into manual listings moderation while prospective buyers experienced laggy directory filtering.",
    solution:
      "Built relational custom post types via JetEngine, secure role-restricted agent management portals, and faceted AJAX queries with interactive map pinning.",
    result:
      "Scaled the portal to 4,500+ dynamic listings with sub-second search responses and streamlined agent onboarding without WP admin access.",
    technicalHighlights: [
      { label: "Data Architecture", value: "Relational CPTs & Taxonomies" },
      { label: "Search Speed", value: "Instantaneous AJAX Facets" },
    ],
  },
  {
    id: "synthetix-ai",
    title: "Synthetix AI Copilot",
    subtitle: "Intelligent Customer Support & Lead Routing Web App",
    description:
      "An automated customer intelligence system integrating conversational AI assistants into WordPress websites to qualify inbound B2B sales leads.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    url: "https://synthetix-demo.example.com",
    technologies: ["WordPress", "Next.js", "OpenAI Assistant API", "TypeScript", "Tailwind CSS"],
    services: ["AI API Engineering", "CRM Webhooks", "Conversational UX", "Analytics Dashboard"],
    challenge:
      "Inbound website inquiries faced up to 6 hours of triage latency during peak hours, causing high-value prospective clients to bounce to competitors.",
    solution:
      "Engineered an on-site AI conversational copilot trained on specialized service documentation, connected to real-time webhook endpoints that automatically qualify leads and book calendar discovery calls.",
    result:
      "Automated 68% of initial inquiries, shortened lead qualification response from hours to under 3 seconds, and doubled booked calls.",
    technicalHighlights: [
      { label: "Response Latency", value: "<1.2s Real-time Streaming" },
      { label: "Automation", value: "Direct CRM & Calendar Routing" },
    ],
  },
];

export const processData: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Technical Scope",
    description:
      "We clarify business goals, content requirements, technical constraints, and measurable project specifications before writing code.",
  },
  {
    number: "02",
    title: "Information Architecture",
    description:
      "Sitemap modeling, database fields, content hierarchy, conversion paths, and component specifications are mapped out with precision.",
  },
  {
    number: "03",
    title: "Interface & Responsive Design",
    description:
      "A clean visual system with intuitive typography, mobile-first responsive states across all viewports, and accessible interaction patterns.",
  },
  {
    number: "04",
    title: "Clean Code Implementation",
    description:
      "Production-grade WordPress or WooCommerce build with clean code, secure dependencies, API integrations, and accessibility standards.",
  },
  {
    number: "05",
    title: "Testing, Speed Audit & Deployment",
    description:
      "Cross-device browser verification, Core Web Vitals profiling, technical SEO checklist validation, domain setup, and production deployment.",
  },
];

export const capabilitiesData: CapabilityItem[] = [
  { title: "Custom WordPress & PHP Development", icon: Code2 },
  { title: "Strategic UX & Conversion Architecture", icon: Workflow },
  { title: "Core Web Vitals & Speed Optimization", icon: Gauge },
  { title: "Technical SEO & Schema Integration", icon: Search },
  { title: "Pragmatic AI & API Integrations", icon: Bot },
  { title: "Modular Component & Design Systems", icon: Layers3 },
];

export const principlesData: PrincipleItem[] = [
  {
    title: "Launch-Ready Engineering",
    description:
      "Every layout decision accounts for build quality, long-term maintainability, security, and load speed from day one.",
    icon: Rocket,
  },
  {
    title: "Calm Visual Systems",
    description:
      "Hierarchy, typography, whitespace, and subtle motion should guide the reader's attention, not overwhelm it.",
    icon: Palette,
  },
  {
    title: "Practical Value Over Fluff",
    description:
      "Complexity and AI integrations are added only when they directly improve user workflows or business outcomes.",
    icon: Wrench,
  },
];

export const faqsData: FAQItem[] = [
  {
    question: "What types of projects are the best fit for your services?",
    answer:
      "Custom WordPress theme builds, WooCommerce e-commerce stores, website speed and Core Web Vitals remediation, and practical AI integrations. I work best with businesses, founders, and digital agencies who value clean code, maintainability, and direct communication.",
  },
  {
    question: "How do you handle international collaboration and communication?",
    answer:
      "I work smoothly with remote clients across time zones. Projects are managed with clear milestone updates, asynchronous video walkthroughs (Loom), structured documentation, and scheduled calls for key milestone reviews.",
  },
  {
    question: "Can you redesign an existing WordPress website without losing SEO rankings?",
    answer:
      "Yes. I audit your existing URL structure, preserve 301 redirect mappings, protect established meta tags and schema, and rebuild the front-end code and UX without causing indexing drops or downtime.",
  },
  {
    question: "What is your revision and feedback process during a project?",
    answer:
      "Each phase includes structured review rounds. You review functional staging links and provide feedback before we move to the next phase, ensuring alignment before final deployment.",
  },
  {
    question: "Do you assist with hosting, domain setup, and launch deployment?",
    answer:
      "Yes. I configure the deployment process on your preferred hosting environment (e.g., Cloudways, WP Engine, Kinsta, SiteGround, or VPS), configure SSL certificates, verify DNS records, and test all forms and integrations on production.",
  },
  {
    question: "Do you provide ongoing maintenance and technical support after launch?",
    answer:
      "Yes. I provide post-launch maintenance options covering WordPress core and plugin updates, security monitoring, database optimization, regular backups, and technical support as your site grows.",
  },
  {
    question: "How are project timelines estimated?",
    answer:
      "Timelines are determined by technical scope, number of unique page templates, custom dynamic fields, and third-party API requirements. Each project receives a defined milestone schedule before work begins.",
  },
];
