"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CallWidget from "./CallWidget";
import { VERTICALS, VERTICAL_KEYS, getVertical, getAgentId, QC_VOICES } from "../lib/verticals";

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

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
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left — config */}
      <div className="lg:col-span-5 space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-[13px]">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          All industries
        </Link>

        <div>
          <p className="text-[11px] font-semibold text-[#10B981] tracking-wide uppercase mb-2">
            {vertical.label}
            {selectedSubVertical && vertical.subVerticals?.[selectedSubVertical] ? ` / ${vertical.subVerticals[selectedSubVertical].label}` : ""}
          </p>
          <h1 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-tight text-white leading-tight">
            Your AI receptionist
          </h1>
          <p className="text-[14px] text-zinc-500 mt-2">
            Type your business name — the AI uses it instantly.
          </p>
        </div>

        {/* Sub-vertical picker */}
        {vertical.subVerticals && (
          <div>
            <p className="text-[11px] font-semibold text-zinc-600 tracking-wide uppercase mb-2">Service type</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(vertical.subVerticals).map(([subKey, sub]) => (
                <button
                  key={subKey}
                  onClick={() => setSelectedSubVertical(selectedSubVertical === subKey ? null : subKey)}
                  className={`px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors ${
                    selectedSubVertical === subKey
                      ? "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Business name */}
        <div>
          <label htmlFor="biz" className="text-[11px] font-semibold text-zinc-600 tracking-wide uppercase mb-2 block">
            Business name
          </label>
          <input
            id="biz"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Smith & Associates"
            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-[15px] text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#10B981]/40 focus:ring-2 focus:ring-[#10B981]/10 transition-all"
          />
        </div>

        {/* Voice picker */}
        {vertical.hasVoicePicker && (
          <div>
            <p className="text-[11px] font-semibold text-zinc-600 tracking-wide uppercase mb-2">Voice</p>
            <div className="grid grid-cols-5 gap-2">
              {QC_VOICES.map((voice) => (
                <button
                  key={voice.name}
                  onClick={() => setSelectedVoice(voice)}
                  className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all ${
                    selectedVoice?.name === voice.name
                      ? "border-[#10B981]/40 bg-[#10B981]/8"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                    selectedVoice?.name === voice.name
                      ? "border-[#10B981]"
                      : "border-zinc-800 grayscale opacity-50"
                  }`}>
                    <img src={voice.photo} alt={voice.name} className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-[10px] font-medium ${
                    selectedVoice?.name === voice.name ? "text-[#10B981]" : "text-zinc-600"
                  }`}>{voice.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Desktop: capabilities */}
        <div className="hidden lg:block space-y-6 pt-2">
          <div>
            <p className="text-[11px] font-semibold text-zinc-600 tracking-wide uppercase mb-2">What it handles</p>
            {activeConfig.capabilities.map((cap, i) => (
              <div key={i} className="flex items-center gap-2.5 py-2 border-b border-zinc-800/50">
                <CheckIcon className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                <span className="text-[13px] text-zinc-400">{cap}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[11px] font-semibold text-zinc-600 tracking-wide uppercase mb-2">Try asking</p>
            {activeConfig.sampleQuestions.map((q, i) => (
              <p key={i} className="text-[12px] text-zinc-600 italic py-1">&ldquo;{q}&rdquo;</p>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/50">
            <p className="text-[11px] font-semibold text-zinc-700 tracking-wide uppercase mb-2">Other industries</p>
            <div className="flex flex-wrap gap-1.5">
              {VERTICAL_KEYS.filter((k) => k !== verticalKey).map((key) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  className="px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900/50 text-[11px] text-zinc-600 font-medium hover:border-zinc-700 hover:text-zinc-400 transition-colors"
                >
                  {VERTICALS[key].label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — call widget */}
      <div className="lg:col-span-7 lg:sticky lg:top-20">
        <CallWidget
          agentId={selectedSubVertical ? getAgentId(verticalKey, selectedSubVertical) : (selectedVoice ? selectedVoice.agentId : getAgentId(verticalKey, null))}
          businessName={businessName}
          vertical={verticalKey}
          title={businessName}
          description={activeConfig.description}
          sampleQuestions={activeConfig.sampleQuestions}
          extraVariables={selectedVoice ? { agent_name: selectedVoice.name } : undefined}
        />
      </div>

      {/* Mobile: capabilities */}
      <div className="lg:hidden space-y-6">
        <div>
          <p className="text-[11px] font-semibold text-zinc-600 tracking-wide uppercase mb-2">What it handles</p>
          {activeConfig.capabilities.map((cap, i) => (
            <div key={i} className="flex items-center gap-2.5 py-2 border-b border-zinc-800/50">
              <CheckIcon className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
              <span className="text-[13px] text-zinc-400">{cap}</span>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[11px] font-semibold text-zinc-600 tracking-wide uppercase mb-2">Try asking</p>
          {activeConfig.sampleQuestions.map((q, i) => (
            <p key={i} className="text-[12px] text-zinc-600 italic py-1">&ldquo;{q}&rdquo;</p>
          ))}
        </div>

        <div className="pt-4 border-t border-zinc-800/50">
          <p className="text-[11px] font-semibold text-zinc-700 tracking-wide uppercase mb-2">Other industries</p>
          <div className="flex flex-wrap gap-1.5">
            {VERTICAL_KEYS.filter((k) => k !== verticalKey).map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                className="px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900/50 text-[11px] text-zinc-600 font-medium hover:border-zinc-700 hover:text-zinc-400 transition-colors"
              >
                {VERTICALS[key].label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
