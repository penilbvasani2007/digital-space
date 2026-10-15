import React from 'react';

interface FooterProps {
  onSelectTab: (tab: 'articles' | 'about' | 'projects' | 'contact' | 'saved' | 'seo') => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="max-w-[1140px] mx-auto mt-16 mb-8 px-6 md:px-8 pt-8 border-t border-[#E5E0D8] font-sans text-[0.88rem] text-[#595550]">
      {/* Primary Navigation Links with Descriptive Anchor Text */}
      <nav aria-label="Footer Primary Navigation" className="flex flex-wrap items-center justify-center gap-6 mb-6 text-xs font-semibold text-[#2D2A26]">
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
        <span aria-hidden="true" className="text-[#E5E0D8]">·</span>
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
        <span aria-hidden="true" className="text-[#E5E0D8]">·</span>
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
        <span aria-hidden="true" className="text-[#E5E0D8]">·</span>
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
        <span aria-hidden="true" className="text-[#E5E0D8]">·</span>
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

      {/* Featured Masterclass Articles Index with Rich Anchor Text */}
      <div className="py-5 my-4 border-t border-b border-[#E5E0D8]/60">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#D96C4A] font-semibold block text-center mb-3">
          Featured Architecture &amp; Strategy Masterclass Guides
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#2D2A26]">
          <a
            href="/articles/why-first-impressions-matter-in-website-architecture"
            className="hover:text-[#D96C4A] transition-colors underline decoration-[#E5E0D8] hover:decoration-[#D96C4A]"
            title="Read guide on Website Architecture First Impressions"
          >
            Why First Impressions Matter in Website Architecture
          </a>
          <span aria-hidden="true" className="text-[#E5E0D8] hidden sm:inline">·</span>
          <a
            href="/articles/building-an-executive-data-analytics-dashboard"
            className="hover:text-[#D96C4A] transition-colors underline decoration-[#E5E0D8] hover:decoration-[#D96C4A]"
            title="Read guide on Building an Executive Data Analytics Dashboard"
          >
            Building an Executive Data Analytics Dashboard
          </a>
          <span aria-hidden="true" className="text-[#E5E0D8] hidden sm:inline">·</span>
          <a
            href="/articles/the-vertical-micro-saas-flywheel-playbook"
            className="hover:text-[#D96C4A] transition-colors underline decoration-[#E5E0D8] hover:decoration-[#D96C4A]"
            title="Read guide on The Vertical Micro-SaaS Flywheel Playbook"
          >
            The Vertical Micro-SaaS Flywheel Playbook
          </a>
        </div>
      </div>

      <p className="font-serif text-[#595550] text-xs text-center">
        &copy; 2026 Penil's Digital Space · Written and crafted by hand with clean typography, high data-ink ratios, and 100% on-page SEO compliance.
      </p>
    </footer>
  );
};
