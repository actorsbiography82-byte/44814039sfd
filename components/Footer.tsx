import { ArrowUp, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/portfolioData";

export function Footer() {
  const currentYear = 2026; // Safe constant to prevent hydration mismatch

  return (
    <footer className="footer" role="contentinfo">
      <div className="section-shell footer-grid">
        <div>
          <a className="brand footer-brand" href="#home" aria-label="Zeeshan Web Solution - Back to top">
            <span className="brand-mark" aria-hidden="true">Z</span>
            <span className="brand-copy">
              Zeeshan<span>.ws</span>
            </span>
          </a>
          <p className="footer-desc">
            WordPress engineering, WooCommerce architectures, and AI-powered web solutions crafted
            for international founders and ambitious brands.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-column">
            <span>Navigation</span>
            <a href="#services">Services</a>
            <a href="#work">Case Studies</a>
            <a href="#process">Process</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-links-column">
            <span>Connect</span>
            <a href={`mailto:${siteConfig.email}`}>
              <Mail size={13} aria-hidden="true" /> Email
            </a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={13} aria-hidden="true" /> WhatsApp
            </a>
            <a href="#home">
              <ArrowUp size={13} aria-hidden="true" /> Back to top
            </a>
          </div>
        </div>
      </div>

      <div className="section-shell footer-bottom">
        <span>© {currentYear} {siteConfig.name}. All rights reserved.</span>
        <span>Designed for clarity · Engineered for performance</span>
      </div>
    </footer>
  );
}

