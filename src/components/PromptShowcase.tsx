import React, { useState } from 'react';
import { PromptWorkflow } from '../types';
import { Copy, Check, Heart, Terminal, Filter, Sparkles } from 'lucide-react';

interface PromptShowcaseProps {
  prompts: PromptWorkflow[];
  onOpenSubmit: () => void;
}

export const PromptShowcase: React.FC<PromptShowcaseProps> = ({ prompts, onOpenSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedPrompts, setLikedPrompts] = useState<Record<string, boolean>>({});
  const [promptList, setPromptList] = useState<PromptWorkflow[]>(prompts);

  const categories = ['All', 'Layout Architecture', 'Design Systems', 'Motion & Physics', 'Prompt Craft', 'Visual Craft'];

  const filteredPrompts = selectedCategory === 'All'
    ? promptList
    : promptList.filter((p) => p.category === selectedCategory);

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    // increment copies count
    setPromptList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, copiesCount: p.copiesCount + 1 } : p))
    );
  };

  const handleToggleLike = (id: string) => {
    setLikedPrompts((prev) => {
      const isLiked = !prev[id];
      setPromptList((list) =>
        list.map((p) => (p.id === id ? { ...p, likes: p.likes + (isLiked ? 1 : -1) } : p))
      );
      return { ...prev, [id]: isLiked };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-stone-500 block mb-2">
          Community Workflows & Prompt Formulas
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 leading-tight mb-4">
          Production AI Prompts for Website Design
        </h1>
        <p className="text-base font-serif text-stone-600 leading-relaxed">
          Curated, zero-slop prompts and workflow instructions tested in real design systems. Copy directly into your LLM or system configuration.
        </p>
      </div>

      {/* Interactive Category Segmented Control (Allowed functional button tabs) */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-stone-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Prompt Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrompts.map((pw) => (
          <div
            key={pw.id}
            className="bg-white border border-stone-200 rounded-lg p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-2">
                <span>{pw.category}</span>
                <span className="text-stone-400">Model: {pw.model}</span>
              </div>

              <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">
                {pw.title}
              </h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed font-sans">
                {pw.description}
              </p>

              {/* Prompt Text Container */}
              <div className="bg-stone-900 text-stone-200 p-4 rounded-md font-mono text-xs leading-relaxed border border-stone-800 relative mb-4">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800 text-[10px] text-stone-400 uppercase">
                  <span>SYSTEM PROMPT SPECIFICATION</span>
                  <span>{pw.copiesCount} uses</span>
                </div>
                <div className="max-h-40 overflow-y-auto pr-2 text-stone-300 whitespace-pre-wrap">
                  {pw.promptText}
                </div>
              </div>

              {/* Output Preview */}
              <div className="bg-stone-50 border border-stone-200 p-3 rounded text-[11px] font-mono text-stone-700 mb-4">
                <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Expected Synthesized Output:</div>
                <pre className="overflow-x-auto text-stone-800">{pw.outputPreview}</pre>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-mono text-[9px] font-semibold">
                  {pw.avatar}
                </div>
                <span className="text-xs text-stone-600">{pw.author}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleLike(pw.id)}
                  className={`flex items-center gap-1 text-xs font-mono transition-colors p-1 ${
                    likedPrompts[pw.id] ? 'text-rose-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedPrompts[pw.id] ? 'fill-rose-600' : ''}`} />
                  <span className="tabular-nums">{pw.likes}</span>
                </button>

                <button
                  onClick={() => handleCopyPrompt(pw.id, pw.promptText)}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === pw.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Formula</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
