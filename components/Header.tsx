"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { siteConfig } from "@/data/portfolioData";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      <header className={`site-header ${mobileMenuOpen ? "menu-is-open" : ""}`}>
        <div className="header-shell">
          <a className="brand" href="#home" aria-label={`${siteConfig.name} - Back to top`}>
            <span className="brand-mark" aria-hidden="true">Z</span>
            <span className="brand-copy">
              Zeeshan<span>.ws</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary site navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <span className="availability">
              <i aria-hidden="true" /> {siteConfig.availability}
            </span>

            <a
              className="header-cta"
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Zeeshan on WhatsApp to discuss a project (opens in a new tab)"
            >
              Discuss a Project <ArrowRight size={14} aria-hidden="true" />
            </a>

            <button
              className="menu-button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              type="button"
            >
              {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  className="mobile-nav-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-hidden="true"
                />

                <motion.nav
                  id="mobile-navigation"
                  className="mobile-menu"
                  aria-label="Mobile navigation"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <div className="mobile-menu-links">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-menu-cta"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start a project <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
