"use client";

import Link from "next/link";

export default function SharedLayout({ children }) {
  return (
    <div className="min-h-screen">
      {/* Header — minimal */}
      <header className="sticky top-0 z-50 bg-[#09090B]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#10B981] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-white">WePickUpThePhone</span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Live
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-5 py-12 md:py-20">
        <div className="max-w-[1100px] mx-auto">{children}</div>
      </main>

      {/* Footer — barely there */}
      <footer className="border-t border-white/[0.04] mt-16">
        <div className="max-w-[1100px] mx-auto px-5 py-6 flex items-center justify-between text-[12px] text-zinc-700">
          <span>WePickUpThePhone</span>
          <span>AI-powered. Always on.</span>
        </div>
      </footer>
    </div>
  );
}
