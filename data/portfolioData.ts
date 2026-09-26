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
  phone: "+92 305 7046739",
  location: "Worldwide Delivery · Based in Pakistan",
  availability: "Available for Select Projects",
  profileImage: "/images/e081a0e1-79db-4081-ba5f-0b153db2e6c4.png",
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
    id: "propmix",
    title: "PropMix Real Estate",
    subtitle: "Real Estate Directory & Multi-Agent Listing Platform",
    description:
      "A dynamic real-estate portal engineered with custom listing workflows, front-end submission forms, agent dashboards, and advanced filtering.",
    image: "/images/een-1080-x-1080-px-3.png",
    url: "https://dev-prop-mix.pantheonsite.io",
    technologies: ["WordPress", "JetEngine", "PHP", "Elementor Pro", "REST API"],
    services: ["CMS Architecture", "Custom Field Modeling", "Front-end UX", "Speed Optimization"],
    challenge:
      "The client required a structured property directory where agents could submit and manage real estate listings directly from the front-end without accessing the WordPress admin dashboard.",
    solution:
      "Architected custom post types and relational taxonomies via JetEngine, developed role-restricted front-end posting forms, and implemented faceted AJAX search queries for instantaneous property filtering.",
    result:
      "Delivered a multi-agent directory platform with streamlined content moderation and responsive search performance across devices.",
    technicalHighlights: [
      { label: "Architecture", value: "Custom CPT + Taxonomies" },
      { label: "Front-end", value: "Role-aware Agent Dashboard" },
    ],
  },
  {
    id: "zaiqabites",
    title: "ZaiqaBites Hospitality",
    subtitle: "Hospitality & Digital Direct-Ordering Experience",
    description:
      "A fast-loading digital restaurant experience centered on visual menu exploration, dietary filtering, and direct customer ordering.",
    image: "/images/een-1080-x-1080-px-5.png",
    url: "https://dev-zaiqa-bites.pantheonsite.io",
    technologies: ["WordPress", "Elementor Pro", "WooCommerce", "Custom PHP", "Mobile UX"],
    services: ["UI/UX Engineering", "Menu Architecture", "Mobile Optimization", "Local SEO"],
    challenge:
      "A complex multi-category restaurant menu was cumbersome on mobile devices, creating friction for customers looking to place direct orders quickly.",
    solution:
      "Re-engineered the menu showcase with a clear category navigation bar, responsive nutritional highlights, and an intuitive direct-to-WhatsApp/call ordering workflow.",
    result:
      "Built a modern culinary showcase that makes dish discovery and direct ordering straightforward on mobile screens.",
    technicalHighlights: [
      { label: "Mobile UX", value: "Sticky Category Navigation" },
      { label: "Ordering Flow", value: "Direct Conversion Path" },
    ],
  },
  {
    id: "rivaah",
    title: "Rivaah Fashion",
    subtitle: "Editorial Luxury Fashion & High-Speed E-Commerce",
    description:
      "An editorial apparel boutique combining minimalist typography with curated product lookbooks and streamlined checkout flows.",
    image: "/images/een-1080-x-1080-px-6.png",
    url: "https://dev-rivaah.pantheonsite.io",
    technologies: ["WooCommerce", "WordPress", "Custom PHP", "Stripe API", "UX Architecture"],
    services: ["Store Architecture", "Checkout UX", "Catalog Optimization", "Speed Engineering"],
    challenge:
      "The apparel brand needed an e-commerce storefront with the visual restraint of high-end editorial design while remaining simple for an in-house team to manage.",
    solution:
      "Developed a custom WooCommerce theme with a neutral color palette, generous whitespace, optimized product imagery, and an uncluttered single-page checkout.",
    result:
      "Delivered an editorial boutique storefront optimized for mobile browsing and fast checkout completion.",
    technicalHighlights: [
      { label: "Storefront", value: "Editorial Grid Architecture" },
      { label: "Checkout", value: "Friction-free UX" },
    ],
  },
  {
    id: "synthetix-ai",
    title: "Synthetix AI Copilot",
    subtitle: "Intelligent Customer Support & Lead Routing Web App",
    description:
      "An automated customer intelligence system integrating conversational AI assistants into WordPress websites to qualify inbound B2B sales leads.",
    image: "/images/een-1080-x-1080-px-4.png",
    url: "https://wa.me/923057046739",
    technologies: ["WordPress", "Next.js", "OpenAI API", "PHP", "Tailwind CSS"],
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
