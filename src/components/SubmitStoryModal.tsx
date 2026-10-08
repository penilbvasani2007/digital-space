import React, { useState } from 'react';
import { X, CheckCircle2, PenLine, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface SubmitStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitArticle: (newArticle: Article) => void;
}

export const SubmitStoryModal: React.FC<SubmitStoryModalProps> = ({
  isOpen,
  onClose,
  onSubmitArticle,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Design Systems');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim()) return;

    const newArticle: Article = {
      id: 'community-' + Date.now(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: title.trim(),
      subtitle: subtitle.trim() || 'A community contribution on generative workflows.',
      excerpt: content.trim().substring(0, 140) + '...',
      author: {
        name: authorName.trim(),
        role: authorRole.trim() || 'Community Contributor',
        avatar: authorName.trim().substring(0, 2).toUpperCase(),
        bio: `${authorName.trim()} is an active member of the DesignBot community.`
      },
      publishedAt: 'Today',
      readTime: '4 min read',
      category: category,
      tags: [category, 'Community', 'Generative AI'],
      claps: 1,
      commentsCount: 0,
      coverAccent: '#1c1917',
      visualGraphic: 'discernment',
      sections: [
        {
          title: 'Introduction & Context',
          content: content.trim(),
          pullQuote: 'Community-driven experimentation is the fastest catalyst for modern design practice.'
        }
      ],
      keyTakeaways: [
        'Iterate on real production constraints rather than isolated demos.',
        'Document prompt formulas systematically for team reuse.'
      ],
      suggestedPrompt: prompt.trim() || 'Synthesize a clean responsive component matching this pattern.'
    };

    onSubmitArticle(newArticle);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#FBF9F5] rounded-xl border border-stone-300 w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500">
              Community Dispatch
            </span>
            <h2 className="text-xl font-serif font-medium text-stone-900">
              Submit an Article or Workflow
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
            <h3 className="text-xl font-serif font-medium text-stone-900">Dispatched to Editorial Desk!</h3>
            <p className="text-xs text-stone-600 max-w-sm">
              Your essay is now published to the live DesignBot feed. Thank you for elevating community knowledge.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-stone-600 block mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Liam Kowalski"
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-900"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-stone-600 block mb-1">Your Role / Title</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Design Systems Lead"
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-stone-600 block mb-1">Article Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Designing with Real-Time Latent Canvases"
                className="w-full text-xs px-3 py-2 border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-stone-600 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-900 cursor-pointer"
                >
                  <option value="Design Systems">Design Systems</option>
                  <option value="Visual Craft">Visual Craft</option>
                  <option value="Generative UI">Generative UI</option>
                  <option value="Prompt Craft">Prompt Craft</option>
                  <option value="Accessibility">Accessibility</option>
                  <option value="Motion & Animation">Motion & Animation</option>
                  <option value="UX Writing">UX Writing</option>
                  <option value="Philosophy & Ethics">Philosophy & Ethics</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-stone-600 block mb-1">Subtitle / Summary Deck</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. A hands-on guide for frontend teams"
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-stone-600 block mb-1">Essay Content *</label>
              <textarea
                required
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your practical experience, techniques, challenges, and insights with generative web design..."
                className="w-full text-xs p-3 border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-900 resize-none font-serif leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-stone-600 block mb-1">Recommended AI Prompt Formula</label>
              <textarea
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Act as a frontend engineer. Generate a CSS subgrid layout with..."
                className="w-full text-xs p-3 border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-900 font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 rounded text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Publish to Feed</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
