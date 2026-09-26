import { principlesData } from "@/data/portfolioData";
import { Reveal } from "@/components/ui/Reveal";

export function PrinciplesSection() {
  return (
    <section className="principles-section" aria-label="Core Engineering Principles">
      <div className="section-shell">
        <div className="principles-grid">
          {principlesData.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Reveal key={principle.title} delay={index * 0.05}>
                <div className="principle-item">
                  <Icon size={26} aria-hidden="true" />
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

