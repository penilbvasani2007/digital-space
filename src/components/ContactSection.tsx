import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Web Design Collaboration');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-[850px] mx-auto px-6 py-12">
      <div className="max-w-xl mb-10">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#D96C4A] block mb-2">
          Get in Touch
        </span>
        <h1 className="text-4xl font-sans font-semibold text-[#2D2A26] leading-tight mb-4">
          Let’s discuss digital business and thoughtful design.
        </h1>
        <p className="text-lg font-serif text-[#595550] leading-relaxed">
          Whether you want to collaborate on a new website architecture, discuss data dashboard strategy, or exchange notes from recent masterclasses — my inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          {submitted ? (
            <div className="bg-white border border-[#E5E0D8] rounded-lg p-8 text-center space-y-3 shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-[#D96C4A] mx-auto" />
              <h3 className="text-2xl font-sans font-semibold text-[#2D2A26]">Message Dispatched</h3>
              <p className="text-sm font-serif text-[#595550] leading-relaxed">
                Thank you for reaching out, {name}. I usually respond within 24 to 48 business hours. Looking forward to our conversation!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 text-xs font-sans font-semibold text-[#D96C4A] hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#E5E0D8] rounded-lg p-7 space-y-4 shadow-sm">
              <div>
                <label className="text-xs font-sans font-semibold text-[#2D2A26] block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="w-full text-sm px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-[#2D2A26] block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full text-sm px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-[#2D2A26] block mb-1">Topic of Discussion</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] font-sans cursor-pointer"
                >
                  <option value="Web Design Collaboration">Web Design & Architecture Collaboration</option>
                  <option value="Data Analytics Consulting">Data Analytics & Dashboard Architecture</option>
                  <option value="Digital Business Strategy">Digital Business & Micro-SaaS Strategy</option>
                  <option value="Presentation Design">Executive Presentation Design</option>
                  <option value="Other Question">General Question or Friendly Chat</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-[#2D2A26] block mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about what you're working on or what you'd like to explore together..."
                  className="w-full text-sm p-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] resize-none font-serif leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D96C4A] hover:bg-[#B85536] text-white font-sans font-semibold text-sm rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Message</span>
              </button>
            </form>
          )}
        </div>

        <div className="md:col-span-5 space-y-6">
          <div className="bg-white border border-[#E5E0D8] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-sans font-semibold text-[#2D2A26] mb-3">Direct Connect</h3>
            <p className="text-xs font-serif text-[#595550] leading-relaxed mb-4">
              I love meeting fellow builders, designers, and students exploring digital business and web architecture.
            </p>
            <div className="space-y-2 text-xs font-mono text-[#2D2A26]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D96C4A]" />
                <span>penilbvasani2007@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 pt-2 text-[#595550]">
                <span>Location: Remote / Global</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg p-6">
            <span className="text-[11px] font-sans uppercase tracking-wider text-[#D96C4A] font-semibold block mb-2">
              Note on Collaboration
            </span>
            <p className="text-xs font-serif text-[#595550] leading-relaxed">
              "Focus on the content, not the clutter. I believe the best partnerships stem from mutual curiosity and a dedication to high craft."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
