import { ImageResponse } from "next/og";

export const alt = "DS Global Ventures — Reliable Chemical Sourcing. Trusted Global Trade.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const ring = [-90, -30, 30, 90, 150, 210].map((d) => {
    const r = (d * Math.PI) / 180;
    return [200 + 120 * Math.cos(r), 230 + 120 * Math.sin(r)];
  });
  const path = ring.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + " Z";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(900px 500px at 85% 0%, rgba(47,199,180,0.22), transparent 60%), linear-gradient(180deg,#f7faff,#eaf3fb)",
          color: "#10294a",
          padding: "70px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg,#5B9BF5,#174EAD)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              DS
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>DS GLOBAL VENTURES</div>
              <div style={{ fontSize: 16, letterSpacing: 5, color: "#1E63D6" }}>CHEMICAL TRADING &amp; SOURCING</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Reliable Chemical Sourcing.</div>
            <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#1E63D6" }}>
              Trusted Global Trade.
            </div>
          </div>
          <div style={{ fontSize: 22, color: "#4A5B75" }}>
            Phenol · Paraformaldehyde · Formaldehyde · Methanol · Acetone
          </div>
        </div>
        <svg width="400" height="460" viewBox="0 0 400 460" style={{ position: "absolute", right: 40, top: 80, opacity: 0.35 }}>
          <path d={path} fill="none" stroke="#1E63D6" strokeWidth="5" />
          <line x1="200" y1="110" x2="200" y2="30" stroke="#1E63D6" strokeWidth="5" />
        </svg>
      </div>
    ),
    size,
  );
}
