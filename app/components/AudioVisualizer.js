"use client";

import { useState, useEffect } from "react";

const BAR_COUNT = 7;
const STATIC_HEIGHTS = Array(BAR_COUNT).fill(3);

export default function AudioVisualizer({ isAgentTalking }) {
  const [heights, setHeights] = useState(STATIC_HEIGHTS);

  useEffect(() => {
    if (!isAgentTalking) {
      setHeights(STATIC_HEIGHTS);
      return;
    }
    const interval = setInterval(() => {
      setHeights(Array.from({ length: BAR_COUNT }, () => 4 + Math.random() * 28));
    }, 90);
    return () => clearInterval(interval);
  }, [isAgentTalking]);

  return (
    <div className="flex items-center justify-center gap-[4px] h-10">
      {(isAgentTalking ? heights : STATIC_HEIGHTS).map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full"
          style={{
            height: `${h}px`,
            backgroundColor: isAgentTalking ? "#10B981" : "#27272A",
            boxShadow: isAgentTalking ? "0 0 8px rgba(16, 185, 129, 0.3)" : "none",
            transition: "all 80ms ease-out",
          }}
        />
      ))}
    </div>
  );
}
