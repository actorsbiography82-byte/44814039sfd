import { techStackItems } from "@/data/portfolioData";

export function StackMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const displayItems = [...techStackItems, ...techStackItems];

  return (
    <div className="marquee-wrap" aria-label="Core technologies and expertise">
      <div className="marquee-track" aria-hidden="true">
        {displayItems.map((item, index) => (
          <div className="marquee-item" key={`${item}-${index}`}>
            <span />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

