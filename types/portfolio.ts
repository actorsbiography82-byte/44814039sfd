import type { LucideIcon } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  url?: string;
  technologies: string[];
  services: string[];
  challenge: string;
  solution: string;
  result: string;
  technicalHighlights?: { label: string; value: string }[];
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CapabilityItem {
  title: string;
  icon: LucideIcon;
}

export interface PrincipleItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CapabilityAnchor {
  title: string;
  subtitle: string;
}
