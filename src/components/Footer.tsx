import React from 'react';

interface FooterProps {
  onSelectTab: (tab: 'articles' | 'about' | 'projects' | 'contact' | 'saved') => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onSelectCategory }) => {
  return (
    <footer className="max-w-[1140px] mx-auto mt-16 mb-8 px-6 md:px-8 pt-6 border-t border-[#E5E0D8] text-center font-sans text-[0.88rem] text-[#595550]">
      <div className="flex flex-wrap items-center justify-center gap-6 mb-3 text-xs font-semibold text-[#2D2A26]">
        <button onClick={() => onSelectTab('about')} className="hover:text-[#D96C4A] transition-colors cursor-pointer">
          About Penil
        </button>
        <span>·</span>
        <button onClick={() => onSelectTab('articles')} className="hover:text-[#D96C4A] transition-colors cursor-pointer">
          Notebook Articles
        </button>
        <span>·</span>
        <button onClick={() => onSelectTab('projects')} className="hover:text-[#D96C4A] transition-colors cursor-pointer">
          Projects & Prototypes
        </button>
        <span>·</span>
        <button onClick={() => onSelectTab('contact')} className="hover:text-[#D96C4A] transition-colors cursor-pointer">
          Contact & Inquiries
        </button>
      </div>
      <p className="font-serif text-[#595550] text-xs">
        &copy; 2026 Penil's Digital Space · Designed and written by hand. Focus on the content, not the clutter.
      </p>
    </footer>
  );
};
