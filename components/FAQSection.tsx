"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqsData, siteConfig } from "@/data/portfolioData";
import { Reveal } from "@/components/ui/Reveal";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-heading">
      <div className="section-shell faq-grid">
        <div className="faq-intro-wrap">
          <Reveal>
            <div className="section-label">
              <span aria-hidden="true" />
              Frequently Asked Questions
            </div>
            <div className="faq-intro">
              <h2 id="faq-heading">Answers to common project inquiries.</h2>
              <p style={{ marginTop: "16px" }}>
                Before starting an engagement, here are common clarifications on fit, stack, and
                collaboration processes.
              </p>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-contact-prompt"
              >
                Have a specific question? Ask directly <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="faq-list">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <Reveal key={faq.question} delay={index * 0.04}>
                <div className={`faq-item ${isOpen ? "open" : ""}`}>
                  <h3>
                    <button
                      id={triggerId}
                      className="faq-trigger"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      type="button"
                    >
                      <span>{faq.question}</span>
                      <span className="faq-indicator" aria-hidden="true">
                        <Plus size={16} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={shouldReduceMotion ? {} : { height: "auto", opacity: 1 }}
                        exit={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="faq-answer-inner">
                          <p style={{ margin: 0 }}>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

