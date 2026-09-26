import { CheckCircle2, Globe2, ShieldCheck } from "lucide-react";
import { capabilitiesData, principlesData } from "@/data/portfolioData";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="section-shell">
        <div className="about-editorial-grid">
          {/* Main Editorial Narrative & Accountability Spotlight */}
          <div className="about-main-column">
            <Reveal>
              <div className="section-label">
                <span aria-hidden="true" />
                About Zeeshan
              </div>
              <h2 id="about-heading" className="about-editorial-heading">
                Direct collaboration with the engineer writing your code.
              </h2>
              <p className="about-lead">
                I&apos;m Zeeshan, an independent web developer specializing in custom WordPress builds,
                WooCommerce stores, and pragmatic AI web integrations.
              </p>
              <p className="about-body">
                Rather than working through account managers or relying on bloated off-the-shelf themes,
                I collaborate directly with founders, business owners, and digital agencies. This ensures
                technical choices, site speed, and conversion strategy remain directly connected from the
                first consultation to launch day.
              </p>
            </Reveal>

            {/* Direct Technical Accountability Spotlight Banner */}
            <Reveal delay={0.12}>
              <div className="about-accountability-card">
                <div className="accountability-icon-wrap" aria-hidden="true">
                  <ShieldCheck size={26} />
                </div>
                <div className="accountability-content">
                  <span className="accountability-badge">Direct Technical Accountability</span>
                  <p>
                    You communicate directly with the engineer architecting your database schemas,
                    writing your templates, hardening security, and deploying your production code.
                    No middlemen, no hand-off losses.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="about-location-tag">
                <Globe2 size={16} aria-hidden="true" />
                <span>Based in Pakistan · Serving International Founders & Agencies Worldwide</span>
              </div>
            </Reveal>
          </div>

          {/* Integrated Engineering Principles & Core Capabilities */}
          <div className="about-principles-column">
            <Reveal delay={0.08}>
              <div className="about-aside-header">
                <span className="aside-eyebrow">Engineering Standards</span>
                <h3>How I approach web projects</h3>
              </div>
            </Reveal>

            <div className="about-principles-list" role="list">
              {principlesData.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <Reveal key={principle.title} delay={0.12 + index * 0.05}>
                    <div className="about-principle-card" role="listitem">
                      <div className="principle-card-top">
                        <div className="principle-card-icon" aria-hidden="true">
                          <Icon size={20} />
                        </div>
                        <span className="principle-index">0{index + 1}</span>
                      </div>
                      <h4>{principle.title}</h4>
                      <p>{principle.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Integrated Specialized Capabilities */}
            <Reveal delay={0.28}>
              <div className="about-capabilities-wrap">
                <span className="capabilities-label">Technical Competencies</span>
                <div className="about-capabilities-grid" aria-label="Specialized capabilities">
                  {capabilitiesData.map((cap) => {
                    const Icon = cap.icon;
                    return (
                      <div className="about-capability-chip" key={cap.title}>
                        <Icon size={14} aria-hidden="true" />
                        <span>{cap.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
