import React, { useState } from 'react';
import { Bookmark, Sparkles, Table2, Search, Menu, X, ArrowRight, FileText, Gamepad2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentTab: 'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo';
  onSelectTab: (tab: 'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo') => void;
  savedCount: number;
  onOpenStudio: () => void;
  onOpenGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  onOpenStudio,
  onOpenGame,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo') => {
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5E0D8]/80 transition-all">
      <div className="max-w-[1200px] mx-auto py-2.5 sm:py-3 px-3.5 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Brand Zone */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('articles');
          }}
          className="cursor-pointer text-left focus:outline-none shrink-0"
          title="Return to Penil's Digital Space homepage and notebook articles"
          aria-label="Penil's Digital Space - Return to Homepage"
        >
          <BrandLogo size="md" />
        </a>

        {/* Desktop Nav Links (Hidden on small screens to prevent crowded wrapping) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-4 lg:gap-6 font-sans text-[0.9rem]">
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
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
              handleNavClick('articles');
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
              handleNavClick('projects');
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
              handleNavClick('contact');
            }}
            className={`transition-colors py-1 ${
              currentTab === 'contact' ? 'text-[#D96C4A] font-semibold border-b border-[#D96C4A]' : 'text-[#595550] hover:text-[#D96C4A]'
            }`}
            title="Send an inquiry or collaboration message to Penil Vasani"
          >
            Contact
          </a>

          {/* STEP 2 & 3: SEO Keyword Research Table Link with Clear Anchor Text */}
          <a
            href="/seo-research"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('seo');
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

          {/* 3D Game Trigger */}
          <button
            onClick={onOpenGame}
            className="px-2.5 sm:px-3 py-1.5 bg-[#D96C4A]/10 hover:bg-[#D96C4A] text-[#D96C4A] hover:text-white border border-[#D96C4A]/30 hover:border-[#D96C4A] text-xs font-sans font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            title="Launch 3D Data Runner Game"
            aria-label="Launch 3D Data Runner Game"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>3D Game</span>
          </button>

          {/* AI Studio Trigger */}
          <button
            onClick={onOpenStudio}
            className="px-3 py-1.5 bg-[#2D2A26] hover:bg-[#D96C4A] text-white text-xs font-sans font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            title="Open AI Chatbot, Search & Audio Studio"
            aria-label="Open AI Chatbot, Search and Audio Studio"
          >
            <Sparkles className="w-3 h-3 text-[#D96C4A]" />
            <span>AI Studio</span>
          </button>

          {/* Saved Articles Link */}
          {savedCount > 0 && (
            <a
              href="/saved"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('saved');
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

        {/* Mobile Action Controls & Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick 3D Game Button on Mobile */}
          <button
            onClick={onOpenGame}
            className="p-1.5 bg-[#D96C4A] text-white rounded text-xs flex items-center gap-1 shadow-xs cursor-pointer"
            title="Play 3D Game"
            aria-label="Play 3D Game"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-sans font-semibold pr-0.5">Game</span>
          </button>

          {/* Quick AI Studio Button on Mobile */}
          <button
            onClick={onOpenStudio}
            className="p-1.5 bg-[#2D2A26] text-white rounded text-xs flex items-center gap-1 shadow-xs cursor-pointer"
            title="Open AI Studio"
            aria-label="Open AI Studio"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D96C4A]" />
            <span className="text-[11px] font-sans font-semibold pr-0.5">AI</span>
          </button>

          {/* Quick Saved Indicator on Mobile */}
          {savedCount > 0 && (
            <button
              onClick={() => handleNavClick('saved')}
              className={`p-1.5 rounded border text-xs cursor-pointer flex items-center gap-1 ${
                currentTab === 'saved'
                  ? 'bg-[#D96C4A] text-white border-[#D96C4A]'
                  : 'bg-white text-[#595550] border-[#E5E0D8]'
              }`}
              title="Saved Articles"
              aria-label="Saved Articles"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono font-semibold">{savedCount}</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-md border border-[#E5E0D8] bg-white text-[#2D2A26] hover:bg-[#FAF8F5] transition-colors cursor-pointer focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#D96C4A]" /> : <Menu className="w-5 h-5 text-[#2D2A26]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Balanced Whitespace & Generous Touch Targets */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E0D8] bg-[#FAF8F5] px-4 py-3 shadow-lg font-sans animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col divide-y divide-[#E5E0D8]/60 text-sm">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('articles');
              }}
              className={`py-3 flex items-center justify-between transition-colors ${
                currentTab === 'articles' ? 'text-[#D96C4A] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              <span>Notebook Articles</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </a>

            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className={`py-3 flex items-center justify-between transition-colors ${
                currentTab === 'about' ? 'text-[#D96C4A] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              <span>About Penil</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </a>

            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('projects');
              }}
              className={`py-3 flex items-center justify-between transition-colors ${
                currentTab === 'projects' ? 'text-[#D96C4A] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              <span>Projects &amp; Prototypes</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </a>

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className={`py-3 flex items-center justify-between transition-colors ${
                currentTab === 'contact' ? 'text-[#D96C4A] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              <span>Contact &amp; Inquiries</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </a>

            <a
              href="/seo-research"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('seo');
              }}
              className={`py-3 flex items-center justify-between transition-colors ${
                currentTab === 'seo' ? 'text-[#D96C4A] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-[#D96C4A]" />
                <span className="font-semibold text-[#D96C4A]">SEO Keyword Research Table</span>
              </div>
              <span className="text-[10px] font-mono bg-[#D96C4A]/10 text-[#D96C4A] px-1.5 py-0.5 rounded font-semibold">
                Steps 1–3
              </span>
            </a>

            {savedCount > 0 && (
              <a
                href="/saved"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('saved');
                }}
                className={`py-3 flex items-center justify-between transition-colors ${
                  currentTab === 'saved' ? 'text-[#D96C4A] font-semibold' : 'text-[#2D2A26]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#D96C4A]" />
                  <span>Saved Reading Archive</span>
                </div>
                <span className="text-xs font-mono font-semibold text-[#595550]">({savedCount})</span>
              </a>
            )}

            <div className="pt-3 pb-1 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenGame();
                }}
                className="w-full py-2.5 px-3 bg-[#D96C4A] hover:bg-[#B85536] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Play Data Runner 3D Game</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenStudio();
                }}
                className="w-full py-2.5 px-3 bg-[#2D2A26] hover:bg-[#D96C4A] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D96C4A]" />
                <span>Launch AI Studio (Chatbot · Search · Voice)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
