import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolioData";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f8f7f4",
          color: "#141716",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, fontWeight: 700 }}>
          <div
            style={{
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
              background: "#285141",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            Z
          </div>
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 70,
              lineHeight: 1.05,
              letterSpacing: "-3px",
              fontWeight: 800,
              maxWidth: 960,
              color: "#141716",
            }}
          >
            WordPress Developer & AI Website Developer
          </div>
          <div style={{ fontSize: 25, color: "#59635e", fontWeight: 500 }}>
            Custom Theme Architecture · WooCommerce · Practical AI · Technical SEO
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(20, 23, 22, 0.12)",
            paddingTop: "24px",
            fontSize: 20,
            color: "#7f8984",
          }}
        >
          <span>Serving International Clients Worldwide</span>
          <span>zeeshan.ws</span>
        </div>
      </div>
    ),
    size,
  );
}
