"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function PhoneLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="7" fill="#C9963A" fillOpacity="0.1" stroke="#C9963A" strokeOpacity="0.2" strokeWidth="1" />
      <path
        d="M18.5 15.92v1.5a1 1 0 0 1-1.09 1 9.9 9.9 0 0 1-4.31-1.54 9.75 9.75 0 0 1-3-3 9.9 9.9 0 0 1-1.54-4.34A1 1 0 0 1 9.55 8.5h1.5a1 1 0 0 1 1 .86 6.42 6.42 0 0 0 .35 1.4 1 1 0 0 1-.23 1.06l-.63.63a8 8 0 0 0 3 3l.63-.63a1 1 0 0 1 1.06-.23 6.42 6.42 0 0 0 1.4.35 1 1 0 0 1 .87 1.02z"
        stroke="#C9963A"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SharedLayout({ children }) {
  return (
    <div className="min-h-screen relative">
      {/* Ambient gradient — warm amber glow from top */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -8%, rgba(201, 150, 58, 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 bg-[#08080A]/80 backdrop-blur-2xl border-b border-[#18181D]"
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <PhoneLogo />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#EDEDEA] group-hover:text-white transition-colors">
                WePickUpThePhone
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#C9963A]/60">
              <span className="relative flex h-[6px] w-[6px]">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-[#C9963A] opacity-30"
                  style={{ animation: "ring-pulse 2.5s ease-out infinite" }}
                />
                <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-[#C9963A]" />
              </span>
              Live Demo
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main */}
      <main className="relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">{children}</div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 border-t border-[#141418] mt-24"
      >
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PhoneLogo />
            <span className="text-[13px] font-medium text-[#3A3A42]">
              WePickUpThePhone
            </span>
          </div>
          <p className="text-[12px] text-[#2A2A30] font-light tracking-wide">
            AI-powered receptionists.{" "}
            <span className="italic" style={{ fontFamily: "var(--font-display)" }}>
              Always on.
            </span>
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
