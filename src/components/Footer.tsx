import React from 'react';

interface FooterProps {
  onSelectTab: (tab: 'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo') => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onSelectCategory }) => {
  return (
    <footer className="max-w-[1140px] mx-auto mt-16 mb-8 px-6 md:px-8 pt-6 border-t border-[#E5E0D8] text-center font-sans text-[0.88rem] text-[#595550]">
      <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6 mb-3 text-xs font-semibold text-[#2D2A26]">
        <a
          href="/about"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('about');
          }}
          className="hover:text-[#D96C4A] transition-colors"
          title="Learn about Penil Vasani, digital strategist and technologist"
        >
          About Penil
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('articles');
          }}
          className="hover:text-[#D96C4A] transition-colors"
          title="Browse notebook articles on digital business, web architecture, and data analytics"
        >
          Notebook Articles
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="/projects"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('projects');
          }}
          className="hover:text-[#D96C4A] transition-colors"
          title="View interactive prototypes and digital business projects"
        >
          Projects &amp; Prototypes
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('contact');
          }}
          className="hover:text-[#D96C4A] transition-colors"
          title="Contact Penil Vasani for digital strategy inquiries"
        >
          Contact &amp; Inquiries
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="/seo-research"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('seo');
          }}
          className="text-[#D96C4A] hover:underline transition-colors font-mono"
          title="Inspect Keyword Research Table for Homepage and 3 Articles"
        >
          SEO Keyword Research Table
        </a>
      </nav>
      <p className="font-serif text-[#595550] text-xs">
        &copy; 2026 Penil's Digital Space · Written and crafted by hand with clean typography, high data-ink ratios, and 100% on-page SEO compliance.
      </p>
    </footer>
  );
};
