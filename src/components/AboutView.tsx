import React from 'react';
import { ArrowRight, BookOpen, Layers, BarChart2, Sparkles, Mail } from 'lucide-react';

export const AboutView: React.FC<{ 
  onNavigateToContact: () => void;
  onNavigateToArticle?: (slug: string) => void;
}> = ({ onNavigateToContact, onNavigateToArticle }) => {
  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-8 py-12">
      {/* Editorial Intro */}
      <div className="max-w-[650px] mb-12">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#D96C4A] block mb-2">
          About Penil
        </span>
        <h1 className="text-4xl md:text-5xl font-sans font-semibold text-[#2D2A26] leading-tight mb-6">
          Exploring digital business, web architecture, and data analytics.
        </h1>
        <p className="text-xl font-serif text-[#595550] leading-relaxed">
          Hi there! I'm Penil. Welcome to my personal digital notebook where I bridge the gap between business strategy, thoughtful design, and data analytics.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 border-t border-b border-[#E5E0D8] py-10">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-[#D96C4A]">01 / PHILOSOPHY</span>
          <h3 className="text-xl font-sans font-semibold text-[#2D2A26]">Focus on the Content</h3>
          <p className="text-sm font-serif text-[#595550] leading-relaxed">
            The web is often over-engineered with superficial clutter. I advocate for clean typographic measure, fast loading times, and intuitive navigation.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-[#D96C4A]">02 / METHODOLOGY</span>
          <h3 className="text-xl font-sans font-semibold text-[#2D2A26]">Data Meets Aesthetics</h3>
          <p className="text-sm font-serif text-[#595550] leading-relaxed">
            Raw spreadsheet figures only create value when synthesized into actionable dashboards that help teams make informed executive choices.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-[#D96C4A]">03 / LEARNING</span>
          <h3 className="text-xl font-sans font-semibold text-[#2D2A26]">Build in the Open</h3>
          <p className="text-sm font-serif text-[#595550] leading-relaxed">
            I synthesize takeaways from masterclasses and live experiments, documenting practical frameworks for fellow learners and collaborators.
          </p>
        </div>
      </div>

      {/* Masterclass Notes & Recent Studies in Question-and-Answer AEO Format */}
      <div className="space-y-6 my-10" itemScope itemType="https://schema.org/FAQPage">
        <div>
          <h2 className="text-2xl font-sans font-semibold text-[#2D2A26] mb-2">
            What core insights and frameworks emerge from Penil's recent masterclasses?
          </h2>
          <p className="text-sm font-serif text-[#595550] leading-relaxed">
            <strong className="font-mono text-xs text-[#D96C4A] mr-1.5 font-bold">Answer:</strong>
            Across website architecture, business intelligence, and stakeholder storytelling, empirical evidence proves that disciplined typography (65–75ch measure), Edward Tufte high data-ink ratios, and 1-2-1 narrative structures dramatically outperform visual noise and decorative complexity in both user comprehension and business conversion.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#E5E0D8] p-6 rounded-lg shadow-sm" itemScope itemType="https://schema.org/Question">
            <span className="text-xs font-sans uppercase font-semibold text-[#D96C4A] block mb-1">
              Website Architecture Masterclass
            </span>
            <h3 className="text-lg font-sans font-semibold text-[#2D2A26] mb-2 flex items-start gap-2" itemProp="name">
              <span className="text-[#D96C4A] font-mono text-sm shrink-0 mt-0.5 font-bold">Q:</span>
              <span>Why does the 50-millisecond cognitive threshold dictate website architecture?</span>
            </h3>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
              <p className="text-sm font-serif text-[#595550] leading-relaxed" itemProp="text">
                <span className="font-mono text-xs text-[#2D2A26] font-bold mr-1.5">Answer:</span>
                Users make subconscious credibility judgments almost immediately upon landing. Leading with clear typography (Georgia 18px body, 65–75ch measure) and optical balance establishes visitor trust far faster than elaborate video reels or intrusive hero animations.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E5E0D8]/60">
              <a
                href="/articles/why-first-impressions-matter-in-website-architecture"
                onClick={(e) => {
                  if (onNavigateToArticle) {
                    e.preventDefault();
                    onNavigateToArticle('why-first-impressions-matter-in-website-architecture');
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#D96C4A] hover:text-[#B85536] transition-colors"
                title="Read complete masterclass guide on website architecture design principles"
              >
                <span>Read complete masterclass guide on website architecture design principles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-white border border-[#E5E0D8] p-6 rounded-lg shadow-sm" itemScope itemType="https://schema.org/Question">
            <span className="text-xs font-sans uppercase font-semibold text-[#D96C4A] block mb-1">
              Data Analytics &amp; Executive Dashboards
            </span>
            <h3 className="text-lg font-sans font-semibold text-[#2D2A26] mb-2 flex items-start gap-2" itemProp="name">
              <span className="text-[#D96C4A] font-mono text-sm shrink-0 mt-0.5 font-bold">Q:</span>
              <span>How do you transform dense spreadsheets into actionable executive dashboards?</span>
            </h3>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
              <p className="text-sm font-serif text-[#595550] leading-relaxed" itemProp="text">
                <span className="font-mono text-xs text-[#2D2A26] font-bold mr-1.5">Answer:</span>
                Triage raw tabular columns into a 3-tier hierarchy: one North Star metric, 2-3 predictive Leading Indicators, and Trailing Diagnostic Drivers. Applying Edward Tufte's data-ink ratio strips non-essential borders and gridlines so statistical variance is immediately obvious.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E5E0D8]/60">
              <a
                href="/articles/organizing-business-data-spreadsheets-to-dashboards"
                onClick={(e) => {
                  if (onNavigateToArticle) {
                    e.preventDefault();
                    onNavigateToArticle('organizing-business-data-spreadsheets-to-dashboards');
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#D96C4A] hover:text-[#B85536] transition-colors"
                title="Read complete masterclass guide on spreadsheets to dashboards"
              >
                <span>Read complete masterclass guide on spreadsheets to dashboards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-white border border-[#E5E0D8] p-6 rounded-lg shadow-sm" itemScope itemType="https://schema.org/Question">
            <span className="text-xs font-sans uppercase font-semibold text-[#D96C4A] block mb-1">
              Digital Business &amp; Presentation Craft
            </span>
            <h3 className="text-lg font-sans font-semibold text-[#2D2A26] mb-2 flex items-start gap-2" itemProp="name">
              <span className="text-[#D96C4A] font-mono text-sm shrink-0 mt-0.5 font-bold">Q:</span>
              <span>What is the 1-2-1 executive deck structure for stakeholder buy-in?</span>
            </h3>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
              <p className="text-sm font-serif text-[#595550] leading-relaxed" itemProp="text">
                <span className="font-mono text-xs text-[#2D2A26] font-bold mr-1.5">Answer:</span>
                Presentations should function as high-clarity billboards rather than dense documents. Structure pitches around 1 context slide establishing market tension, 2 evidence proof slides showing hard data, and 1 decisive action mandate to preserve boardroom momentum.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E5E0D8]/60">
              <a
                href="/articles/presentation-design-masterclass-stakeholder-narratives"
                onClick={(e) => {
                  if (onNavigateToArticle) {
                    e.preventDefault();
                    onNavigateToArticle('presentation-design-masterclass-stakeholder-narratives');
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#D96C4A] hover:text-[#B85536] transition-colors"
                title="Read complete masterclass guide on executive presentation design"
              >
                <span>Read complete masterclass guide on executive presentation design</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#FFFFFF] border border-[#E5E0D8] p-8 rounded-lg mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div>
          <h3 className="text-xl font-sans font-semibold text-[#2D2A26] mb-1">
            Want to collaborate on a digital project?
          </h3>
          <p className="text-sm font-serif text-[#595550]">
            I'm always open to discussing web design, data strategy, or business frameworks.
          </p>
        </div>
        <a
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToContact();
          }}
          className="px-5 py-2.5 bg-[#D96C4A] hover:bg-[#B85536] text-white text-xs font-sans font-semibold rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm flex items-center gap-1.5"
          title="Contact Penil Vasani for digital strategy and web architecture inquiries"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch with Penil</span>
        </a>
      </div>
    </div>
  );
};
