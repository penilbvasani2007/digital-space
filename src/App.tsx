import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleView } from './components/ArticleView';
import { AboutView } from './components/AboutView';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { GeminiStudio } from './components/GeminiStudio';
import { EditorialArtwork } from './components/EditorialArtwork';
import { INITIAL_ARTICLES } from './data/articles';
import { Article } from './types';
import { 
  Search, Heart, Bookmark, ArrowRight, Mail, Sparkles, 
  LayoutGrid, List, Volume2, Clock, CheckCircle2, 
  BookOpen, ChevronRight, Filter 
} from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentTab, setCurrentTab] = useState<'articles' | 'about' | 'projects' | 'contact' | 'saved'>('articles');
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
    'AI & Automation',
  ];

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
          art.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [articles, currentTab, selectedCategory, searchQuery, savedArticleIds]);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2D2A26] font-serif">
      {/* Header with Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setSelectedArticle(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedArticleIds.size}
        onOpenStudio={() => setIsStudioOpen(true)}
      />

      {/* Main Container with Optimum Utilization of White Space */}
      <div className="flex-1">
        {selectedArticle ? (
          <ArticleView
            article={selectedArticle}
            onBack={handleBackToArticles}
            isSaved={savedArticleIds.has(selectedArticle.id)}
            onToggleSave={handleToggleSave}
            onClap={handleClap}
            hasClapped={clappedArticleIds.has(selectedArticle.id)}
          />
        ) : currentTab === 'about' ? (
          <AboutView onNavigateToContact={() => setCurrentTab('contact')} />
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
                  Saved Notes & Essays ({savedArticleIds.size})
                </h1>
                <p className="font-serif text-lg text-[#595550]">
                  Articles and masterclass frameworks you've pinned for thoughtful reading.
                </p>
              </section>
            ) : (
              <section className="py-6 md:py-8 mb-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-6 border-b border-[#E5E0D8]/60">
                <div className="lg:col-span-8 space-y-3">
                  <h1 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-[2.75rem] text-[#2D2A26] leading-[1.12] tracking-[-0.8px]">
                    Bridging the gap between digital business and thoughtful design.
                  </h1>
                  <p className="font-serif text-base sm:text-lg text-[#595550] leading-relaxed max-w-2xl">
                    Hi there. I'm exploring modern website architecture, data analytics, and digital business strategy. Welcome to my personal notebook sharing practical tutorials and insights from my latest masterclasses.
                  </p>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      onClick={() => setIsStudioOpen(true)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#2D2A26] hover:bg-[#D96C4A] text-white rounded-md text-xs font-sans font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D96C4A]" />
                      <span>Launch AI Assistant (Chatbot · Search · Voice)</span>
                    </button>
                    <button
                      onClick={() => {
                        const el = document.getElementById('notebook-feed');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E5E0D8] hover:border-[#D96C4A] rounded-md text-xs font-sans font-semibold text-[#2D2A26] hover:text-[#D96C4A] transition-all cursor-pointer shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#D96C4A]" />
                      <span>Browse 10 Masterclass Notes</span>
                    </button>
                  </div>
                </div>

                {/* Right Hero Overview Card: Eliminates Empty White Space */}
                <div className="lg:col-span-4 bg-white border border-[#E5E0D8] rounded-lg p-4 shadow-xs font-sans space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D96C4A] font-semibold block">
                    Notebook Quick Metrics
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                      <span className="text-[9px] text-[#595550] block font-mono">ESSAYS</span>
                      <span className="text-sm font-bold text-[#2D2A26] tabular-nums">10 In-Depth</span>
                    </div>
                    <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                      <span className="text-[9px] text-[#595550] block font-mono">STUDIES</span>
                      <span className="text-sm font-bold text-[#2D2A26] tabular-nums">4 Disciplines</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#595550] font-serif leading-snug pt-0.5">
                    Interactive simulators, code formulas, and AI audio narration enabled.
                  </div>
                </div>
              </section>
            )}

            {/* User-Centric Controls: Categories, View Mode & Instant Search */}
            <div id="notebook-feed" className="mb-6 pb-3 border-b border-[#E5E0D8] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 font-sans scroll-mt-20">
              {/* Category Filter Tabs with Counts */}
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
                {/* View Mode Switcher */}
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

                {/* Instant Search Bar */}
                <div className="relative flex-1 md:w-56">
                  <Search className="w-3.5 h-3.5 text-[#595550] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes & tokens..."
                    className="pl-7 pr-3 py-1.5 text-xs bg-white border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] w-full text-[#2D2A26]"
                  />
                </div>
              </div>
            </div>

            {/* Balanced Two-Column Grid (8 cols articles, 4 cols sticky companion sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start" id="articles">
              {/* Articles Main Stream (8 cols) */}
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
                ) : viewMode === 'compact' ? (
                  /* Compact View Mode: High information density, quick scanning */
                  <div className="space-y-4">
                    {filteredArticles.map((article) => (
                      <article
                        key={article.id}
                        onClick={() => handleSelectArticle(article)}
                        className="p-4 bg-white border border-[#E5E0D8] rounded-lg hover:border-[#D96C4A]/60 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          {/* Mini Thumbnail */}
                          <div className="w-16 h-16 rounded overflow-hidden border border-[#E5E0D8] shrink-0 bg-[#FAF8F5]">
                            <EditorialArtwork
                              type={article.visualGraphic}
                              accent={article.coverAccent}
                              className="w-full h-full"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[11px] font-sans">
                              <span className="font-semibold text-[#D96C4A] uppercase tracking-wider">{article.category}</span>
                              <span className="text-[#E5E0D8]">·</span>
                              <span className="text-[#595550] font-mono">{article.readTime}</span>
                            </div>
                            <h3 className="font-sans font-semibold text-base text-[#2D2A26] group-hover:text-[#D96C4A] transition-colors leading-snug">
                              {article.title}
                            </h3>
                            <p className="font-serif text-xs text-[#595550] line-clamp-1">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-sans text-[#595550] self-end sm:self-center shrink-0">
                          <button
                            onClick={(e) => handleClap(article.id, e)}
                            className="flex items-center gap-1 hover:text-[#D96C4A]"
                          >
                            <Heart className={`w-3.5 h-3.5 ${clappedArticleIds.has(article.id) ? 'fill-[#D96C4A] text-[#D96C4A]' : ''}`} />
                            <span className="font-mono tabular-nums">{article.claps}</span>
                          </button>
                          <button
                            onClick={(e) => handleToggleSave(article.id, e)}
                            className="p-1 hover:text-[#2D2A26]"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${savedArticleIds.has(article.id) ? 'fill-[#2D2A26] text-[#2D2A26]' : ''}`} />
                          </button>
                          <ChevronRight className="w-4 h-4 text-[#D96C4A] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  /* Magazine Card Mode: Rich visual storytelling with optimal white space */
                  <div className="space-y-6 sm:space-y-7">
                    {filteredArticles.map((article) => (
                      <article
                        key={article.id}
                        onClick={() => handleSelectArticle(article)}
                        className="bg-white border border-[#E5E0D8] rounded-lg p-5 sm:p-6 hover:border-[#D96C4A]/60 transition-all cursor-pointer group shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                      >
                        {/* Visual Editorial Image */}
                        <div className="w-full h-44 sm:h-52 rounded-md overflow-hidden mb-4 border border-[#E5E0D8] bg-[#FAF8F5] shadow-xs group-hover:border-[#D96C4A]/50 transition-all">
                          <EditorialArtwork
                            type={article.visualGraphic}
                            accent={article.coverAccent}
                            className="w-full h-full"
                          />
                        </div>

                        {/* Tag & Read Time */}
                        <div className="flex items-center justify-between text-xs font-sans mb-2">
                          <span className="text-[0.8rem] uppercase tracking-[1px] text-[#D96C4A] font-semibold">
                            {article.category}
                          </span>
                          <span className="font-mono text-[#595550] text-[11px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D96C4A]" />
                            {article.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-sans font-semibold text-2xl sm:text-[1.75rem] text-[#2D2A26] group-hover:text-[#D96C4A] transition-colors leading-[1.25] my-2">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="font-serif text-[#2D2A26] text-base leading-[1.65] my-3">
                          {article.excerpt}
                        </p>

                        {/* Footnote & User-Centric Actions */}
                        <div className="flex items-center justify-between text-xs text-[#595550] font-sans pt-3 border-t border-[#E5E0D8]/60 mt-4">
                          <span className="text-[#D96C4A] font-semibold group-hover:underline flex items-center gap-1">
                            Read Full Masterclass Notes <ArrowRight className="w-3.5 h-3.5" />
                          </span>

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

              {/* Right Sticky Sidebar (4 cols): Fully Utilizes White Space */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="sticky top-24 space-y-6">
                  {/* Current Focus Card with Organic Subtle Tilt (-0.5deg) */}
                  <div className="bg-[#FFFFFF] p-7 rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] organic-tilt border border-[#E5E0D8]/40">
                    <h3 className="font-sans font-semibold text-[1.15rem] text-[#2D2A26] border-b-2 border-[#D96C4A] inline-block pb-1 mb-3">
                      Current Focus
                    </h3>
                    <p className="font-serif text-[#2D2A26] text-sm leading-[1.6] mb-3">
                      Right now, I'm diving deep into digital business frameworks and experimenting with presentation design. I believe the best way to learn is by building and sharing the process publicly.
                    </p>
                    <p className="font-serif text-[#2D2A26] text-sm leading-[1.6] mb-5">
                      Feel free to reach out if you want to collaborate on a project or discuss the latest trends in the tech ecosystem.
                    </p>
                    <div className="flex flex-col gap-2 font-sans">
                      <button
                        onClick={() => setCurrentTab('contact')}
                        className="px-4 py-2 bg-[#D96C4A] hover:bg-[#B85536] text-white text-xs font-semibold rounded text-center transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Penil a Message</span>
                      </button>
                      <button
                        onClick={() => setCurrentTab('projects')}
                        className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#E5E0D8] text-[#2D2A26] text-xs font-semibold rounded text-center border border-[#E5E0D8] transition-colors cursor-pointer"
                      >
                        Explore Active Projects
                      </button>
                    </div>
                  </div>

                  {/* Inline AI Studio Quick-Prompt Widget */}
                  <div className="bg-white p-5 rounded-[8px] border border-[#E5E0D8] shadow-xs font-sans space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8]">
                      <span className="text-[11px] font-mono uppercase text-[#D96C4A] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI Companion</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#595550]">Gemini 3.5</span>
                    </div>
                    <p className="text-xs font-serif text-[#595550]">
                      Ask questions about website architecture, design tokens, or spreadsheet KPIs:
                    </p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsStudioOpen(true);
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={sidebarPrompt}
                        onChange={(e) => setSidebarPrompt(e.target.value)}
                        placeholder="e.g. How to structure CAC?"
                        className="flex-1 text-xs px-3 py-1.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#2D2A26] hover:bg-[#D96C4A] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                      >
                        Ask
                      </button>
                    </form>
                  </div>

                  {/* Masterclass Study Notes Index */}
                  <div className="bg-white p-5 rounded-[8px] border border-[#E5E0D8] shadow-xs font-sans space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#D96C4A] font-semibold block">
                      Masterclass Index
                    </span>
                    <ul className="text-xs space-y-2 text-[#2D2A26]">
                      <li
                        onClick={() => setSelectedCategory('Web Design')}
                        className="flex items-center justify-between hover:text-[#D96C4A] cursor-pointer pb-1.5 border-b border-[#E5E0D8]/60"
                      >
                        <span>Web Design & Ergonomics</span>
                        <span className="font-mono text-[#595550]">5 notes</span>
                      </li>
                      <li
                        onClick={() => setSelectedCategory('Data Analytics')}
                        className="flex items-center justify-between hover:text-[#D96C4A] cursor-pointer pb-1.5 border-b border-[#E5E0D8]/60"
                      >
                        <span>Data Analytics & KPIs</span>
                        <span className="font-mono text-[#595550]">2 notes</span>
                      </li>
                      <li
                        onClick={() => setSelectedCategory('Digital Business')}
                        className="flex items-center justify-between hover:text-[#D96C4A] cursor-pointer pb-1.5 border-b border-[#E5E0D8]/60"
                      >
                        <span>Digital Business & Strategy</span>
                        <span className="font-mono text-[#595550]">2 notes</span>
                      </li>
                      <li
                        onClick={() => setSelectedCategory('Presentation Design')}
                        className="flex items-center justify-between hover:text-[#D96C4A] cursor-pointer pb-1.5 border-b border-[#E5E0D8]/60"
                      >
                        <span>Presentation Design</span>
                        <span className="font-mono text-[#595550]">1 note</span>
                      </li>
                    </ul>
                  </div>

                  {/* Monthly Curatorial Digest */}
                  <div className="bg-[#FAF8F5] p-5 rounded-[8px] border border-[#E5E0D8] font-sans space-y-2.5">
                    <span className="text-[11px] font-mono uppercase text-[#D96C4A] font-semibold block">
                      Notebook Dispatch
                    </span>
                    <p className="text-xs font-serif text-[#595550] leading-snug">
                      Monthly summaries of masterclass learnings, design formulas, and tools.
                    </p>
                    {newsletterSubscribed ? (
                      <div className="text-xs font-mono text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Subscribed to notebook notes!</span>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setNewsletterSubscribed(true);
                        }}
                        className="flex gap-2 pt-1"
                      >
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A]"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#D96C4A] hover:bg-[#B85536] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                        >
                          Join
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

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setSelectedArticle(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Multimodal AI Studio Modal */}
      <GeminiStudio
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />
    </div>
  );
}
