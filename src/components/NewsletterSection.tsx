import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="border-t border-b border-stone-300 bg-stone-100 py-16 my-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-stone-500 block mb-2">
          Weekly Curatorial Dispatch
        </span>
        <h2 className="text-3xl font-serif font-medium text-stone-900 mb-3 text-balance">
          The DesignBot Dispatches
        </h2>
        <p className="text-stone-600 font-serif text-base max-w-xl mx-auto mb-6 leading-relaxed">
          One weekly essay on generative UI patterns, verified prompt templates, and architectural restraint. No spam, ever.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-4 py-2.5 rounded border border-emerald-200 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>You are subscribed. The next dispatch arrives this Thursday.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="curator@designstudio.com"
              className="w-full sm:w-auto flex-1 px-4 py-2.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900 font-mono shadow-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium transition-colors cursor-pointer shadow-sm whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-4 text-xs font-mono text-stone-400 mt-6">
          <span>Read by 14,200+ Design Technologists</span>
          <span aria-hidden="true">·</span>
          <span>Zero Marketing Slop</span>
        </div>
      </div>
    </section>
  );
};
