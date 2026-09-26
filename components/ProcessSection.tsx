import { ArrowRight, CheckCircle } from "lucide-react";
import { processData } from "@/data/portfolioData";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessSection() {
  return (
    <section className="section process" id="process" aria-labelledby="process-heading">
      <div className="section-shell process-shell">
        <div className="process-intro-wrap">
          <Reveal>
            <div className="section-label">
              <span aria-hidden="true" />
              Delivery Process
            </div>
            <div className="process-intro">
              <h2 id="process-heading">Clarity before code. Disciplined execution after.</h2>
              <p className="process-lead">
                A transparent, step-by-step engineering roadmap keeps business strategy, design
                decisions, and technical implementation closely aligned from kickoff to deployment.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="process-timeline" role="list" aria-label="Development Process Timeline">
          <div className="process-timeline-rail" aria-hidden="true" />
          {processData.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.05} className="process-timeline-item">
              <div className="process-step-node" aria-hidden="true">
                <span>{step.number}</span>
              </div>

              <div className="process-step-card">
                <div className="process-step-header">
                  <span className="process-step-number">{step.number}</span>
                  <span className="process-step-phase">Stage {index + 1}</span>
                </div>

                <div className="process-step-body">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
