import React from 'react';
import { Bookmark, Sparkles, Table2, Search } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentTab: 'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo';
  onSelectTab: (tab: 'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo') => void;
  savedCount: number;
  onOpenStudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  onOpenStudio,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5E0D8]/80 transition-all">
      <div className="max-w-[1200px] mx-auto py-3 px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Brand Zone with Geometric Architectural Logo Mark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('articles');
          }}
          className="cursor-pointer text-left focus:outline-none"
          title="Return to Penil's Digital Space homepage and notebook articles"
          aria-label="Penil's Digital Space - Return to Homepage"
        >
          <BrandLogo size="md" />
        </a>

        {/* Nav Links with Descriptive Anchor Text */}
        <nav aria-label="Main Navigation" className="flex items-center gap-3 sm:gap-6 md:gap-7 font-sans text-[0.92rem]">
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('about');
            }}
            className={`transition-colors py-1 ${
              currentTab === 'about' ? 'text-[#D96C4A] font-semibold border-b border-[#D96C4A]' : 'text-[#595550] hover:text-[#D96C4A]'
            }`}
            title="Read about Penil Vasani, digital strategist and design technologist"
          >
            About
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('articles');
            }}
            className={`transition-colors py-1 ${
              currentTab === 'articles' ? 'text-[#D96C4A] font-semibold border-b border-[#D96C4A]' : 'text-[#595550] hover:text-[#D96C4A]'
            }`}
            title="Browse all notebook articles on web design, data analytics, and digital business"
          >
            Articles
          </a>
          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('projects');
            }}
            className={`transition-colors py-1 ${
              currentTab === 'projects' ? 'text-[#D96C4A] font-semibold border-b border-[#D96C4A]' : 'text-[#595550] hover:text-[#D96C4A]'
            }`}
            title="Explore interactive design prototypes and digital business projects"
          >
            Projects
          </a>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('contact');
            }}
            className={`transition-colors py-1 ${
              currentTab === 'contact' ? 'text-[#D96C4A] font-semibold border-b border-[#D96C4A]' : 'text-[#595550] hover:text-[#D96C4A]'
            }`}
            title="Send an inquiry or collaboration message to Penil Vasani"
          >
            Contact
          </a>

          {/* STEP 2 & 3: SEO Keyword Research Table Link with Clear Anchor Text on All Devices */}
          <a
            href="/seo-research"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('seo');
            }}
            className={`transition-colors flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded border ${
              currentTab === 'seo'
                ? 'bg-[#D96C4A] text-white border-[#D96C4A] font-semibold'
                : 'text-[#D96C4A] border-[#D96C4A]/40 bg-[#D96C4A]/5 hover:bg-[#D96C4A]/10'
            }`}
            title="Inspect Keyword Research Table for Homepage and 3 Articles and On-Page SEO Checklist"
            aria-label="Inspect SEO Keyword Research Table and Checklist"
          >
            <Table2 className="w-3.5 h-3.5" />
            <span className="font-semibold">SEO Research</span>
          </a>

          {/* AI Studio Trigger */}
          <button
            onClick={onOpenStudio}
            className="px-3 py-1.5 bg-[#2D2A26] hover:bg-[#D96C4A] text-white text-xs font-sans font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            title="Open AI Chatbot, Search & Audio Studio"
            aria-label="Open AI Chatbot, Search and Audio Studio"
          >
            <Sparkles className="w-3 h-3 text-[#D96C4A]" />
            <span className="hidden xs:inline">AI Studio</span>
          </button>

          {/* Saved Articles Link with Explicit Accessible Anchor Text */}
          {savedCount > 0 && (
            <a
              href="/saved"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('saved');
              }}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded border ${
                currentTab === 'saved'
                  ? 'bg-[#D96C4A] text-white border-[#D96C4A]'
                  : 'text-[#595550] border-[#E5E0D8] hover:text-[#D96C4A]'
              }`}
              title="View your saved reading list"
              aria-label={`View your ${savedCount} saved notebook articles`}
            >
              <Bookmark className="w-3 h-3" />
              <span>Saved ({savedCount})</span>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};
