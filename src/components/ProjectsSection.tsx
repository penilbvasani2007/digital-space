import React, { useState } from 'react';
import { ExternalLink, ArrowRight, CheckCircle2, BarChart2, Layout, Sliders, Presentation } from 'lucide-react';

export const ProjectsSection: React.FC<{ onExploreArticle?: (slug: string) => void }> = ({ onExploreArticle }) => {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const projects = [
    {
      id: 'proj-1',
      title: 'Executive Metrics Canvas',
      tag: 'Data Analytics & Business',
      desc: 'An automated web tool that parses raw CSV/spreadsheet records into executive KPI dashboards with high data-ink ratios and instant variance alerts.',
      icon: BarChart2,
      metrics: '3.4x faster reporting · 14k monthly views',
      status: 'Live & Open Source',
      demoDetail: 'Includes automated column classification into Leading, North Star, and Trailing KPIs with zero manual charting effort.'
    },
    {
      id: 'proj-2',
      title: 'First Impressions Web Architecture Auditor',
      tag: 'Web Design & HCI',
      desc: 'An ergonomic layout analyzer evaluating typography measure, 50-millisecond cognitive trust thresholds, and navigational zoning.',
      icon: Layout,
      metrics: 'WCAG 2.2 compliant · 0 layout shifts',
      status: 'Active Tool',
      demoDetail: 'Ensures landing pages maintain 65-75ch line lengths, single-line header contracts, and anti-slop color discipline.'
    },
    {
      id: 'proj-3',
      title: 'DesignBot Token & Prompt Engine',
      tag: 'AI & Automation',
      desc: 'A declarative system for generating multi-brand CSS tokens and semantic React components via strict negative constraints and OKLCH color spaces.',
      icon: Sliders,
      metrics: '10 verified workflow formulas',
      status: 'Engine v2.4',
      demoDetail: 'Eradicates generic AI aesthetics by enforcing zero-pill metadata discipline and mathematical luminance uniformity.'
    },
    {
      id: 'proj-4',
      title: '1-2-1 Executive Presentation Kit',
      tag: 'Presentation Design',
      desc: 'A minimal presentation deck template system built for board pitches, eliminating text density in favor of high-impact narrative beats.',
      icon: Presentation,
      metrics: 'Used in $4.2M seed rounds',
      status: 'Framework Guide',
      demoDetail: 'Follows the strict billboard paradigm: 1 context slide, 2 quantitative proof slides, and 1 decisive action mandate.'
    }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      <div className="max-w-2xl mb-12">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#D96C4A] block mb-2">
          Projects & Experiments
        </span>
        <h1 className="text-4xl font-sans font-semibold text-[#2D2A26] leading-tight mb-4">
          Building tools at the intersection of design and business.
        </h1>
        <p className="text-lg font-serif text-[#595550] leading-relaxed">
          Practical systems, open prototypes, and tools developed during my research into modern web architecture and data analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div
              key={proj.id}
              className="bg-white border border-[#E5E0D8] rounded-lg p-7 hover:border-[#D96C4A]/60 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-md bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#D96C4A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[#595550] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E5E0D8]">
                    {proj.status}
                  </span>
                </div>

                <span className="text-[11px] font-sans uppercase tracking-wider text-[#D96C4A] font-semibold block mb-1">
                  {proj.tag}
                </span>

                <h3 className="text-2xl font-sans font-semibold text-[#2D2A26] mb-3">
                  {proj.title}
                </h3>

                <p className="text-sm font-serif text-[#595550] leading-relaxed mb-4">
                  {proj.desc}
                </p>

                <div className="p-3 bg-[#FAF8F5] rounded border border-[#E5E0D8] text-xs font-mono text-[#2D2A26] mb-6">
                  <span className="text-[#595550] block text-[10px] uppercase">Impact & Performance:</span>
                  <span className="font-semibold">{proj.metrics}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                <button
                  onClick={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
                  className="text-xs font-sans font-semibold text-[#2D2A26] hover:text-[#D96C4A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{activeProject === proj.id ? 'Hide Specifications' : 'View Specifications'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {activeProject === proj.id && (
                <div className="mt-4 pt-4 border-t border-dashed border-[#E5E0D8] text-xs font-serif text-[#595550] bg-[#FAF8F5] p-3 rounded">
                  <span className="font-sans font-semibold text-[#2D2A26] block mb-1">Architecture Notes:</span>
                  {proj.demoDetail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
