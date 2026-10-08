import React from 'react';
import { ArrowRight, BookOpen, Layers, BarChart2, Sparkles, Mail } from 'lucide-react';

export const AboutView: React.FC<{ onNavigateToContact: () => void }> = ({ onNavigateToContact }) => {
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

      {/* Masterclass Notes & Recent Studies */}
      <div className="space-y-6 my-10">
        <h2 className="text-2xl font-sans font-semibold text-[#2D2A26]">
          Recent Masterclass Notebook Highlights
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-[#E5E0D8] p-6 rounded-lg shadow-sm">
            <span className="text-xs font-sans uppercase font-semibold text-[#D96C4A] block mb-1">
              Website Architecture Masterclass
            </span>
            <h4 className="text-lg font-sans font-semibold text-[#2D2A26] mb-2">
              The 50ms Eye-Tracking Threshold in Responsive Layouts
            </h4>
            <p className="text-sm font-serif text-[#595550] leading-relaxed">
              Users make subconscious credibility judgments almost immediately. Leading with clear typography (Georgia 18px body, 65–75ch measure) fosters trust far faster than elaborate hero video sliders.
            </p>
          </div>

          <div className="bg-white border border-[#E5E0D8] p-6 rounded-lg shadow-sm">
            <span className="text-xs font-sans uppercase font-semibold text-[#D96C4A] block mb-1">
              Data Analytics & Executive Dashboards
            </span>
            <h4 className="text-lg font-sans font-semibold text-[#2D2A26] mb-2">
              From Dense Spreadsheets to Operational Clarity
            </h4>
            <p className="text-sm font-serif text-[#595550] leading-relaxed">
              Triaging metrics into North Star, Leading, and Trailing categories. Designing with Edward Tufte's data-ink ratio principles so variance is immediately obvious.
            </p>
          </div>

          <div className="bg-white border border-[#E5E0D8] p-6 rounded-lg shadow-sm">
            <span className="text-xs font-sans uppercase font-semibold text-[#D96C4A] block mb-1">
              Digital Business & Presentation Craft
            </span>
            <h4 className="text-lg font-sans font-semibold text-[#2D2A26] mb-2">
              The 1-2-1 Executive Deck Structure
            </h4>
            <p className="text-sm font-serif text-[#595550] leading-relaxed">
              Presentations should function as high-clarity billboards, not dense documents. Structuring slides around a single decisive narrative punch per frame.
            </p>
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
        <button
          onClick={onNavigateToContact}
          className="px-5 py-2.5 bg-[#D96C4A] hover:bg-[#B85536] text-white text-xs font-sans font-semibold rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm flex items-center gap-1.5"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </button>
      </div>
    </div>
  );
};
