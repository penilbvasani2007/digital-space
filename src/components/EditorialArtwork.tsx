import React from 'react';

interface EditorialArtworkProps {
  type: 'tokens' | 'generative-ui' | 'diffusion' | 'code-ast' | 'contrast' | 'kinetic' | 'editorial' | 'wireframe' | 'canvas' | 'discernment' | 'first-impressions' | 'dashboard';
  accent?: string;
  className?: string;
}

export const EditorialArtwork: React.FC<EditorialArtworkProps> = ({ type, accent = '#2D2A26', className = '' }) => {
  switch (type) {
    // 1. Article 1: First Impressions & Website Architecture
    case 'first-impressions':
      return (
        <div className={`relative overflow-hidden bg-[#FAF8F5] text-[#2D2A26] flex items-center justify-center p-5 border border-[#E5E0D8] ${className}`}>
          {/* Subtle architectural grid lines */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#E5E0D8_1px,transparent_1px),linear-gradient(to_bottom,#E5E0D8_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 w-full max-w-md bg-white rounded-lg border border-[#E5E0D8] shadow-md p-4 space-y-3">
            {/* Browser top-bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] font-mono text-[#595550]">50ms_trust_threshold.html</span>
              <span className="text-[9px] font-mono text-[#D96C4A] font-semibold bg-[#D96C4A]/10 px-2 py-0.5 rounded">
                PASSED
              </span>
            </div>

            {/* Simulated Hero Section */}
            <div className="space-y-2 py-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-[#D96C4A] uppercase tracking-wider font-semibold">Web Architecture</span>
                <span className="text-[#E5E0D8]">·</span>
                <span className="text-[9px] font-mono text-[#595550]">68ch measure</span>
              </div>
              <div className="font-sans font-bold text-base text-[#2D2A26] leading-snug">
                Bridging digital business with thoughtful design.
              </div>
              <p className="font-serif text-[11px] text-[#595550] leading-relaxed line-clamp-2">
                Psychological tests confirm users form credibility benchmarks in under fifty milliseconds through clean negative space and typography.
              </p>
            </div>

            {/* Visual Heatmap / Layout Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5E0D8] text-[10px] font-mono text-[#595550]">
              <div className="p-1.5 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <span className="text-[9px] block text-[#595550]">EYE DWELL</span>
                <span className="font-semibold text-[#2D2A26]">0.048s</span>
              </div>
              <div className="p-1.5 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <span className="text-[9px] block text-[#595550]">CONTRAST</span>
                <span className="font-semibold text-emerald-700">12.4:1 AAA</span>
              </div>
              <div className="p-1.5 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <span className="text-[9px] block text-[#595550]">CLUTTER</span>
                <span className="font-semibold text-[#D96C4A]">0.0% ZERO</span>
              </div>
            </div>
          </div>
        </div>
      );

    // 2. Article 2: Spreadsheet to Dashboards
    case 'dashboard':
      return (
        <div className={`relative overflow-hidden bg-[#2D2A26] text-white flex items-center justify-center p-5 ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 w-full max-w-md bg-stone-900 rounded-lg border border-stone-800 shadow-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-[10px] font-mono text-stone-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                EXECUTIVE KPI MONITOR
              </span>
              <span>Q4 FORECAST ACTIVE</span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-stone-950/80 rounded border border-stone-800">
                <span className="text-[9px] font-mono text-stone-400 block">MRR</span>
                <span className="text-sm font-mono font-bold text-white tabular-nums">$148.2k</span>
                <span className="text-[9px] font-mono text-emerald-400 block mt-0.5">+18.4%</span>
              </div>
              <div className="p-2 bg-stone-950/80 rounded border border-stone-800">
                <span className="text-[9px] font-mono text-stone-400 block">BLENDED CAC</span>
                <span className="text-sm font-mono font-bold text-white tabular-nums">$240</span>
                <span className="text-[9px] font-mono text-stone-400 block mt-0.5">3.8mo pb</span>
              </div>
              <div className="p-2 bg-stone-950/80 rounded border border-stone-800">
                <span className="text-[9px] font-mono text-stone-400 block">RETENTION</span>
                <span className="text-sm font-mono font-bold text-emerald-400 tabular-nums">94.2%</span>
                <span className="text-[9px] font-mono text-stone-400 block mt-0.5">Top Quartile</span>
              </div>
            </div>

            {/* Sparkline curve */}
            <div className="pt-2">
              <div className="flex justify-between text-[9px] font-mono text-stone-400 mb-1">
                <span>REVENUE MOMENTUM</span>
                <span className="text-emerald-400">HIGH DATA-INK RATIO</span>
              </div>
              <svg viewBox="0 0 300 40" className="w-full h-8 stroke-[#D96C4A] fill-none stroke-[2.5]">
                <path d="M 0 35 Q 40 32, 80 28 T 160 18 T 240 10 T 300 4" />
              </svg>
            </div>
          </div>
        </div>
      );

    // 3. Article 3: Digital Business Models & Micro-SaaS
    case 'generative-ui':
      return (
        <div className={`relative overflow-hidden bg-[#182623] text-stone-100 flex items-center justify-center p-5 ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 w-full max-w-md space-y-3 bg-stone-950/70 p-4 rounded-lg border border-teal-900/60 shadow-lg">
            <div className="flex items-center justify-between text-[10px] font-mono text-teal-400 border-b border-teal-900/60 pb-1.5">
              <span>VERTICAL MICRO-SAAS FLYWHEEL</span>
              <span>86% GROSS MARGIN</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-teal-950/50 p-2.5 rounded border border-teal-800/40">
                <span className="text-[9px] font-mono text-teal-300 uppercase block">1. Self-Serve Intake</span>
                <p className="text-[11px] font-sans text-stone-200 mt-1">Zero human sales friction; instant onboarding activation.</p>
              </div>
              <div className="bg-teal-950/50 p-2.5 rounded border border-teal-800/40">
                <span className="text-[9px] font-mono text-teal-300 uppercase block">2. Workflow Lock-In</span>
                <p className="text-[11px] font-sans text-stone-200 mt-1">Proprietary schema integrations that compound value.</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-teal-300 pt-1 border-t border-teal-900/40">
              <span>LTV : CAC Multiplier</span>
              <span className="text-white font-bold bg-teal-800/60 px-2 py-0.5 rounded">4.8X UNIT EFFICIENCY</span>
            </div>
          </div>
        </div>
      );

    // 4. Article 4: Presentation Design Masterclass
    case 'editorial':
      return (
        <div className={`relative overflow-hidden bg-[#FAF8F5] text-[#2D2A26] flex items-center justify-center p-5 border border-[#E5E0D8] ${className}`}>
          <div className="relative z-10 w-full max-w-md bg-white rounded-lg border border-[#E5E0D8] shadow-md p-4 space-y-3">
            <div className="flex justify-between text-[10px] font-mono text-[#D96C4A] pb-1.5 border-b border-[#E5E0D8] font-semibold">
              <span>1-2-1 NARRATIVE DECK ARCHITECTURE</span>
              <span>EXECUTIVE BILLBOARD</span>
            </div>

            {/* 3 Slide Thumbnails */}
            <div className="grid grid-cols-3 gap-2 py-1">
              <div className="h-20 bg-[#FAF8F5] border border-[#E5E0D8] rounded p-1.5 flex flex-col justify-between">
                <span className="text-[8px] font-mono text-[#595550]">01. TENSION</span>
                <span className="text-[10px] font-sans font-bold leading-tight text-[#2D2A26]">The $4B Churn Problem</span>
                <div className="h-1 bg-[#D96C4A] rounded w-1/2" />
              </div>
              <div className="h-20 bg-[#FAF8F5] border border-[#E5E0D8] rounded p-1.5 flex flex-col justify-between">
                <span className="text-[8px] font-mono text-[#595550]">02. PROOF</span>
                <span className="text-[10px] font-sans font-bold leading-tight text-[#2D2A26]">18.4% Net Lift</span>
                <div className="h-1 bg-emerald-600 rounded w-4/5" />
              </div>
              <div className="h-20 bg-[#2D2A26] text-white rounded p-1.5 flex flex-col justify-between">
                <span className="text-[8px] font-mono text-stone-400">03. MANDATE</span>
                <span className="text-[10px] font-sans font-bold leading-tight text-white">Approve Staging</span>
                <div className="h-1 bg-[#D96C4A] rounded w-full" />
              </div>
            </div>

            <span className="text-[10px] font-serif italic text-[#595550] block text-center">
              "A presentation slide is a billboard, not a TelePrompTer."
            </span>
          </div>
        </div>
      );

    // 5. Article 5: Generative Design Systems & Tokens
    case 'tokens':
      return (
        <div className={`relative overflow-hidden bg-[#2D2A26] text-stone-100 flex items-center justify-center p-5 ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 w-full max-w-md space-y-3 bg-stone-900 p-4 rounded-lg border border-stone-800 shadow-xl">
            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 border-b border-stone-800 pb-2">
              <span>OKLCH.SEMANTIC.RAMP</span>
              <span className="text-[#D96C4A] font-semibold">PERCEPTUAL LINEARITY</span>
            </div>
            
            <div className="grid grid-cols-5 gap-2 py-1">
              <div className="h-12 rounded bg-stone-800 border border-stone-700 flex flex-col justify-end p-1.5 text-[9px] font-mono text-stone-300">
                <span>L 98%</span>
              </div>
              <div className="h-12 rounded bg-stone-700 border border-stone-600 flex flex-col justify-end p-1.5 text-[9px] font-mono text-stone-200">
                <span>L 82%</span>
              </div>
              <div className="h-12 rounded bg-[#D96C4A] border border-[#B85536] flex flex-col justify-end p-1.5 text-[9px] font-mono text-white">
                <span>L 64%</span>
              </div>
              <div className="h-12 rounded bg-[#B85536] border border-amber-800 flex flex-col justify-end p-1.5 text-[9px] font-mono text-white">
                <span>CHR 0.2</span>
              </div>
              <div className="h-12 rounded bg-stone-950 border border-stone-800 flex flex-col justify-end p-1.5 text-[9px] font-mono text-stone-400">
                <span>L 14%</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 pt-1 border-t border-stone-800">
              <span>Token: --color-surface-base</span>
              <span className="text-emerald-400 font-semibold">12.1:1 CR AAA</span>
            </div>
          </div>
        </div>
      );

    // 6. Article 6: Diffusion to Production CSS
    case 'diffusion':
      return (
        <div className={`relative overflow-hidden bg-stone-950 text-stone-100 flex items-center justify-center p-5 ${className}`}>
          <div className="absolute inset-0 flex opacity-60">
            <div className="w-1/2 bg-gradient-to-br from-indigo-950 via-stone-900 to-stone-950" />
            <div className="w-1/2 bg-stone-900/60 border-l border-stone-800" />
          </div>

          <div className="relative z-10 w-full max-w-md flex items-center justify-between gap-3">
            <div className="flex-1 bg-stone-900/90 border border-stone-800 p-3 rounded shadow-lg">
              <span className="text-[10px] font-mono text-[#D96C4A] uppercase block mb-1">LATENT PROMPT</span>
              <p className="text-xs font-serif italic text-stone-300 leading-snug">"Bauhaus web layout on warm limestone travertine..."</p>
            </div>
            <span className="text-stone-400 font-mono text-sm">→</span>
            <div className="flex-1 bg-stone-900/90 border border-stone-700 p-3 rounded shadow-lg">
              <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">CSS SUBGRID</span>
              <div className="space-y-1.5 pt-1">
                <div className="h-1.5 bg-stone-700 rounded w-full" />
                <div className="h-1.5 bg-[#D96C4A] rounded w-3/4" />
                <div className="h-1.5 bg-stone-600 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      );

    // 7. Article 7: Prompt Engineering Constitution
    case 'code-ast':
      return (
        <div className={`relative overflow-hidden bg-[#2D2A26] text-stone-200 flex items-center justify-center p-5 ${className}`}>
          <div className="relative z-10 w-full max-w-md font-mono text-xs bg-stone-900 p-4 rounded-lg border border-stone-800 space-y-1.5">
            <div className="flex justify-between text-[10px] text-[#D96C4A] border-b border-stone-800 pb-1 font-semibold">
              <span>PROMPT_CONSTITUTION.SPEC</span>
              <span>ZERO-SLOP VALIDATED</span>
            </div>
            <div className="text-stone-400 pt-1">
              <span className="text-purple-400">export const</span> FrontendRules = &#123;
            </div>
            <div className="pl-4 text-emerald-400">zeroPills: <span className="text-amber-400">true</span>,</div>
            <div className="pl-4 text-emerald-400">semanticLandmarks: <span className="text-amber-400">true</span>,</div>
            <div className="pl-4 text-emerald-400">colorDistribution: <span className="text-stone-300">"60-30-10"</span>,</div>
            <div className="pl-4 text-emerald-400">workingHandlers: <span className="text-amber-400">true</span></div>
            <div className="text-stone-400">&#125;;</div>
          </div>
        </div>
      );

    // 8. Article 8: Accessibility & Contrast Auditing
    case 'contrast':
      return (
        <div className={`relative overflow-hidden bg-[#FAF8F5] text-[#2D2A26] flex items-center justify-center p-5 border border-[#E5E0D8] ${className}`}>
          <div className="relative z-10 w-full max-w-md grid grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-lg border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-mono text-[#595550]">LIGHT ALABASTER</span>
              <div className="my-2 bg-[#FAF8F5] text-[#2D2A26] p-2 rounded text-xs font-serif font-medium border border-[#E5E0D8]">
                Georgia Typography
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">12.8:1 WCAG AAA</span>
            </div>
            <div className="bg-[#2D2A26] text-white p-3.5 rounded-lg border border-stone-800 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-mono text-stone-400">NIGHT CHARCOAL</span>
              <div className="my-2 bg-stone-900 text-stone-100 p-2 rounded text-xs font-serif font-medium border border-stone-700">
                Contrast Scrim
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">14.1:1 WCAG AAA</span>
            </div>
          </div>
        </div>
      );

    // 9. Article 9: Wireframe to Code
    case 'wireframe':
      return (
        <div className={`relative overflow-hidden bg-[#2D2A26] text-stone-100 flex items-center justify-center p-5 ${className}`}>
          <div className="relative z-10 w-full max-w-md border border-dashed border-stone-700 p-4 rounded-lg bg-stone-900/80 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 border-b border-stone-800 pb-1.5">
              <span>VISION_PARSER_BENCHMARK</span>
              <span className="text-emerald-400">REACT 19 JSX</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="col-span-2 border border-stone-700 h-12 rounded bg-stone-800/60 p-2 flex flex-col justify-between">
                <div className="w-10 h-1.5 bg-[#D96C4A] rounded" />
                <div className="w-20 h-1 bg-stone-600 rounded" />
              </div>
              <div className="border border-stone-700 h-12 rounded bg-stone-800/60 flex items-center justify-center text-[10px] font-mono text-stone-300">
                &lt;CTA /&gt;
              </div>
            </div>
            <span className="text-[9px] font-mono text-stone-400 block text-right pt-1">
              Fluid Container Query: minmax(320px, 1fr)
            </span>
          </div>
        </div>
      );

    // 10. Article 10: Human Designer’s Moat & Taste
    case 'discernment':
    default:
      return (
        <div className={`relative overflow-hidden bg-[#FAF8F5] text-[#2D2A26] flex items-center justify-center p-5 border border-[#E5E0D8] ${className}`}>
          <div className="relative z-10 w-full max-w-md bg-white p-5 rounded-lg border border-[#E5E0D8] shadow-md text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#D96C4A] uppercase font-semibold">
              Editorial Manifesto
            </span>
            <h4 className="text-xl font-serif font-medium text-[#2D2A26] leading-snug">
              Taste is the Art of Knowing What to Withhold.
            </h4>
            <div className="w-12 h-px bg-[#D96C4A] mx-auto my-2" />
            <span className="text-[10px] font-mono text-[#595550]">
              CURATORIAL RESTRAINT · PENIL'S DIGITAL SPACE
            </span>
          </div>
        </div>
      );
  }
};
