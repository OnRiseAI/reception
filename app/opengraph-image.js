import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "We Pick Up The Phone — AI Voice Receptionist Demo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #050810 0%, #0B1020 50%, #050810 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            width: "700px",
            height: "450px",
            background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "36px",
            boxShadow: "0 20px 60px rgba(245, 158, 11, 0.25)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#050810" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: "800",
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "8px",
            letterSpacing: "-1px",
          }}
        >
          Your Business Never
        </div>
        <div
          style={{
            fontSize: "52px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #F59E0B, #FBBF24)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "28px",
            letterSpacing: "-1px",
          }}
        >
          Misses a Call Again
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "20px",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            fontWeight: "400",
          }}
        >
          AI Voice Receptionist — Try the Live Demo
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "56px", marginTop: "52px" }}>
          {[
            { value: "<600ms", label: "Response" },
            { value: "24/7", label: "Available" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "26px", fontWeight: "700", color: "#F59E0B" }}>{stat.value}</span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "3px" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: "absolute", bottom: "32px", fontSize: "14px", color: "rgba(255,255,255,0.15)", letterSpacing: "2px" }}>
          wepickupthephone.com
        </div>
      </div>
    ),
    { ...size }
  );
}
