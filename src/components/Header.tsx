import React from 'react';
import { Bookmark, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentTab: 'articles' | 'about' | 'projects' | 'contact' | 'saved';
  onSelectTab: (tab: 'articles' | 'about' | 'projects' | 'contact' | 'saved') => void;
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
        <button
          onClick={() => onSelectTab('articles')}
          className="cursor-pointer text-left focus:outline-none"
          title="Return to Articles Notebook"
        >
          <BrandLogo size="md" />
        </button>

        {/* Nav Links */}
        <nav className="flex items-center gap-5 md:gap-7 font-sans text-[0.92rem]">
          <button
            onClick={() => onSelectTab('about')}
            className={`transition-colors cursor-pointer py-1 ${
              currentTab === 'about' ? 'text-[#D96C4A] font-semibold border-b border-[#D96C4A]' : 'text-[#595550] hover:text-[#D96C4A]'
            }`}
          >
            About
          </button>
          <button
            onClick={() => onSelectTab('articles')}
            className={`transition-colors cursor-pointer py-1 ${
              currentTab === 'articles' ? 'text-[#D96C4A] font-semibold border-b border-[#D96C4A]' : 'text-[#595550] hover:text-[#D96C4A]'
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => onSelectTab('projects')}
            className={`transition-colors cursor-pointer py-1 ${
              currentTab === 'projects' ? 'text-[#D96C4A] font-semibold border-b border-[#D96C4A]' : 'text-[#595550] hover:text-[#D96C4A]'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => onSelectTab('contact')}
            className={`transition-colors cursor-pointer py-1 ${
              currentTab === 'contact' ? 'text-[#D96C4A] font-semibold border-b border-[#D96C4A]' : 'text-[#595550] hover:text-[#D96C4A]'
            }`}
          >
            Contact
          </button>
          <button
            onClick={onOpenStudio}
            className="px-3 py-1.5 bg-[#2D2A26] hover:bg-[#D96C4A] text-white text-xs font-sans font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            title="Open AI Chatbot, Search & Audio Studio"
          >
            <Sparkles className="w-3 h-3 text-[#D96C4A]" />
            <span>AI Studio</span>
          </button>
          {savedCount > 0 && (
            <button
              onClick={() => onSelectTab('saved')}
              className={`transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono px-2 py-1 rounded border ${
                currentTab === 'saved'
                  ? 'bg-[#D96C4A] text-white border-[#D96C4A]'
                  : 'text-[#595550] border-[#E5E0D8] hover:text-[#D96C4A]'
              }`}
              title="View saved reading list"
            >
              <Bookmark className="w-3 h-3" />
              <span>{savedCount}</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
