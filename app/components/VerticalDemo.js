"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CallWidget from "./CallWidget";
import { VERTICALS, VERTICAL_KEYS, getVertical, getAgentId, QC_VOICES } from "../lib/verticals";

// ─── Icons ───
function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowLeftIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ─── Vertical icons ───
const VERTICAL_ICONS = {
  scale: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v18" strokeLinecap="round" /><path d="M1 7l5-4 5 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 7l5-4 5 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 7c0 3 2.5 5 5 5s5-2 5-5" /><path d="M13 7c0 3 2.5 5 5 5s5-2 5-5" />
    </svg>
  ),
  building: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
      <path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" />
      <path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
  ),
  utensils: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  tooth: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5.5C10 3 7.5 2 5.5 3S2 6.5 3 9c1.5 4 2 6 3 9s2 4 3.5 4S12 20 12 17" />
      <path d="M12 5.5C14 3 16.5 2 18.5 3S22 6.5 21 9c-1.5 4-2 6-3 9s-2 4-3.5 4S12 20 12 17" />
    </svg>
  ),
  paw: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="4" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="4" cy="8" r="2" />
      <circle cx="8" cy="8" r="2" /><circle cx="14" cy="8" r="2" />
      <path d="M10 17c.6-1.7 1.8-3 3-3s2.4 1.3 3 3c.7 2-1 4-3 4s-3.7-2-3-4z" />
    </svg>
  ),
  wrench: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  key: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  scissors: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  bed: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" />
      <path d="M6 8v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    </svg>
  ),
};

// ─── Framer Motion variants ───
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function VerticalDemo({ verticalKey, nameParam }) {
  const vertical = getVertical(verticalKey);
  const [selectedSubVertical, setSelectedSubVertical] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(vertical?.hasVoicePicker ? QC_VOICES[0] : null);
  const activeConfig = (vertical?.subVerticals && selectedSubVertical && vertical.subVerticals[selectedSubVertical])
    ? vertical.subVerticals[selectedSubVertical]
    : vertical;

  const defaultName = nameParam || (activeConfig ? activeConfig.defaultName : "");
  const [businessName, setBusinessName] = useState(defaultName);

  useEffect(() => {
    const name = nameParam || (activeConfig ? activeConfig.defaultName : "");
    setBusinessName(name);
  }, [selectedSubVertical, nameParam, activeConfig]);

  if (!vertical) return null;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
    >
      {/* Left column */}
      <motion.div className="lg:col-span-5 space-y-8" variants={staggerContainer}>
        <motion.div variants={fadeUp}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#5A5A52] hover:text-[#A8A8A0] transition-colors text-[13px] font-light group"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            All industries
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-5">
          {/* Industry badge */}
          <div className="inline-flex items-center gap-2.5 text-[#C9963A]">
            {VERTICAL_ICONS[vertical.icon] || VERTICAL_ICONS.building}
            <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#C9963A]/70">
              {vertical.label}
              {selectedSubVertical && vertical.subVerticals?.[selectedSubVertical]
                ? ` / ${vertical.subVerticals[selectedSubVertical].label}`
                : ""}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(1.75rem,3.5vw,2.6rem)] font-extrabold tracking-[-0.03em] leading-[1.08] text-white">
            Your AI receptionist,
            <br />
            <span
              className="text-[#C9963A]"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              ready to talk.
            </span>
          </h1>
          <p className="text-[15px] text-[#6B6B63] leading-relaxed font-light">
            Type your business name below — the AI greets callers as your front desk.
          </p>
        </motion.div>

        {/* Sub-vertical picker */}
        {vertical.subVerticals && (
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-[10px] font-semibold text-[#C9963A]/50 tracking-[0.14em] uppercase">
              Service type
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(vertical.subVerticals).map(([subKey, sub]) => (
                <motion.button
                  key={subKey}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedSubVertical(selectedSubVertical === subKey ? null : subKey)}
                  className={`px-3.5 py-2 rounded-lg border text-[12px] font-medium transition-all duration-200 ${
                    selectedSubVertical === subKey
                      ? "border-[#C9963A]/30 bg-[#C9963A]/8 text-[#C9963A]"
                      : "border-[#1E1E24] bg-[#0E0E11] text-[#6B6B63] hover:border-[#C9963A]/15 hover:text-[#C9963A]"
                  }`}
                >
                  {sub.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Business name input */}
        <motion.div variants={fadeUp} className="space-y-2.5">
          <label
            htmlFor="business-name"
            className="text-[10px] font-semibold text-[#C9963A]/50 tracking-[0.14em] uppercase"
          >
            Business name
          </label>
          <div className="relative">
            <input
              id="business-name"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Smith & Associates"
              className="w-full px-4 py-3.5 rounded-xl border border-[#1E1E24] bg-[#0E0E11] text-[15px] text-white font-medium placeholder:text-[#2A2A30] transition-all"
            />
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: [0, -6, 0, -3, 0] }}
              transition={{
                opacity: { delay: 0.6, duration: 0.3 },
                y: { delay: 0.6, duration: 1.8, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" },
              }}
              className="absolute -top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C9963A] text-[#08080A] text-[10px] font-semibold tracking-wide shadow-[0_0_16px_rgba(201,150,58,0.25)]"
            >
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              Try your business name
            </motion.div>
          </div>
          <p className="text-[11px] text-[#3A3A42] font-light">
            The AI adapts its greeting instantly
          </p>
        </motion.div>

        {/* Voice picker for QC home services */}
        {vertical.hasVoicePicker && (
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-[10px] font-semibold text-[#C9963A]/50 tracking-[0.14em] uppercase">
              Choose a voice
            </p>
            <div className="grid grid-cols-5 gap-2">
              {QC_VOICES.map((voice) => (
                <motion.button
                  key={voice.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedVoice(voice)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                    selectedVoice?.name === voice.name
                      ? "border-[#C9963A]/40 bg-[#C9963A]/8 shadow-[0_0_20px_rgba(201,150,58,0.1)]"
                      : "border-[#1E1E24] bg-[#0E0E11] hover:border-[#C9963A]/15"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                      selectedVoice?.name === voice.name
                        ? "border-[#C9963A] shadow-[0_0_14px_rgba(201,150,58,0.25)]"
                        : "border-[#1E1E24] grayscale opacity-50"
                    }`}
                  >
                    <img src={voice.photo} alt={voice.name} className="w-full h-full object-cover" />
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      selectedVoice?.name === voice.name ? "text-[#C9963A]" : "text-[#5A5A52]"
                    }`}
                  >
                    {voice.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Desktop: capabilities + questions */}
        <div className="hidden lg:block space-y-8 pt-4">
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-[10px] font-semibold text-[#3A3A42] tracking-[0.14em] uppercase">
              Capabilities
            </p>
            <div className="space-y-0.5">
              {activeConfig.capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 py-2.5 border-b border-[#141418]"
                >
                  <CheckIcon className="w-3.5 h-3.5 text-[#C9963A]/60 flex-shrink-0" />
                  <span className="text-[13px] text-[#7A7A72] font-light">{cap}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-[10px] font-semibold text-[#3A3A42] tracking-[0.14em] uppercase">
              Try asking
            </p>
            <div className="space-y-2">
              {activeConfig.sampleQuestions.map((q, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  className="text-[12px] text-[#4A4A45] font-light leading-relaxed"
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
                >
                  &ldquo;{q}&rdquo;
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-3 pt-6 border-t border-[#141418]">
            <p className="text-[10px] font-semibold text-[#2A2A30] tracking-[0.14em] uppercase">
              Other industries
            </p>
            <div className="flex flex-wrap gap-1.5">
              {VERTICAL_KEYS.filter((k) => k !== verticalKey).map((key) => (
                <motion.div key={key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${key}`}
                    className="inline-block px-3 py-1.5 rounded-lg border border-[#1E1E24] bg-[#0E0E11] hover:border-[#C9963A]/15 hover:text-[#C9963A] text-[11px] text-[#3A3A42] font-medium transition-all"
                  >
                    {VERTICALS[key].label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Call Widget */}
      <motion.div className="lg:col-span-7 lg:sticky lg:top-24" variants={slideInRight}>
        <CallWidget
          agentId={selectedSubVertical ? getAgentId(verticalKey, selectedSubVertical) : (selectedVoice ? selectedVoice.agentId : getAgentId(verticalKey, null))}
          businessName={businessName}
          vertical={verticalKey}
          title={businessName}
          description={activeConfig.description}
          sampleQuestions={activeConfig.sampleQuestions}
          extraVariables={selectedVoice ? { agent_name: selectedVoice.name } : undefined}
        />
      </motion.div>

      {/* Mobile: capabilities + questions */}
      <motion.div variants={fadeUp} className="lg:hidden space-y-8">
        <div className="space-y-3">
          <p className="text-[10px] font-semibold text-[#3A3A42] tracking-[0.14em] uppercase">
            Capabilities
          </p>
          <div className="space-y-0.5">
            {activeConfig.capabilities.map((cap, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#141418]">
                <CheckIcon className="w-3.5 h-3.5 text-[#C9963A]/60 flex-shrink-0" />
                <span className="text-[13px] text-[#7A7A72] font-light">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-semibold text-[#3A3A42] tracking-[0.14em] uppercase">
            Try asking
          </p>
          <div className="space-y-2">
            {activeConfig.sampleQuestions.map((q, i) => (
              <p
                key={i}
                className="text-[12px] text-[#4A4A45] font-light leading-relaxed"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                &ldquo;{q}&rdquo;
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t border-[#141418]">
          <p className="text-[10px] font-semibold text-[#2A2A30] tracking-[0.14em] uppercase">
            Other industries
          </p>
          <div className="flex flex-wrap gap-1.5">
            {VERTICAL_KEYS.filter((k) => k !== verticalKey).map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                className="px-3 py-1.5 rounded-lg border border-[#1E1E24] bg-[#0E0E11] hover:border-[#C9963A]/15 hover:text-[#C9963A] text-[11px] text-[#3A3A42] font-medium transition-all"
              >
                {VERTICALS[key].label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
