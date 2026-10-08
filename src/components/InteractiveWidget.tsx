import React, { useState } from 'react';
import { InteractiveComponentConfig } from '../types';
import { Sliders, RefreshCw, Sparkles, Check, Play, Eye, BarChart2, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';

export const InteractiveWidget: React.FC<{ config: InteractiveComponentConfig }> = ({ config }) => {
  // Widget 1: Token Synthesizer
  const [tokenHue, setTokenHue] = useState(250);
  const [darkTheme, setDarkTheme] = useState(false);

  // Widget 2: Contrast Checker
  const [textColor, setTextColor] = useState('#2D2A26');
  const [bgColor, setBgColor] = useState('#FAF8F5');

  // Widget 3: Spring Playground
  const [stiffness, setStiffness] = useState(380);
  const [damping, setDamping] = useState(32);
  const [springActive, setSpringActive] = useState(false);

  // Widget 4: Tone Calibrator
  const [toneMode, setToneMode] = useState<'error' | 'empty' | 'permission'>('error');

  // Widget 5: Spreadsheet-to-Dashboard Simulator
  const [monthlyRevenue, setMonthlyRevenue] = useState(148);
  const [cacValue, setCacValue] = useState(240);
  const [retentionRate, setRetentionRate] = useState(94);
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'cac' | 'retention'>('revenue');

  // Widget 6: Architecture Auditor Mode
  const [archMode, setArchMode] = useState<'restrained' | 'cluttered'>('restrained');

  const triggerSpring = () => {
    setSpringActive(true);
    setTimeout(() => setSpringActive(false), 800);
  };

  return (
    <div className="my-8 border border-[#E5E0D8] bg-[#FAF8F5] rounded-lg p-6 overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 mb-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#D96C4A]">
            Interactive Masterclass Tool
          </span>
          <h4 className="text-base font-semibold text-[#2D2A26] font-sans mt-0.5">{config.title}</h4>
        </div>
        <div className="text-xs font-mono text-[#595550] bg-white border border-[#E5E0D8] px-2.5 py-0.5 rounded">
          {config.type.toUpperCase()}
        </div>
      </div>
      <p className="text-xs text-[#595550] mb-5 font-serif">{config.caption}</p>

      {/* Spreadsheet to Dashboard Visualizer */}
      {config.type === 'dashboard' && (
        <div className="space-y-5">
          <div className="bg-white p-4 rounded-lg border border-[#E5E0D8] shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#595550] block mb-3">
              1. Spreadsheet Input Matrix (Editable Values)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono text-[#595550] flex justify-between mb-1">
                  <span>Monthly Rev ($k):</span>
                  <span className="font-semibold text-[#2D2A26]">${monthlyRevenue}k</span>
                </label>
                <input
                  type="range"
                  min="80"
                  max="350"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full accent-[#D96C4A] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#595550] flex justify-between mb-1">
                  <span>Blended CAC ($):</span>
                  <span className="font-semibold text-[#2D2A26]">${cacValue}</span>
                </label>
                <input
                  type="range"
                  min="120"
                  max="600"
                  value={cacValue}
                  onChange={(e) => setCacValue(Number(e.target.value))}
                  className="w-full accent-[#D96C4A] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#595550] flex justify-between mb-1">
                  <span>Net Retention (%):</span>
                  <span className="font-semibold text-[#2D2A26]">{retentionRate}%</span>
                </label>
                <input
                  type="range"
                  min="75"
                  max="125"
                  value={retentionRate}
                  onChange={(e) => setRetentionRate(Number(e.target.value))}
                  className="w-full accent-[#D96C4A] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#E5E0D8] shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E0D8]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#595550]">
                2. Executive Action Dashboard (Synthesized High Data-Ink View)
              </span>
              <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Healthy Signals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setSelectedMetric('revenue')}
                className={`p-4 rounded border transition-all cursor-pointer ${
                  selectedMetric === 'revenue'
                    ? 'border-[#D96C4A] bg-[#FAF8F5]'
                    : 'border-[#E5E0D8] hover:border-[#D96C4A]/50'
                }`}
              >
                <span className="text-[11px] font-mono text-[#595550] block uppercase">North Star MRR</span>
                <div className="text-2xl font-mono font-semibold tabular-nums text-[#2D2A26] mt-1">
                  ${monthlyRevenue},200
                </div>
                <div className="text-xs font-mono text-emerald-700 mt-1 flex items-center gap-1">
                  <span>↑ +18.4%</span>
                  <span className="text-[#595550]">vs Q2 baseline</span>
                </div>
              </div>

              <div
                onClick={() => setSelectedMetric('cac')}
                className={`p-4 rounded border transition-all cursor-pointer ${
                  selectedMetric === 'cac'
                    ? 'border-[#D96C4A] bg-[#FAF8F5]'
                    : 'border-[#E5E0D8] hover:border-[#D96C4A]/50'
                }`}
              >
                <span className="text-[11px] font-mono text-[#595550] block uppercase">Unit Efficiency (CAC)</span>
                <div className="text-2xl font-mono font-semibold tabular-nums text-[#2D2A26] mt-1">
                  ${cacValue}
                </div>
                <div className="text-xs font-mono text-[#595550] mt-1">
                  Payback: <span className="font-semibold text-[#2D2A26]">{(cacValue / 38).toFixed(1)} months</span>
                </div>
              </div>

              <div
                onClick={() => setSelectedMetric('retention')}
                className={`p-4 rounded border transition-all cursor-pointer ${
                  selectedMetric === 'retention'
                    ? 'border-[#D96C4A] bg-[#FAF8F5]'
                    : 'border-[#E5E0D8] hover:border-[#D96C4A]/50'
                }`}
              >
                <span className="text-[11px] font-mono text-[#595550] block uppercase">Net Dollar Retention</span>
                <div className="text-2xl font-mono font-semibold tabular-nums text-[#2D2A26] mt-1">
                  {retentionRate}.2%
                </div>
                <div className="text-xs font-mono text-emerald-700 mt-1">
                  <span>Top Quartile SaaS</span>
                </div>
              </div>
            </div>

            {/* Sparkline trend representation */}
            <div className="mt-4 pt-4 border-t border-[#E5E0D8] flex items-center justify-between text-xs font-mono text-[#595550]">
              <span>6-Month Trajectory:</span>
              <div className="flex items-end gap-1 h-6">
                {[35, 48, 62, 58, 80, monthlyRevenue / 3.5].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${Math.min(h, 24)}px` }}
                    className={`w-3 rounded-t ${i === 5 ? 'bg-[#D96C4A]' : 'bg-[#E5E0D8]'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Website Architecture First Impressions Auditor */}
      {config.type === 'architecture' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setArchMode('restrained')}
              className={`px-3.5 py-1.5 text-xs font-sans font-medium rounded transition-colors ${
                archMode === 'restrained'
                  ? 'bg-[#2D2A26] text-white'
                  : 'bg-white text-[#595550] border border-[#E5E0D8]'
              }`}
            >
              Architectural Clarity (Penil’s Standard)
            </button>
            <button
              onClick={() => setArchMode('cluttered')}
              className={`px-3.5 py-1.5 text-xs font-sans font-medium rounded transition-colors ${
                archMode === 'cluttered'
                  ? 'bg-[#2D2A26] text-white'
                  : 'bg-white text-[#595550] border border-[#E5E0D8]'
              }`}
            >
              Overloaded Noise (Anti-Pattern)
            </button>
          </div>

          {archMode === 'restrained' ? (
            <div className="bg-[#FAF8F5] border border-[#E5E0D8] p-6 rounded-lg shadow-sm font-sans space-y-4">
              <div className="flex justify-between items-center text-xs text-[#595550] pb-2 border-b border-[#E5E0D8]">
                <span className="font-semibold text-[#2D2A26]">Penil's Digital Space</span>
                <div className="flex gap-4">
                  <span>About</span>
                  <span>Articles</span>
                  <span>Projects</span>
                  <span>Contact</span>
                </div>
              </div>
              <div className="max-w-md space-y-2 py-4">
                <span className="text-[10px] font-mono text-[#D96C4A] uppercase tracking-wider block">
                  Web Design · Essay
                </span>
                <h3 className="text-2xl font-sans font-semibold text-[#2D2A26] leading-tight">
                  Bridging the gap between digital business and thoughtful design.
                </h3>
                <p className="text-xs font-serif text-[#595550] leading-relaxed">
                  Clear 68ch measure, comfortable Georgia line height, zero popup traps, immediate reader trust.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Passed: 50ms Cognitive Trust Threshold · Zero layout jitter</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 text-white p-6 rounded-lg border border-purple-500/50 shadow-sm space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-700">
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold">
                  ⚡️ MEGA_PORTFOLIO_V4 ⚡️
                </span>
                <div className="flex gap-2">
                  <span className="bg-purple-600 px-2 py-0.5 rounded-full text-[10px]">NEW</span>
                  <span className="bg-pink-600 px-2 py-0.5 rounded-full text-[10px]">AI INSIDE</span>
                </div>
              </div>
              <div className="space-y-2 py-2">
                <div className="animate-pulse bg-purple-500/20 p-2 rounded text-xs border border-purple-500/40 text-purple-200">
                  🔔 "Sign up for our 12-step newsletter right now!" (Modal overlay)
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  HYPER-DISRUPTIVE WEB ENGINE MATRIX
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Unreadable centered typography with neon background glow, 6 floating badges, and high bounce rate.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Failed: High cognitive friction, layout shifts, intrusive popups</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Token Synthesizer */}
      {config.type === 'tokens' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded border border-[#E5E0D8]">
            <div className="space-y-1 w-full sm:w-1/2">
              <label className="text-xs font-mono text-[#595550] flex justify-between">
                <span>Seed Chroma Hue:</span>
                <span className="font-semibold text-[#2D2A26]">{tokenHue}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={tokenHue}
                onChange={(e) => setTokenHue(Number(e.target.value))}
                className="w-full accent-[#D96C4A] cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkTheme(!darkTheme)}
                className="px-3 py-1.5 text-xs font-mono border border-[#E5E0D8] rounded hover:bg-stone-100 transition-colors"
              >
                Toggle Mode: {darkTheme ? 'Dark' : 'Light'}
              </button>
            </div>
          </div>

          <div className={`p-4 rounded border transition-colors ${darkTheme ? 'bg-[#2D2A26] text-white border-stone-800' : 'bg-white text-[#2D2A26] border-[#E5E0D8]'}`}>
            <span className="text-[11px] font-mono text-[#595550] block mb-2">Compiled Semantic Variables</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2 rounded border border-[#E5E0D8]" style={{ backgroundColor: darkTheme ? `oklch(0.2 0.04 ${tokenHue})` : `oklch(0.96 0.02 ${tokenHue})` }}>
                <span className="text-[10px] block opacity-70">--bg-color</span>
                <span className="font-semibold">L {darkTheme ? '20%' : '96%'}</span>
              </div>
              <div className="p-2 rounded text-white" style={{ backgroundColor: `oklch(0.55 0.2 ${tokenHue})` }}>
                <span className="text-[10px] block opacity-90">--accent-color</span>
                <span className="font-semibold">Chroma 0.20</span>
              </div>
              <div className="p-2 rounded border border-[#E5E0D8]">
                <span className="text-[10px] block opacity-70">--contrast</span>
                <span className="font-semibold text-emerald-600">8.4:1 AAA</span>
              </div>
              <div className="p-2 rounded border border-[#E5E0D8]">
                <span className="text-[10px] block opacity-70">--font-body</span>
                <span className="font-semibold">Georgia</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tone / Business Model Mode */}
      {config.type === 'tone' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded border border-[#E5E0D8] space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-[#595550] border-b border-[#E5E0D8] pb-2">
              <span>UNIT ECONOMICS MULTIPLIER</span>
              <span className="text-[#2D2A26] font-semibold">Self-Serve Digital SaaS</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <span className="text-[#595550] block text-[10px]">MARGIN</span>
                <span className="font-semibold text-emerald-800">86% Gross</span>
              </div>
              <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <span className="text-[#595550] block text-[10px]">PAYBACK</span>
                <span className="font-semibold text-[#2D2A26]">4.2 Months</span>
              </div>
              <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <span className="text-[#595550] block text-[10px]">LTV : CAC</span>
                <span className="font-semibold text-emerald-800">4.8x Multiplier</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
