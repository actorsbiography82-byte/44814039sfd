import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        background: "var(--bg)",
        color: "var(--ink)",
      }}
    >
      <div className="section-label" style={{ marginBottom: "16px" }}>
        <span aria-hidden="true" /> 404 Error
      </div>
      <h1
        style={{
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 750,
          margin: "0 0 16px",
          letterSpacing: "-0.03em",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          maxWidth: "480px",
          color: "var(--text-muted)",
          fontSize: "16px",
          lineHeight: 1.6,
          margin: "0 0 32px",
        }}
      >
        The page you are looking for doesn&apos;t exist or has been relocated.
      </p>
      <Link href="/" className="button button-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Return to Homepage
      </Link>
    </div>
  );
}

