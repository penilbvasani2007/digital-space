import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleView } from './components/ArticleView';
import { AboutView } from './components/AboutView';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { SeoResearchView } from './components/SeoResearchView';
import { GeminiStudio } from './components/GeminiStudio';
import { INITIAL_ARTICLES } from './data/articles';
import { Article } from './types';
import { 
  Search, Heart, Bookmark, ArrowRight, Mail, Sparkles, 
  LayoutGrid, List, Volume2, Clock, CheckCircle2, 
  BookOpen, ChevronRight, Filter, Table2, Tag, ShieldCheck, Globe
} from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentTab, setCurrentTab] = useState<'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo'>('articles');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedArticleIds, setSavedArticleIds] = useState<Set<string>>(new Set(['art-01', 'art-02']));
  const [clappedArticleIds, setClappedArticleIds] = useState<Set<string>>(new Set());
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'magazine' | 'compact'>('magazine');
  const [sidebarPrompt, setSidebarPrompt] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = [
    'All',
    'Web Design',
    'Data Analytics',
    'Digital Business',
    'Presentation Design',
  ];

  // STEP 3 ON-PAGE SEO: Real Clean URL routing via History API (pushState & popstate)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/articles/')) {
        const slug = path.replace('/articles/', '');
        const match = articles.find((a) => a.slug === slug);
        if (match) {
          setSelectedArticle(match);
          return;
        }
      }
      setSelectedArticle(null);
      if (path === '/about') setCurrentTab('about');
      else if (path === '/projects') setCurrentTab('projects');
      else if (path === '/contact') setCurrentTab('contact');
      else if (path === '/saved') setCurrentTab('saved');
      else if (path === '/seo-research') setCurrentTab('seo');
      else setCurrentTab('articles');
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [articles]);

  // Synchronize document.title, meta description, canonical, and og:url on route change
  useEffect(() => {
    if (!selectedArticle) {
      let title = "Digital Business & Design Notes | Penil's Digital Space";
      let desc = "Explore digital business and design notes on modern website architecture, executive data analytics frameworks, and vertical micro-SaaS strategy by Penil Vasani.";
      let path = '/';

      if (currentTab === 'seo') {
        title = "SEO Keyword Research Table & On-Page Audit | Penil's Space";
        desc = "Review the comprehensive SEO keyword research table, on-page SEO checklist, and Answer Engine Optimization (AEO) matrix for Penil's Digital Space notebook.";
        path = '/seo-research';
      } else if (currentTab === 'about') {
        title = "About Penil Vasani — Web Design Technologist | Penil's Space";
        desc = "Learn about Penil Vasani, digital strategist and design technologist exploring modern website architecture, business data analytics, and presentation systems.";
        path = '/about';
      } else if (currentTab === 'projects') {
        title = "Digital Business Projects & Web Prototypes | Penil's Space";
        desc = "Browse digital business projects, interactive design prototypes, and website architecture case studies built by Penil Vasani. Explore live demos and metrics.";
        path = '/projects';
      } else if (currentTab === 'contact') {
        title = "Contact Penil Vasani — Strategy Inquiries | Penil's Space";
        desc = "Contact Penil Vasani for digital strategy consulting, modern website design inquiries, and business data analytics advisory. Send a message or project brief.";
        path = '/contact';
      } else if (currentTab === 'saved') {
        title = "Saved Notes & Masterclass Essays | Penil's Digital Space";
        desc = "Curated personal reading archive of masterclass notes on modern website architecture, data analytics dashboards, and digital business frameworks.";
        path = '/saved';
      }

      document.title = title;

      // Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', desc);

      // OpenGraph
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', desc);
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', `${window.location.origin}${path}`);

      // Canonical link
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', `${window.location.origin}${path}`);

      // Twitter
      let twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', title);
      let twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', desc);
    }
  }, [currentTab, selectedArticle]);

  // Navigation handler
  const navigateTo = (tab: 'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo', article?: Article | null) => {
    if (article) {
      setSelectedArticle(article);
      window.history.pushState({}, '', `/articles/${article.slug}`);
    } else {
      setSelectedArticle(null);
      setCurrentTab(tab);
      const targetPath = 
        tab === 'about' ? '/about' :
        tab === 'projects' ? '/projects' :
        tab === 'contact' ? '/contact' :
        tab === 'saved' ? '/saved' :
        tab === 'seo' ? '/seo-research' : '/';
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Upvote / Clap handler
  const handleClap = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const already = clappedArticleIds.has(id);
          return {
            ...art,
            claps: already ? art.claps - 1 : art.claps + 1,
          };
        }
        return art;
      })
    );

    setClappedArticleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev) =>
        prev
          ? {
              ...prev,
              claps: clappedArticleIds.has(id) ? prev.claps - 1 : prev.claps + 1,
            }
          : null
      );
    }
  };

  // Bookmark / Save handler
  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedArticleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Category article counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: articles.length };
    articles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    let list = [...articles];

    if (currentTab === 'saved') {
      list = list.filter((art) => savedArticleIds.has(art.id));
    }

    if (selectedCategory !== 'All') {
      list = list.filter((art) => art.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.subtitle.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q) ||
          art.mainKeyword.toLowerCase().includes(q) ||
          art.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [articles, currentTab, selectedCategory, searchQuery, savedArticleIds]);

  const handleSelectArticle = (article: Article) => {
    navigateTo('articles', article);
  };

  const handleBackToArticles = () => {
    navigateTo('articles', null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2D2A26] font-serif">
      {/* Header with Navigation & SEO Research Tab */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => navigateTo(tab, null)}
        savedCount={savedArticleIds.size}
        onOpenStudio={() => setIsStudioOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1">
        {selectedArticle ? (
          <ArticleView
            article={selectedArticle}
            onBack={handleBackToArticles}
            onSelectArticle={(art) => navigateTo('articles', art)}
            isSaved={savedArticleIds.has(selectedArticle.id)}
            onToggleSave={handleToggleSave}
            onClap={handleClap}
            hasClapped={clappedArticleIds.has(selectedArticle.id)}
          />
        ) : currentTab === 'seo' ? (
          <SeoResearchView
            onNavigateToArticle={(slug) => {
              const match = articles.find((a) => a.slug === slug);
              if (match) navigateTo('articles', match);
            }}
            onNavigateHome={() => navigateTo('articles', null)}
            onNavigateToTab={(tab) => navigateTo(tab, null)}
          />
        ) : currentTab === 'about' ? (
          <AboutView 
            onNavigateToContact={() => navigateTo('contact', null)} 
            onNavigateToArticle={(slug) => {
              const match = articles.find((a) => a.slug === slug);
              if (match) handleSelectArticle(match);
            }}
          />
        ) : currentTab === 'projects' ? (
          <ProjectsSection onExploreArticle={(slug) => {
            const match = articles.find((a) => a.slug === slug);
            if (match) handleSelectArticle(match);
          }} />
        ) : currentTab === 'contact' ? (
          <ContactSection />
        ) : (
          <main className="max-w-[1140px] mx-auto px-6 md:px-8">
            {/* User-Centric Hero Section */}
            {currentTab === 'saved' ? (
              <section className="my-12 max-w-[700px]">
                <span className="font-sans text-[0.8rem] uppercase tracking-[1px] text-[#D96C4A] font-semibold block mb-2">
                  Personal Reading Archive
                </span>
                <h1 className="font-sans font-semibold text-3xl md:text-4xl text-[#2D2A26] leading-tight mb-4">
                  Saved Notes &amp; Essays ({savedArticleIds.size})
                </h1>
                <p className="font-serif text-lg text-[#595550]">
                  Articles and masterclass frameworks you've pinned for thoughtful reading.
                </p>
              </section>
            ) : (
              <section className="py-6 md:py-8 mb-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-6 border-b border-[#E5E0D8]/60">
                <div className="lg:col-span-8 space-y-3">
                  {/* Target Keywords Badge for Homepage */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#595550]">
                    <span className="flex items-center gap-1 font-semibold text-[#D96C4A]">
                      <Tag className="w-3 h-3" />
                      <span>TARGET KEYWORDS:</span>
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded border border-[#E5E0D8] text-[#2D2A26] font-semibold">
                      digital business and design notes
                    </span>
                    <span className="text-[#E5E0D8]">·</span>
                    <span className="bg-white px-1.5 py-0.5 rounded border border-[#E5E0D8]">
                      modern website architecture
                    </span>
                    <span className="text-[#E5E0D8]">·</span>
                    <span className="bg-white px-1.5 py-0.5 rounded border border-[#E5E0D8]">
                      business data analytics frameworks
                    </span>
                  </div>

                  <h1 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-[2.75rem] text-[#2D2A26] leading-[1.12] tracking-[-0.8px]">
                    Bridging the gap between digital business and thoughtful design.
                  </h1>
                  <p className="font-serif text-base sm:text-lg text-[#595550] leading-relaxed max-w-2xl">
                    Welcome to my personal notebook exploring modern website architecture, executive data analytics frameworks, and vertical micro-SaaS unit economics. Every article is engineered with in-depth analysis, bespoke small-size imagery, and Answer Engine Optimization (AEO).
                  </p>
                  
                  {/* Action buttons with descriptive anchor text */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href="/seo-research"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('seo', null);
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#D96C4A] hover:bg-[#B85536] text-white rounded-md text-xs font-sans font-semibold transition-all cursor-pointer shadow-xs"
                      title="Inspect Keyword Research Table for Homepage and 3 Articles"
                    >
                      <Table2 className="w-3.5 h-3.5 text-white" />
                      <span>Inspect Keyword Research Table &amp; On-Page SEO (Steps 1–3)</span>
                    </a>
                    <button
                      onClick={() => setIsStudioOpen(true)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#2D2A26] hover:bg-[#3E3A36] text-white rounded-md text-xs font-sans font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D96C4A]" />
                      <span>Launch AI Studio (Chatbot · Search · Voice)</span>
                    </button>
                  </div>
                </div>

                {/* Right Hero Overview Card */}
                <div className="lg:col-span-4 bg-white border border-[#E5E0D8] rounded-lg p-4 shadow-xs font-sans space-y-2.5">
                  <div className="flex items-center justify-between pb-1 border-b border-[#E5E0D8]/80">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#D96C4A] font-semibold block">
                      ON-PAGE SEO AUDIT
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                      VERIFIED 100%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                      <span className="text-[9px] text-[#595550] block font-mono">IMAGE ASSETS</span>
                      <span className="text-xs font-bold text-[#2D2A26] font-mono">&lt; 3KB Vector</span>
                    </div>
                    <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                      <span className="text-[9px] text-[#595550] block font-mono">AEO FORMAT</span>
                      <span className="text-xs font-bold text-[#2D2A26] font-mono">H2 Q&amp;A Pairs</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#595550] font-serif leading-snug pt-0.5">
                    Unique URLs, title rules (50–60), meta description (140–160), anchor text, and Schema.org FAQPage active.
                  </div>
                </div>
              </section>
            )}

            {/* Category Filters, Search & View Controls */}
            <div id="notebook-feed" className="mb-6 pb-3 border-b border-[#E5E0D8] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 font-sans scroll-mt-20">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                        selectedCategory === cat
                          ? 'bg-[#2D2A26] text-white shadow-xs'
                          : 'text-[#595550] hover:text-[#2D2A26] hover:bg-[#E5E0D8]/40 border border-transparent'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] font-mono tabular-nums ${selectedCategory === cat ? 'text-stone-300' : 'text-[#595550]'}`}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* View Switcher & Search */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-[#E5E0D8] rounded p-0.5">
                  <button
                    onClick={() => setViewMode('magazine')}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'magazine' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:text-[#2D2A26]'
                    }`}
                    title="Magazine Cards with Visuals"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'compact' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:text-[#2D2A26]'
                    }`}
                    title="Compact Scan List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="relative flex-1 md:w-56">
                  <Search className="w-3.5 h-3.5 text-[#595550] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes & keywords..."
                    className="pl-7 pr-3 py-1.5 text-xs bg-white border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] w-full text-[#2D2A26]"
                  />
                </div>
              </div>
            </div>

            {/* Articles Stream and Companion Rail */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start" id="articles">
              <div className="lg:col-span-8">
                {filteredArticles.length === 0 ? (
                  <div className="py-16 text-center bg-white rounded-lg border border-[#E5E0D8] p-8">
                    <p className="text-[#595550] text-sm font-serif">No notes found matching "{searchQuery}".</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                      className="mt-3 text-xs font-sans font-semibold text-[#D96C4A] hover:underline cursor-pointer"
                    >
                      Clear search filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 sm:space-y-7">
                    {filteredArticles.map((article) => (
                      <article
                        key={article.id}
                        onClick={() => handleSelectArticle(article)}
                        className="bg-white border border-[#E5E0D8] rounded-lg p-5 sm:p-6 hover:border-[#D96C4A]/60 transition-all cursor-pointer group shadow-xs"
                      >
                        {/* Dedicated Small Vector Image with Alt Text (< 3KB) */}
                        <div className="w-full h-48 sm:h-56 rounded-md overflow-hidden mb-4 border border-[#E5E0D8] bg-[#FAF8F5] relative group-hover:border-[#D96C4A]/50 transition-all">
                          <img
                            src={article.coverImage}
                            alt={article.imageAlt}
                            width={800}
                            height={450}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2 bg-[#2D2A26]/85 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded">
                            SVG · &lt; 3KB · Zero CLS
                          </div>
                        </div>

                        {/* Category & Keywords */}
                        <div className="flex flex-wrap items-center justify-between text-xs font-sans mb-2 gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[0.8rem] uppercase tracking-[1px] text-[#D96C4A] font-semibold">
                              {article.category}
                            </span>
                            <span className="text-[#E5E0D8]">·</span>
                            <span className="font-mono text-[#595550] text-[11px] bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E5E0D8]">
                              KW: {article.mainKeyword}
                            </span>
                          </div>
                          <span className="font-mono text-[#595550] text-[11px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D96C4A]" />
                            {article.readTime}
                          </span>
                        </div>

                        {/* Title with Semantic Anchor */}
                        <h2 className="font-sans font-semibold text-2xl sm:text-[1.75rem] text-[#2D2A26] group-hover:text-[#D96C4A] transition-colors leading-[1.25] my-2">
                          <a
                            href={`/articles/${article.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelectArticle(article);
                            }}
                            className="hover:underline focus:outline-none"
                            title={`Read complete article: ${article.title}`}
                          >
                            {article.title}
                          </a>
                        </h2>

                        {/* Subtitle / Excerpt */}
                        <p className="font-serif text-[#2D2A26] text-base leading-[1.65] my-3">
                          {article.excerpt}
                        </p>

                        {/* Actions & Explicit Anchor Text */}
                        <div className="flex flex-wrap items-center justify-between text-xs text-[#595550] font-sans pt-3 border-t border-[#E5E0D8]/60 mt-4 gap-3">
                          <a
                            href={`/articles/${article.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelectArticle(article);
                            }}
                            className="text-[#D96C4A] font-semibold group-hover:underline inline-flex items-center gap-1"
                            title={`Read the full masterclass guide: ${article.title}`}
                          >
                            <span>Read complete guide on {article.mainKeyword}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={(e) => handleClap(article.id, e)}
                              className={`flex items-center gap-1 p-1 hover:text-[#D96C4A] transition-colors cursor-pointer ${
                                clappedArticleIds.has(article.id) ? 'text-[#D96C4A] font-semibold' : ''
                              }`}
                              title="Applaud essay"
                            >
                              <Heart className={`w-3.5 h-3.5 ${clappedArticleIds.has(article.id) ? 'fill-[#D96C4A]' : ''}`} />
                              <span className="font-mono tabular-nums">{article.claps}</span>
                            </button>

                            <button
                              onClick={(e) => handleToggleSave(article.id, e)}
                              className={`p-1 hover:text-[#2D2A26] transition-colors cursor-pointer ${
                                savedArticleIds.has(article.id) ? 'text-[#2D2A26]' : 'text-[#595550]'
                              }`}
                              title={savedArticleIds.has(article.id) ? 'Saved' : 'Save for later'}
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${savedArticleIds.has(article.id) ? 'fill-[#2D2A26]' : ''}`} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Companion Rail */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="sticky top-24 space-y-6">
                  {/* SEO Hub Card */}
                  <div className="bg-white p-5 rounded-lg border border-[#E5E0D8] shadow-xs space-y-3 font-sans">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-[#D96C4A]/10 text-[#D96C4A] flex items-center justify-center font-bold">
                        <Table2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-[#2D2A26]">SEO &amp; AEO Engine</h3>
                        <span className="text-[10px] font-mono text-emerald-700">Steps 1, 2, 3 Active</span>
                      </div>
                    </div>
                    <p className="font-serif text-xs text-[#595550] leading-relaxed">
                      Every page features unique clean URLs, 1 main + 2 related keywords, strict title/meta limits, vector artwork with alt text, and question-answer H2 subheadings for AI answer engines.
                    </p>
                    <a
                      href="/seo-research"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('seo', null);
                      }}
                      className="w-full py-2 px-3 bg-[#FAF8F5] hover:bg-[#D96C4A] hover:text-white border border-[#E5E0D8] rounded text-xs font-semibold text-[#2D2A26] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Inspect Keyword Research Table for Homepage and 3 Articles"
                    >
                      <span>Open Keyword Research Table &amp; Specs</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Current Focus Card */}
                  <div className="bg-white p-6 rounded-lg shadow-xs border border-[#E5E0D8]/80 font-sans space-y-3">
                    <h3 className="font-semibold text-base text-[#2D2A26] border-b-2 border-[#D96C4A] inline-block pb-1">
                      Current Focus
                    </h3>
                    <p className="font-serif text-[#2D2A26] text-xs leading-[1.6]">
                      Right now, I'm diving deep into digital business frameworks, high data-ink executive dashboards, and experimenting with presentation narrative architecture.
                    </p>
                    <div className="pt-2 border-t border-[#E5E0D8]/60 text-xs text-[#595550] flex items-center justify-between font-mono text-[11px]">
                      <span>Penil Vasani</span>
                      <span className="text-[#D96C4A]">2026 Masterclasses</span>
                    </div>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="bg-white p-6 rounded-lg border border-[#E5E0D8] shadow-xs font-sans">
                    <h3 className="font-semibold text-base text-[#2D2A26] mb-1.5">
                      The Digital Space Notebook
                    </h3>
                    <p className="font-serif text-xs text-[#595550] mb-4 leading-relaxed">
                      Bi-weekly masterclass notes on modern web architecture, unit economics, and data analytics. No marketing clutter.
                    </p>
                    {newsletterSubscribed ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Subscribed! Check your inbox for the architecture notes.</span>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setNewsletterSubscribed(true);
                        }}
                        className="space-y-2.5"
                      >
                        <input
                          type="email"
                          required
                          placeholder="your.email@company.com"
                          className="w-full px-3 py-2 text-xs border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] bg-[#FAF8F5]"
                        />
                        <button
                          type="submit"
                          className="w-full py-2 bg-[#2D2A26] hover:bg-[#D96C4A] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-xs"
                        >
                          Join 2,400+ Readers
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </main>
        )}
      </div>

      {/* Footer with Semantic Anchor Links */}
      <Footer onSelectTab={(tab) => navigateTo(tab, null)} />

      {/* AI Studio Drawer */}
      <GeminiStudio isOpen={isStudioOpen} onClose={() => setIsStudioOpen(false)} />
    </div>
  );
}
