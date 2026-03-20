"use client";

import Link from "next/link";
import { VERTICALS, VERTICAL_KEYS } from "./lib/verticals";

// ─── Industry images (Unsplash) ───
const IMAGES = {
  lawyer: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=480&h=320&fit=crop&auto=format&q=80",
  "real-estate": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=480&h=320&fit=crop&auto=format&q=80",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=480&h=320&fit=crop&auto=format&q=80",
  "restaurant-se": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&h=320&fit=crop&auto=format&q=80",
  dental: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=480&h=320&fit=crop&auto=format&q=80",
  "vet-clinic": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=480&h=320&fit=crop&auto=format&q=80",
  "home-services": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=480&h=320&fit=crop&auto=format&q=80",
  "property-management": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=480&h=320&fit=crop&auto=format&q=80",
  insurance: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=480&h=320&fit=crop&auto=format&q=80",
  "salon-spa": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=480&h=320&fit=crop&auto=format&q=80",
  hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=480&h=320&fit=crop&auto=format&q=80",
  "home-services-qc": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=480&h=320&fit=crop&auto=format&q=80",
};

// ─── Icons ───
const ICONS = {
  scale: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v18" strokeLinecap="round" /><path d="M1 7l5-4 5 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 7l5-4 5 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 7c0 3 2.5 5 5 5s5-2 5-5" /><path d="M13 7c0 3 2.5 5 5 5s5-2 5-5" />
    </svg>
  ),
  building: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
      <path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" />
      <path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
  ),
  utensils: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  tooth: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5.5C10 3 7.5 2 5.5 3S2 6.5 3 9c1.5 4 2 6 3 9s2 4 3.5 4S12 20 12 17" />
      <path d="M12 5.5C14 3 16.5 2 18.5 3S22 6.5 21 9c-1.5 4-2 6-3 9s-2 4-3.5 4S12 20 12 17" />
    </svg>
  ),
  paw: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="4" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="4" cy="8" r="2" />
      <circle cx="8" cy="8" r="2" /><circle cx="14" cy="8" r="2" />
      <path d="M10 17c.6-1.7 1.8-3 3-3s2.4 1.3 3 3c.7 2-1 4-3 4s-3.7-2-3-4z" />
    </svg>
  ),
  wrench: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  key: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  shield: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  scissors: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  bed: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" />
      <path d="M6 8v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    </svg>
  ),
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-tight text-white leading-tight">
          Answer every call. Impress every caller.
        </h1>
        <p className="mt-3 text-[16px] text-zinc-400">
          Pick your industry. Talk to your AI receptionist.
        </p>
      </div>

      {/* Industry grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {VERTICAL_KEYS.map((key) => {
          const v = VERTICALS[key];
          return (
            <Link
              key={key}
              href={`/${key}`}
              className="group block rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-600 transition-all duration-200 active:scale-[0.98]"
            >
              {/* Image */}
              <div className="h-28 sm:h-32 overflow-hidden bg-zinc-800">
                <img
                  src={IMAGES[key]}
                  alt={v.label}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Label */}
              <div className="px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-zinc-600 group-hover:text-[#10B981] transition-colors">
                    {ICONS[v.icon] || ICONS.building}
                  </span>
                  <span className="text-[14px] font-semibold text-zinc-300 group-hover:text-white transition-colors">
                    {v.label}
                  </span>
                </div>
                <svg className="w-4 h-4 text-zinc-700 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
