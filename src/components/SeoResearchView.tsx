import React, { useState } from 'react';
import { KEYWORD_RESEARCH_TABLE, ON_PAGE_SEO_CHECKLIST, KeywordResearchEntry } from '../data/seoKeywords';
import { Search, CheckCircle2, Globe, FileText, Image as ImageIcon, Link as LinkIcon, HelpCircle, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

interface SeoResearchViewProps {
  onNavigateToArticle: (slug: string) => void;
  onNavigateHome: () => void;
  onNavigateToTab?: (tab: 'articles' | 'about' | 'projects' | 'contact') => void;
}

export const SeoResearchView: React.FC<SeoResearchViewProps> = ({
  onNavigateToArticle,
  onNavigateHome,
  onNavigateToTab,
}) => {
  const [selectedEntry, setSelectedEntry] = useState<KeywordResearchEntry>(KEYWORD_RESEARCH_TABLE[1]);
  const [activeTab, setActiveTab] = useState<'table' | 'checklist' | 'aeo'>('table');

  const handleNavigate = (url: string) => {
    if (url === '/') {
      onNavigateHome();
    } else if (url.startsWith('/articles/')) {
      const slug = url.replace('/articles/', '');
      onNavigateToArticle(slug);
    } else if (url === '/about') {
      onNavigateToTab ? onNavigateToTab('about') : onNavigateHome();
    } else if (url === '/projects') {
      onNavigateToTab ? onNavigateToTab('projects') : onNavigateHome();
    } else if (url === '/contact') {
      onNavigateToTab ? onNavigateToTab('contact') : onNavigateHome();
    }
  };

  return (
    <div className="max-w-[1140px] mx-auto px-3.5 sm:px-6 md:px-8 py-5 sm:py-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-[#E5E0D8] pb-4 sm:pb-6 mb-5 sm:mb-8">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#D96C4A] font-semibold bg-[#D96C4A]/10 px-2 py-0.5 rounded">
            STEP 2 &amp; STEP 3 VERIFICATION
          </span>
          <span className="text-[11px] sm:text-xs font-mono text-[#595550]">On-Page SEO &amp; AEO Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-[#2D2A26] leading-tight mb-2 sm:mb-3">
          Step 2 Keyword Research &amp; AEO Questions Table
        </h1>
        <p className="font-serif text-sm sm:text-base md:text-lg text-[#595550] max-w-3xl leading-relaxed">
          Comprehensive SEO specification table mapping every page to its main keyword, 2 related keywords, search intent, monthly search volume, and the exact user question it answers for Answer Engine Optimization.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'table'
                ? 'bg-[#2D2A26] text-white shadow-xs'
                : 'bg-white border border-[#E5E0D8] text-[#595550] hover:text-[#2D2A26]'
            }`}
          >
            Tab 1: Step 2 Table (10 Pages)
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-[#2D2A26] text-white shadow-xs'
                : 'bg-white border border-[#E5E0D8] text-[#595550] hover:text-[#2D2A26]'
            }`}
          >
            Tab 2: On-Page Checklist (8 Rules)
          </button>
          <button
            onClick={() => setActiveTab('aeo')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'aeo'
                ? 'bg-[#2D2A26] text-white shadow-xs'
                : 'bg-white border border-[#E5E0D8] text-[#595550] hover:text-[#2D2A26]'
            }`}
          >
            Tab 3: AEO Snippet Matrix
          </button>
          <a
            href="/SEO_Keyword_Research_Table.doc"
            download="SEO_Keyword_Research_Table.doc"
            className="w-full sm:w-auto mt-1 sm:mt-0 sm:ml-auto justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-semibold transition-all cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 shadow-xs"
            title="Download Word Document (.doc) for Step 2 and Step 3 SEO Report"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Download Report (.doc)</span>
          </a>
        </div>
      </div>

      {/* TAB 1: KEYWORD RESEARCH TABLE */}
      {activeTab === 'table' && (
        <section className="space-y-6 sm:space-y-8">
          <div className="bg-white border border-[#E5E0D8] rounded-lg shadow-xs overflow-hidden">
            <div className="p-3.5 sm:p-4 bg-[#FAF8F5] border-b border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xs sm:text-sm font-semibold text-[#2D2A26]">
                  What keywords and SEO specifications target each page on Penil's Space?
                </h2>
                <p className="text-xs text-[#595550] mt-0.5">
                  <strong className="font-mono text-[10px] sm:text-[11px] text-[#D96C4A] mr-1">Answer:</strong>
                  Every page maps to 1 Main Keyword and 2 Related Keywords with documented search volume, informational intent, clean URLs, and strict title/meta length rules.
                </p>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded self-start sm:self-auto shrink-0">
                100% SEO COMPLIANT
              </span>
            </div>

            {/* Mobile swipe cue */}
            <div className="px-3 py-1 bg-amber-50/80 border-b border-[#E5E0D8] text-[10px] font-mono text-[#D96C4A] md:hidden flex items-center justify-between">
              <span>← Swipe table horizontally to inspect all columns →</span>
              <span className="font-semibold text-stone-700">10 Pages</span>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#595550] font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 sm:py-3 px-3 sm:px-3.5 font-semibold">Page</th>
                    <th className="py-2.5 sm:py-3 px-3 sm:px-3.5 font-semibold text-[#D96C4A]">Main Keyword</th>
                    <th className="py-2.5 sm:py-3 px-3 sm:px-3.5 font-semibold">2 Related Keywords</th>
                    <th className="py-2.5 sm:py-3 px-2.5 sm:px-3 font-semibold">Intent</th>
                    <th className="py-2.5 sm:py-3 px-2.5 sm:px-3 font-semibold">Volume</th>
                    <th className="py-2.5 sm:py-3 px-3.5 sm:px-4 font-semibold min-w-[260px]">Questions It Answers (AEO)</th>
                    <th className="py-2.5 sm:py-3 px-2.5 sm:px-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8]/60 text-[#2D2A26]">
                  {KEYWORD_RESEARCH_TABLE.map((item, idx) => (
                    <tr
                      key={idx}
                      onClick={() => setSelectedEntry(item)}
                      className={`hover:bg-[#FAF8F5] transition-colors cursor-pointer ${
                        selectedEntry.url === item.url ? 'bg-[#D96C4A]/5 font-medium' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3.5 font-sans">
                        <div className="font-semibold text-[#2D2A26] leading-snug">{item.pageName}</div>
                        <code className="text-[10px] font-mono text-[#595550] bg-[#FAF8F5] px-1 py-0.2 rounded border border-[#E5E0D8] mt-1 inline-block">
                          {item.url}
                        </code>
                      </td>
                      <td className="py-3.5 px-3.5 font-semibold text-[#D96C4A]">
                        <span className="bg-[#D96C4A]/10 px-2 py-0.5 rounded inline-block text-[11px]">
                          {item.mainKeyword}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-[#595550] space-y-1">
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="text-[#D96C4A] text-[9px] font-mono font-bold">1.</span>
                          <span>{item.relatedKeyword1}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="text-[#D96C4A] text-[9px] font-mono font-bold">2.</span>
                          <span>{item.relatedKeyword2}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded font-semibold ${
                          item.searchIntent === 'Informational' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          item.searchIntent === 'Commercial' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          item.searchIntent === 'Transactional' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {item.searchIntent}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-semibold text-[11px] text-[#2D2A26] tabular-nums whitespace-nowrap">
                        {item.monthlyVolumeEst} <span className="text-[10px] text-[#595550] font-normal">/mo</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-serif text-[#2D2A26] leading-snug">
                        <span className="font-sans font-medium text-amber-900 block mb-0.5 text-[11px]">
                          "{item.targetAeoQuestion}"
                        </span>
                        <span className="text-[11px] text-[#595550] line-clamp-2">
                          {item.aeoSnippetAnswer}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleNavigate(item.url);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D96C4A] hover:underline cursor-pointer bg-white px-2 py-1 rounded border border-[#E5E0D8] hover:border-[#D96C4A]"
                          title={`Navigate to ${item.pageName}`}
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deep Inspection Panel for Selected Entry */}
          <div className="bg-white border border-[#E5E0D8] rounded-lg p-3.5 sm:p-5 md:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-[#E5E0D8] mb-3 sm:mb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono text-[#D96C4A] uppercase tracking-wider font-semibold">
                  Page SEO Detail Specimen
                </span>
                <h3 className="text-lg sm:text-xl font-sans font-semibold text-[#2D2A26] mt-0.5">
                  {selectedEntry.pageName}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] sm:text-xs font-mono text-[#595550]">Target Clean URL</span>
                <div className="text-xs font-mono font-semibold text-[#2D2A26]">{selectedEntry.url}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meta Tags Preview */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#595550] mb-1">
                    <span className="font-mono font-semibold text-[#2D2A26]">Page Title Tag (&lt;title&gt;)</span>
                    <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {selectedEntry.titleTag.length} characters (Ideal: 50-60)
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded font-mono text-xs text-[#2D2A26]">
                    {selectedEntry.titleTag}
                  </div>
                  <p className="text-[11px] text-[#595550] mt-1">
                    Rule: Primary keyword in leading position, separated by vertical bar, concluding with brand name.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-[#595550] mb-1">
                    <span className="font-mono font-semibold text-[#2D2A26]">Meta Description (&lt;meta name="description"&gt;)</span>
                    <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {selectedEntry.metaDescription.length} characters (Ideal: 140-160)
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded font-serif text-xs text-[#2D2A26] leading-relaxed">
                    {selectedEntry.metaDescription}
                  </div>
                  <p className="text-[11px] text-[#595550] mt-1">
                    Rule: Active voice, summarizes core value proposition, includes target keywords and clear call to action.
                  </p>
                </div>
              </div>

              {/* SERP Search Snippet Preview */}
              <div>
                <span className="text-xs font-mono font-semibold text-[#2D2A26] block mb-2">
                  Google &amp; Search Engine Snippet Simulation
                </span>
                <div className="p-4 bg-white border border-stone-300 rounded-lg shadow-sm space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Globe className="w-3.5 h-3.5 text-stone-400" />
                    <span>penil.space</span>
                    <span>›</span>
                    <span className="font-mono text-[11px]">{selectedEntry.url.replace('/', '') || 'home'}</span>
                  </div>
                  <div className="text-base text-blue-800 hover:underline cursor-pointer font-sans font-medium line-clamp-1">
                    {selectedEntry.titleTag}
                  </div>
                  <div className="text-xs text-stone-600 font-sans line-clamp-2 leading-relaxed">
                    {selectedEntry.metaDescription}
                  </div>
                </div>

                {/* Direct AEO Target */}
                <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-md">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>AEO / AI Overview Target Question</span>
                  </div>
                  <p className="text-xs font-medium text-amber-950 font-sans">
                    "{selectedEntry.targetAeoQuestion}"
                  </p>
                  <p className="text-[11px] font-serif text-amber-900/90 mt-1.5 leading-relaxed">
                    <strong>Direct Answer:</strong> {selectedEntry.aeoSnippetAnswer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: ON-PAGE SEO CHECKLIST */}
      {activeTab === 'checklist' && (
        <section className="space-y-6">
          <div className="bg-white border border-[#E5E0D8] rounded-lg p-5 shadow-xs">
            <h2 className="text-base font-semibold text-[#2D2A26] mb-1">
              How does Penil's Space systematically satisfy all technical on-page SEO and AEO criteria?
            </h2>
            <p className="text-xs text-[#595550] leading-relaxed">
              <strong className="font-mono text-[11px] text-[#D96C4A] mr-1">Answer:</strong>
              Every page and article complies with 10 strict on-page optimization rules—spanning clean unique URLs, keyword density, mobile responsiveness, Schema.org FAQPage structured data, lightweight vector imagery with descriptive alt text, and question-and-answer subheadings for Answer Engine Optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ON_PAGE_SEO_CHECKLIST.map((item, idx) => (
              <div key={idx} className="bg-white border border-[#E5E0D8] rounded-lg p-5 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans font-semibold text-sm text-[#2D2A26]">{item.rule}</h3>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        PASSED
                      </span>
                    </div>
                    <p className="text-xs text-[#595550]">{item.requirement}</p>
                    <div className="text-[11px] font-mono bg-[#FAF8F5] p-2 rounded border border-[#E5E0D8] text-[#2D2A26]">
                      {item.example}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Good URL Rules & Site-Wide Clean URL Directory */}
          <div className="bg-white border border-[#E5E0D8] rounded-lg p-3.5 sm:p-5 md:p-6 shadow-xs space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E5E0D8] gap-2">
              <div>
                <h3 className="font-sans font-semibold text-sm sm:text-base text-[#2D2A26] flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D96C4A] shrink-0" />
                  <span>Good URL Rules — Complete Site-Wide URL Directory</span>
                </h3>
                <p className="text-xs text-[#595550] mt-0.5">
                  Every page has its own unique, permanent URL engineered to follow strict search engine URL standards.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium self-start sm:self-auto shrink-0">
                100% CLEAN URLS
              </span>
            </div>

            {/* 6 Good URL Rules Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <strong className="text-[#2D2A26] block font-mono text-[11px] mb-1">1. Lowercase Only</strong>
                <span className="text-[#595550]">Zero uppercase characters to prevent duplicate content canonical fragmentation.</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <strong className="text-[#2D2A26] block font-mono text-[11px] mb-1">2. Kebab-Case Hyphens</strong>
                <span className="text-[#595550]">Words separated strictly by hyphens, never underscores or encoded spaces (%20).</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <strong className="text-[#2D2A26] block font-mono text-[11px] mb-1">3. Zero File Extensions</strong>
                <span className="text-[#595550]">No legacy .html, .php, or .aspx extensions for clean RESTful web standards.</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <strong className="text-[#2D2A26] block font-mono text-[11px] mb-1">4. No Query Parameters</strong>
                <span className="text-[#595550]">Core content paths avoid ?page= or ?id= strings to maximize crawl efficiency.</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <strong className="text-[#2D2A26] block font-mono text-[11px] mb-1">5. Keyword-Rich Slugs</strong>
                <span className="text-[#595550]">Target keywords are naturally embedded directly within the URL pathname.</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                <strong className="text-[#2D2A26] block font-mono text-[11px] mb-1">6. Canonicalized History</strong>
                <span className="text-[#595550]">Backed by HTML5 pushState &amp; &lt;link rel="canonical"&gt; matching each URL.</span>
              </div>
            </div>

            {/* Complete URL Manifest */}
            <div className="pt-2">
              <span className="text-xs font-mono font-semibold text-[#2D2A26] block mb-2">
                Active Clean URL Route Manifest:
              </span>
              <div className="space-y-1.5 font-mono text-[11px] sm:text-xs">
                <div className="p-2 sm:p-2.5 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-1 break-all sm:break-normal">
                  <span><strong>Homepage:</strong> <code>/</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded self-start sm:self-auto shrink-0">REST / Clean Root</span>
                </div>
                <div className="p-2 sm:p-2.5 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-1 break-all sm:break-normal">
                  <span><strong>Article 1:</strong> <code>/articles/why-first-impressions-matter-in-website-architecture</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded self-start sm:self-auto shrink-0">Kebab-case / Clean Slug</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>Article 2:</strong> <code>/articles/organizing-business-data-spreadsheets-to-dashboards</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Kebab-case / Clean Slug</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>Article 3:</strong> <code>/articles/digital-business-frameworks-generative-monetization</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Kebab-case / Clean Slug</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>Article 4:</strong> <code>/articles/presentation-design-masterclass-stakeholder-narratives</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Kebab-case / Clean Slug</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>Article 5:</strong> <code>/articles/generative-design-systems-tokens-llm</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Kebab-case / Clean Slug</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>Article 6:</strong> <code>/articles/diffusion-latents-to-production-css</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Kebab-case / Clean Slug</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>About Page:</strong> <code>/about</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Semantic / Clean</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>Projects Page:</strong> <code>/projects</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Semantic / Clean</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>Contact Page:</strong> <code>/contact</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Semantic / Clean</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>SEO Hub:</strong> <code>/seo-research</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Semantic / Clean</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>XML Sitemap:</strong> <code>/sitemap.xml</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">XML / Full HTTPS URLs</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>Robots Directives:</strong> <code>/robots.txt</code></span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Crawler Allow + Sitemap</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>301 Redirect:</strong> <code>/old-home → /</code></span>
                  <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">301 Moved Permanently</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] flex items-center justify-between">
                  <span><strong>Custom 404:</strong> <code>/404</code></span>
                  <span className="text-[10px] text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded">Friendly Hub / Main Links</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-stone-900 text-white rounded-lg border border-stone-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-3">
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                ACTIVE SCHEMA.ORG JSON-LD PAYLOAD PREVIEW
              </span>
              <span className="text-[11px] font-mono text-stone-400">Validated with Google Rich Results</span>
            </div>
            <pre className="text-[11px] font-mono text-stone-300 overflow-x-auto p-2 bg-stone-950 rounded">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Penil's Digital Space",
      "url": "https://digitalspace.io",
      "description": "Digital business and design notes exploring modern website architecture, data analytics, and micro-SaaS unit economics."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why do first impressions matter within 50 milliseconds in website architecture?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Users form aesthetic and credibility assessments of a website within 50 milliseconds because the human visual cortex evaluates balance, negative space, and typography before cognitive reading begins."
          }
        }
      ]
    }
  ]
}`}
            </pre>
          </div>
        </section>
      )}

      {/* TAB 3: AEO ANSWER ENGINE SNIPPET MATRIX */}
      {activeTab === 'aeo' && (
        <section className="space-y-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h2 className="text-sm font-semibold text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D96C4A]" />
              <span>What is Answer Engine Optimization (AEO)?</span>
            </h2>
            <p className="text-xs text-amber-900 mt-1 leading-relaxed">
              AEO optimizes content specifically for AI conversational search engines (Google AI Overviews, Perplexity, ChatGPT Search). The subheadings (H2) must be phrased as direct user queries, immediately followed by a concise 40-60 word authoritative answer paragraph before diving into code or deeper analysis.
            </p>
          </div>

          <div className="space-y-4">
            {KEYWORD_RESEARCH_TABLE.map((item, idx) => (
              <div key={idx} className="bg-white border border-[#E5E0D8] rounded-lg p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]/80 mb-3 text-xs">
                  <span className="font-semibold text-[#D96C4A] font-mono">
                    {item.pageName}
                  </span>
                  <code className="text-[#595550] font-mono text-[11px]">{item.url}</code>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2D2A26]">
                    <HelpCircle className="w-3.5 h-3.5 text-[#D96C4A]" />
                    <span className="text-sm font-sans">{item.targetAeoQuestion}</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border-l-2 border-[#D96C4A] rounded-r font-serif text-xs text-[#2D2A26] leading-relaxed">
                    <strong>AI Overview Snippet Answer:</strong> {item.aeoSnippetAnswer}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#595550] pt-1">
                    <span>Target Placement: {item.featuredSnippetOpportunity}</span>
                    <a
                      href={item.url}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.url === '/') onNavigateHome();
                        else onNavigateToArticle(item.url.replace('/articles/', ''));
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-[#D96C4A] hover:underline cursor-pointer"
                      title={`Inspect H2 Q&A and direct answer paragraph live in ${item.pageName}`}
                    >
                      <span>Inspect H2 Q&amp;A Live in {item.pageName}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
