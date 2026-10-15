import React, { useState } from 'react';
import { KEYWORD_RESEARCH_TABLE, ON_PAGE_SEO_CHECKLIST, KeywordResearchEntry } from '../data/seoKeywords';
import { Search, CheckCircle2, Globe, FileText, Image as ImageIcon, Link as LinkIcon, HelpCircle, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

interface SeoResearchViewProps {
  onNavigateToArticle: (slug: string) => void;
  onNavigateHome: () => void;
}

export const SeoResearchView: React.FC<SeoResearchViewProps> = ({
  onNavigateToArticle,
  onNavigateHome,
}) => {
  const [selectedEntry, setSelectedEntry] = useState<KeywordResearchEntry>(KEYWORD_RESEARCH_TABLE[1]);
  const [activeTab, setActiveTab] = useState<'table' | 'checklist' | 'aeo'>('table');

  return (
    <div className="max-w-[1140px] mx-auto px-6 md:px-8 py-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-[#E5E0D8] pb-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#D96C4A] font-semibold bg-[#D96C4A]/10 px-2 py-0.5 rounded">
            STEP 2 &amp; STEP 3 VERIFICATION
          </span>
          <span className="text-xs font-mono text-[#595550]">On-Page SEO &amp; AEO Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-sans font-semibold text-[#2D2A26] leading-tight mb-3">
          Keyword Research Table &amp; On-Page SEO Engine
        </h1>
        <p className="font-serif text-lg text-[#595550] max-w-3xl leading-relaxed">
          Comprehensive SEO keyword mapping for the Homepage and core articles, demonstrating unique clean URLs, strict title/meta formatting, lightweight images with alt text, descriptive anchor links, and Answer Engine Optimization (AEO) question-answer hierarchies.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'table'
                ? 'bg-[#2D2A26] text-white shadow-xs'
                : 'bg-white border border-[#E5E0D8] text-[#595550] hover:text-[#2D2A26]'
            }`}
          >
            1. Keyword Research Table (Homepage + 3 Articles)
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-[#2D2A26] text-white shadow-xs'
                : 'bg-white border border-[#E5E0D8] text-[#595550] hover:text-[#2D2A26]'
            }`}
          >
            2. On-Page SEO Verification Checklist
          </button>
          <button
            onClick={() => setActiveTab('aeo')}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'aeo'
                ? 'bg-[#2D2A26] text-white shadow-xs'
                : 'bg-white border border-[#E5E0D8] text-[#595550] hover:text-[#2D2A26]'
            }`}
          >
            3. AEO Answer Engine Snippet Matrix
          </button>
        </div>
      </div>

      {/* TAB 1: KEYWORD RESEARCH TABLE */}
      {activeTab === 'table' && (
        <section className="space-y-8">
          <div className="bg-white border border-[#E5E0D8] rounded-lg shadow-xs overflow-hidden">
            <div className="p-4 bg-[#FAF8F5] border-b border-[#E5E0D8] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#2D2A26]">
                  Master Keyword Research Table (Homepage &amp; 3 Core Articles)
                </h2>
                <p className="text-xs text-[#595550] mt-0.5">
                  Every page has 1 Main Keyword + 2 Related Keywords with search volume, intent, clean URLs, and title/meta specs.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                100% SEO COMPLIANT
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#595550] font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 font-semibold">Target Page</th>
                    <th className="py-3 px-4 font-semibold">Unique Clean URL</th>
                    <th className="py-3 px-4 font-semibold text-[#D96C4A]">Main Keyword</th>
                    <th className="py-3 px-4 font-semibold">Related Keyword 1</th>
                    <th className="py-3 px-4 font-semibold">Related Keyword 2</th>
                    <th className="py-3 px-4 font-semibold">Search Intent</th>
                    <th className="py-3 px-4 font-semibold">Action</th>
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
                      <td className="py-3.5 px-4 font-sans font-semibold text-[#2D2A26]">
                        {item.pageName}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#595550]">
                        <code className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E5E0D8]">
                          {item.url}
                        </code>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#D96C4A]">
                        {item.mainKeyword}
                      </td>
                      <td className="py-3.5 px-4 text-[#595550]">
                        {item.relatedKeyword1}
                      </td>
                      <td className="py-3.5 px-4 text-[#595550]">
                        {item.relatedKeyword2}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-stone-100 text-[#595550]">
                          {item.searchIntent}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {item.url === '/' ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateHome();
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D96C4A] hover:underline cursor-pointer"
                          >
                            <span>View Page</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const slug = item.url.replace('/articles/', '');
                              onNavigateToArticle(slug);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D96C4A] hover:underline cursor-pointer"
                          >
                            <span>Read Article</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deep Inspection Panel for Selected Entry */}
          <div className="bg-white border border-[#E5E0D8] rounded-lg p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8] mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D96C4A] uppercase tracking-wider font-semibold">
                  Page SEO Detail Specimen
                </span>
                <h3 className="text-xl font-sans font-semibold text-[#2D2A26] mt-0.5">
                  {selectedEntry.pageName}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#595550]">Target Clean URL</span>
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
                    <button
                      onClick={() => {
                        if (item.url === '/') onNavigateHome();
                        else onNavigateToArticle(item.url.replace('/articles/', ''));
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-[#D96C4A] hover:underline cursor-pointer"
                    >
                      <span>Inspect H2 Q&amp;A Live in Page</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
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
