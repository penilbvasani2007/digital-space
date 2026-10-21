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
      demoDetail: 'Includes automated column classification into Leading, North Star, and Trailing KPIs with zero manual charting effort.',
      relatedArticleSlug: 'organizing-business-data-spreadsheets-to-dashboards',
      relatedAnchorText: 'Read complete guide on spreadsheets to dashboards'
    },
    {
      id: 'proj-2',
      title: 'First Impressions Web Architecture Auditor',
      tag: 'Web Design & HCI',
      desc: 'An ergonomic layout analyzer evaluating typography measure, 50-millisecond cognitive trust thresholds, and navigational zoning.',
      icon: Layout,
      metrics: 'WCAG 2.2 compliant · 0 layout shifts',
      status: 'Active Tool',
      demoDetail: 'Ensures landing pages maintain 65-75ch line lengths, single-line header contracts, and anti-slop color discipline.',
      relatedArticleSlug: 'why-first-impressions-matter-in-website-architecture',
      relatedAnchorText: 'Read complete guide on website architecture design principles'
    },
    {
      id: 'proj-3',
      title: 'DesignBot Token & Prompt Engine',
      tag: 'AI & Automation',
      desc: 'A declarative system for generating multi-brand CSS tokens and semantic React components via strict negative constraints and OKLCH color spaces.',
      icon: Sliders,
      metrics: '10 verified workflow formulas',
      status: 'Engine v2.4',
      demoDetail: 'Eradicates generic AI aesthetics by enforcing zero-pill metadata discipline and mathematical luminance uniformity.',
      relatedArticleSlug: 'generative-design-systems-tokens-llm',
      relatedAnchorText: 'Read complete guide on generative design tokens'
    },
    {
      id: 'proj-4',
      title: '1-2-1 Executive Presentation Kit',
      tag: 'Presentation Design',
      desc: 'A minimal presentation deck template system built for board pitches, eliminating text density in favor of high-impact narrative beats.',
      icon: Presentation,
      metrics: 'Used in $4.2M seed rounds',
      status: 'Framework Guide',
      demoDetail: 'Follows the strict billboard paradigm: 1 context slide, 2 quantitative proof slides, and 1 decisive action mandate.',
      relatedArticleSlug: 'presentation-design-masterclass-stakeholder-narratives',
      relatedAnchorText: 'Read complete guide on executive presentation narratives'
    }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-3.5 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
      <div className="max-w-2xl mb-6 sm:mb-10">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-sans font-semibold text-[#D96C4A] block mb-1.5 sm:mb-2">
          Projects &amp; Experiments
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-[#2D2A26] leading-tight mb-2.5 sm:mb-4">
          Building tools at the intersection of design and business.
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-sans font-semibold text-[#2D2A26] mb-1.5 sm:mb-2">
          What tools and prototypes translate masterclass theory into practice?
        </h2>
        <p className="text-xs sm:text-sm md:text-base font-serif text-[#595550] leading-relaxed">
          <strong className="font-mono text-[10px] sm:text-xs text-[#D96C4A] mr-1.5 font-bold">Answer:</strong>
          These practical open prototypes—including an Executive Metrics Canvas with high data-ink ratios, a 50ms First Impressions layout auditor, and a declarative CSS token synthesizer—translate theoretical research into living, accessible web utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div
              key={proj.id}
              className="bg-white border border-[#E5E0D8] rounded-lg p-4 sm:p-6 md:p-7 hover:border-[#D96C4A]/60 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#D96C4A] shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono text-[#595550] bg-[#FAF8F5] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-[#E5E0D8]">
                    {proj.status}
                  </span>
                </div>

                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-[#D96C4A] font-semibold block mb-1">
                  {proj.tag}
                </span>

                <h3 className="text-lg sm:text-xl md:text-2xl font-sans font-semibold text-[#2D2A26] mb-2 sm:mb-3">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm font-serif text-[#595550] leading-relaxed mb-3 sm:mb-4">
                  {proj.desc}
                </p>

                <div className="p-2.5 sm:p-3 bg-[#FAF8F5] rounded border border-[#E5E0D8] text-xs font-mono text-[#2D2A26] mb-4 sm:mb-5">
                  <span className="text-[#595550] block text-[9px] sm:text-[10px] uppercase">Impact & Performance:</span>
                  <span className="font-semibold text-xs">{proj.metrics}</span>
                </div>

                {/* Explicit In-Context Link with Rich Anchor Text */}
                <div className="mb-3 sm:mb-4">
                  <a
                    href={`/articles/${proj.relatedArticleSlug}`}
                    onClick={(e) => {
                      if (onExploreArticle) {
                        e.preventDefault();
                        onExploreArticle(proj.relatedArticleSlug);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#D96C4A] hover:text-[#B85536] transition-colors"
                    title={proj.relatedAnchorText}
                  >
                    <span>{proj.relatedAnchorText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                <button
                  onClick={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
                  className="text-xs font-sans font-semibold text-[#2D2A26] hover:text-[#D96C4A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{activeProject === proj.id ? 'Hide Specifications' : 'View Specifications'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {activeProject === proj.id && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-dashed border-[#E5E0D8] text-xs font-serif text-[#595550] bg-[#FAF8F5] p-2.5 sm:p-3 rounded">
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
