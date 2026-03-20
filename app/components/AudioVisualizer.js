"use client";

import { useState, useEffect } from "react";

const BAR_COUNT = 9;
const STATIC_HEIGHTS = Array(BAR_COUNT).fill(3);

export default function AudioVisualizer({ isAgentTalking }) {
  const [heights, setHeights] = useState(STATIC_HEIGHTS);

  useEffect(() => {
    if (!isAgentTalking) {
      setHeights(STATIC_HEIGHTS);
      return;
    }
    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: BAR_COUNT }, (_, i) => {
          // Center bars are taller for a natural waveform shape
          const centerBias = 1 - Math.abs(i - (BAR_COUNT - 1) / 2) / ((BAR_COUNT - 1) / 2);
          const base = 4 + centerBias * 16;
          return base + Math.random() * 20;
        })
      );
    }, 90);
    return () => clearInterval(interval);
  }, [isAgentTalking]);

  return (
    <div className="flex items-center justify-center gap-[4px] h-12">
      {(isAgentTalking ? heights : STATIC_HEIGHTS).map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all"
          style={{
            height: `${h}px`,
            backgroundColor: isAgentTalking ? "#C9963A" : "#2A2A30",
            boxShadow: isAgentTalking
              ? "0 0 10px rgba(201, 150, 58, 0.25)"
              : "none",
            transitionDuration: isAgentTalking ? "80ms" : "300ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      ))}
    </div>
  );
}
