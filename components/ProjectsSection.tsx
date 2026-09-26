import { projectsData } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectsSection() {
  return (
    <section className="section work" id="work" aria-labelledby="work-heading">
      <div id="case-studies" className="scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="section-shell">
        <Reveal>
          <div className="section-label">
            <span aria-hidden="true" />
            Selected Case Studies
          </div>
          <div className="section-heading split-heading">
            <h2 id="work-heading">Engineered around the problem, not a generic template.</h2>
            <p>
              Explore production-grade implementations spanning on-demand multi-city service platforms,
              direct hospitality ordering, editorial luxury e-commerce, and automated conversational AI copilots.
            </p>
          </div>
        </Reveal>

        <div className="projects-list">
          {projectsData.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

