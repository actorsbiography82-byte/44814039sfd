import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/portfolioData";
import { Reveal } from "@/components/ui/Reveal";

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="section-shell contact-shell">
        <Reveal>
          <div className="contact-kicker">
            <span aria-hidden="true" /> {siteConfig.availability}
          </div>

          <h2 id="contact-heading">
            Let&apos;s discuss your next <span>website project.</span>
          </h2>

          <p>
            Send your website URL, project brief, or technical requirements. I&apos;ll review the
            scope and recommend the most practical next step.
          </p>

          <div className="contact-actions">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              Start a Project Conversation <ArrowRight size={15} aria-hidden="true" />
            </a>

            <div className="contact-direct-links">
              <a
                href={`mailto:${siteConfig.email}`}
                className="contact-direct-link"
                aria-label={`Send email to ${siteConfig.email}`}
              >
                <Mail size={16} aria-hidden="true" /> {siteConfig.email}
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-link"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp: {siteConfig.whatsappDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

