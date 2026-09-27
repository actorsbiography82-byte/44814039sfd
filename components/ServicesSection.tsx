import { servicesData } from "@/data/portfolioData";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesSection() {
  return (
    <section className="section services" id="services" aria-labelledby="services-heading">
      <div className="section-shell">
        <Reveal>
          <div className="section-label">
            <span aria-hidden="true" />
            Core Capabilities
          </div>
          <div className="section-heading split-heading">
            <h2 id="services-heading">Focused engineering for business and e-commerce websites.</h2>
            <p>
              I combine custom WordPress development, WooCommerce architecture, and targeted AI tools
              to build websites that load fast, remain easy to manage, and support business growth.
            </p>
          </div>
        </Reveal>

        <div className="service-grid">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.05}>
                <article className="service-card group cursor-default">
                  <div className="service-card-header">
                    <div className="service-icon" aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <span className="service-card-number">{service.number}</span>
                  </div>

                  <div className="service-card-body">
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-description">{service.description}</p>
                  </div>

                  <div className="service-divider" aria-hidden="true" />

                  <div className="service-deliverables-wrap">
                    <span className="service-deliverables-heading">Deliverables</span>
                    <ul className="service-deliverables" aria-label={`Key deliverables for ${service.title}`}>
                      {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
