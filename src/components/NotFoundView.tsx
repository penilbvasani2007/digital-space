import React, { useEffect } from 'react';
import { Home, BookOpen, Layers, BarChart2, Mail, ArrowRight, Search, Compass } from 'lucide-react';
import { INITIAL_ARTICLES } from '../data/articles';
import { Article } from '../types';

interface NotFoundViewProps {
  onNavigateHome: () => void;
  onNavigateTab: (tab: 'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo') => void;
  onNavigateArticle: (slug: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onNavigateHome,
  onNavigateTab,
  onNavigateArticle,
}) => {
  // Self-referencing canonical and descriptive title for 404 page
  useEffect(() => {
    document.title = "404 Page Not Found | Penil's Digital Space";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "The requested page was not found on Penil's Digital Space. Explore core notes on website architecture, data analytics, and digital business.");
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, []);

  const coreEssays = INITIAL_ARTICLES.slice(0, 3);

  const mainPages = [
    {
      title: 'Notebook Home',
      desc: 'Browse all essays, masterclass notes, and architectural patterns.',
      icon: Home,
      action: () => onNavigateHome(),
      badge: 'Main Feed',
      path: '/'
    },
    {
      title: 'About Penil Vasani',
      desc: 'Learn about Penil, design philosophy, and masterclass studies.',
      icon: BookOpen,
      action: () => onNavigateTab('about'),
      badge: 'Biography',
      path: '/about'
    },
    {
      title: 'Projects & Case Studies',
      desc: 'Interactive prototypes, executive KPI tools, and live demos.',
      icon: Layers,
      action: () => onNavigateTab('projects'),
      badge: 'Prototypes',
      path: '/projects'
    },
    {
      title: 'SEO Research & On-Page Audit',
      desc: 'Keyword target table, technical SEO checklist, and AEO matrix.',
      icon: BarChart2,
      action: () => onNavigateTab('seo'),
      badge: 'Technical SEO',
      path: '/seo-research'
    },
    {
      title: 'Contact & Advisory',
      desc: 'Inquire about digital strategy advisory and consulting.',
      icon: Mail,
      action: () => onNavigateTab('contact'),
      badge: 'Get in Touch',
      path: '/contact'
    },
  ];

  return (
    <main className="max-w-[960px] mx-auto px-3.5 sm:px-6 md:px-8 py-8 sm:py-14 md:py-16 font-sans">
      {/* 404 Editorial Header */}
      <div className="max-w-[680px] mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#D96C4A]/10 text-[#D96C4A] font-mono text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>HTTP 404 NOT FOUND</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2D2A26] tracking-tight leading-[1.15] mb-3 sm:mb-4">
          404 Error: Page Not Found
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-serif text-[#D96C4A] font-medium mb-3">
          Lost in Thought? This page has moved or doesn't exist.
        </p>

        <p className="text-sm sm:text-base font-serif text-[#595550] leading-relaxed mb-6">
          The page, essay, or resource you are looking for might have been relocated, renamed, or is currently being drafted. We invite you to explore the main sections of Penil's notebook or jump straight into popular masterclass essays below.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2D2A26] text-white hover:bg-[#D96C4A] rounded-md font-sans text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigateTab('about')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E0D8] text-[#2D2A26] hover:border-[#2D2A26] rounded-md font-sans text-xs sm:text-sm font-medium transition-colors"
          >
            <span>Read About Penil</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Pages Navigation Grid */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E0D8] mb-4">
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#595550] font-semibold">
            Explore Main Pages
          </h2>
          <span className="text-[11px] font-mono text-[#D96C4A]">5 Core Destinations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {mainPages.map((page, idx) => {
            const Icon = page.icon;
            return (
              <a
                key={idx}
                href={page.path}
                onClick={(e) => {
                  e.preventDefault();
                  page.action();
                }}
                className="group p-4 bg-white border border-[#E5E0D8] rounded-lg hover:border-[#D96C4A] transition-all flex flex-col justify-between shadow-2xs text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#D96C4A] group-hover:bg-[#D96C4A] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[#595550] border border-[#E5E0D8]/60">
                      {page.badge}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-sm sm:text-base text-[#2D2A26] group-hover:text-[#D96C4A] transition-colors mb-1">
                    {page.title}
                  </h3>
                  <p className="text-xs font-serif text-[#595550] leading-relaxed">
                    {page.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E5E0D8]/60 flex items-center justify-between text-xs font-semibold text-[#D96C4A]">
                  <span className="font-mono text-[11px]">{page.path}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Recommended Core Essays */}
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E0D8] mb-4">
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#595550] font-semibold">
            Featured Masterclass Essays
          </h2>
          <span className="text-[11px] font-mono text-[#595550]">Recommended Reading</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {coreEssays.map((art) => (
            <a
              key={art.id}
              href={`/articles/${art.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigateArticle(art.slug);
              }}
              className="group p-4 bg-white border border-[#E5E0D8] rounded-lg hover:border-[#2D2A26] transition-all flex flex-col justify-between shadow-2xs"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#D96C4A] font-semibold block mb-1">
                  {art.category} · {art.readTime}
                </span>
                <h3 className="font-serif font-medium text-sm sm:text-base text-[#2D2A26] group-hover:text-[#D96C4A] transition-colors line-clamp-2 leading-snug mb-1.5">
                  {art.title}
                </h3>
                <p className="text-xs font-serif text-[#595550] line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
              <div className="pt-2.5 mt-2.5 border-t border-[#E5E0D8]/60 flex items-center justify-between text-xs text-[#595550]">
                <span className="font-sans text-[11px] font-medium text-[#D96C4A] group-hover:underline">Read essay</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D96C4A] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};
