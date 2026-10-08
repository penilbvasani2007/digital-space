import React, { useState, useEffect, useRef } from 'react';
import { Article, Comment } from '../types';
import { 
  ArrowLeft, Bookmark, Heart, Share2, Copy, Check, 
  MessageSquare, Send, Volume2, VolumeX, Type, 
  Clock, BookOpen, Compass, Sparkles 
} from 'lucide-react';
import { EditorialArtwork } from './EditorialArtwork';
import { InteractiveWidget } from './InteractiveWidget';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onClap: (id: string) => void;
  hasClapped?: boolean;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  isSaved,
  onToggleSave,
  onClap,
  hasClapped,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [codeCopiedIndex, setCodeCopiedIndex] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  
  // Audio TTS state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      author: 'Marcus Vance',
      role: 'Creative Technologist',
      avatar: 'MV',
      content: 'The observation about the 50ms cognitive threshold is so true. Users evaluate layout poise before they even begin to read a single syllable of copywriting.',
      createdAt: '2 days ago',
      likes: 12,
    },
    {
      id: 'c2',
      author: 'Elena Rostova',
      role: 'Data Architect',
      avatar: 'ER',
      content: 'High data-ink ratio is the single biggest difference between a dashboard people actually look at every morning versus an abandoned Excel dump.',
      createdAt: 'Yesterday',
      likes: 9,
    },
  ]);

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentRole, setNewCommentRole] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentLiked, setCommentLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(article.suggestedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCodeCopiedIndex(idx);
    setTimeout(() => setCodeCopiedIndex(null), 2000);
  };

  const handleToggleAudio = async () => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.play();
      setIsPlayingAudio(true);
      return;
    }

    // Synthesize audio narration via server-side TTS
    try {
      setAudioLoading(true);
      const narrationText = `${article.title}. By ${article.author.name}. ${article.excerpt} ${article.sections.map(s => s.title + '. ' + s.content).join(' ')}`.substring(0, 450);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: narrationText, voice: 'Kore' }),
      });
      const data = await res.json();
      if (data.audio) {
        const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
        audioRef.current = audio;
        audio.play();
        setIsPlayingAudio(true);
        audio.onended = () => setIsPlayingAudio(false);
      }
    } catch (err) {
      console.error('Audio playback error:', err);
    } finally {
      setAudioLoading(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: 'c-' + Date.now(),
      author: newCommentName.trim() || 'Reader & Builder',
      role: newCommentRole.trim() || 'Community Member',
      avatar: (newCommentName.trim() || 'RB').substring(0, 2).toUpperCase(),
      content: newCommentText.trim(),
      createdAt: 'Just now',
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleToggleLikeComment = (id: string) => {
    setCommentLiked((prev) => {
      const isLiked = !prev[id];
      setComments((list) =>
        list.map((c) => (c.id === id ? { ...c, likes: c.likes + (isLiked ? 1 : -1) } : c))
      );
      return { ...prev, [id]: isLiked };
    });
  };

  const scrollToSection = (idx: number) => {
    const el = document.getElementById(`section-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const proseSizeClass = 
    fontSize === 'sm' ? 'text-base leading-relaxed' :
    fontSize === 'lg' ? 'text-xl leading-loose' :
    'text-lg leading-relaxed';

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#2D2A26]">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#E5E0D8] z-50">
        <div
          className="h-full bg-[#D96C4A] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Sub-bar */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-8 pt-8 pb-4 flex items-center justify-between border-b border-[#E5E0D8]/60">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-sans font-semibold text-[#595550] hover:text-[#D96C4A] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO NOTEBOOK</span>
        </button>

        {/* User-Centric Reader Controls */}
        <div className="flex items-center gap-3">
          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E5E0D8] rounded px-2 py-1 text-xs font-sans text-[#595550]">
            <Type className="w-3 h-3 text-[#595550]" />
            <button
              onClick={() => setFontSize('sm')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'sm' ? 'bg-[#2D2A26] text-white font-bold' : 'hover:text-[#2D2A26]'}`}
              title="Compact text"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'base' ? 'bg-[#2D2A26] text-white font-bold' : 'hover:text-[#2D2A26]'}`}
              title="Standard text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'lg' ? 'bg-[#2D2A26] text-white font-bold' : 'hover:text-[#2D2A26]'}`}
              title="Large text"
            >
              A+
            </button>
          </div>

          {/* Audio TTS Narrator Button */}
          <button
            onClick={handleToggleAudio}
            disabled={audioLoading}
            className={`flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-sans font-semibold transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#D96C4A] text-white border-[#D96C4A]'
                : 'bg-white border-[#E5E0D8] text-[#2D2A26] hover:border-[#D96C4A]'
            }`}
            title="Listen to AI Audio narration"
          >
            {audioLoading ? (
              <span className="animate-spin text-xs">·</span>
            ) : isPlayingAudio ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#D96C4A]" />
            )}
            <span>{isPlayingAudio ? 'Pause Narration' : 'Listen Narration'}</span>
          </button>

          {/* Claps */}
          <button
            onClick={() => onClap(article.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-mono transition-colors cursor-pointer ${
              hasClapped
                ? 'bg-[#D96C4A]/10 border-[#D96C4A] text-[#D96C4A] font-semibold'
                : 'bg-white border-[#E5E0D8] text-[#595550] hover:border-[#D96C4A]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${hasClapped ? 'fill-[#D96C4A]' : ''}`} />
            <span>{article.claps}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleSave(article.id)}
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#2D2A26] border-[#2D2A26] text-white'
                : 'bg-white border-[#E5E0D8] text-[#595550] hover:border-[#D96C4A]'
            }`}
            title={isSaved ? 'Saved to personal reading list' : 'Save for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded border border-[#E5E0D8] bg-white text-[#595550] hover:border-[#D96C4A] transition-colors cursor-pointer"
            title="Share article URL"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="max-w-[1140px] mx-auto px-6 md:px-8 pt-8 pb-6 border-b border-[#E5E0D8]">
        <div className="max-w-[850px]">
          <span className="font-sans text-[0.85rem] uppercase tracking-[1px] text-[#D96C4A] font-semibold block mb-2">
            {article.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold text-[#2D2A26] leading-[1.15] mb-4">
            {article.title}
          </h1>

          <p className="text-xl font-serif text-[#595550] leading-relaxed mb-6">
            {article.subtitle}
          </p>

          {/* Metadata & Author Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5E0D8]/60 text-xs font-sans">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2D2A26] text-white flex items-center justify-center font-mono text-xs font-semibold">
                {article.author.avatar}
              </div>
              <div>
                <div className="font-semibold text-[#2D2A26]">{article.author.name}</div>
                <div className="text-[#595550] text-[11px]">{article.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 font-mono text-[#595550] text-[11px]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#D96C4A]" />
                {article.readTime}
              </span>
              <span>·</span>
              <span>{article.publishedAt}</span>
              <span>·</span>
              <span className="text-[#D96C4A] font-semibold">{Math.round(scrollProgress)}% read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Visual Artwork Banner */}
      <figure className="max-w-[1140px] mx-auto px-6 md:px-8 my-8">
        <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border border-[#E5E0D8] shadow-sm bg-white">
          <EditorialArtwork
            type={article.visualGraphic}
            accent={article.coverAccent}
            className="w-full h-full"
          />
        </div>
        <figcaption className="text-xs font-serif italic text-[#595550] text-center mt-2.5">
          Fig 1.0 — Visual schematic and layout specimen for {article.title}
        </figcaption>
      </figure>

      {/* Main Two-Column Reading Layout for Optimum White Space Utilization */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
        {/* Left / Center Prose Column (8 cols ~ 68ch measure) */}
        <main className="lg:col-span-8 font-serif">
          {article.sections.map((section, idx) => (
            <section key={idx} id={`section-${idx}`} className="my-8 scroll-mt-24">
              <h2 className="text-2xl font-sans font-semibold text-[#2D2A26] mb-4">
                {section.title}
              </h2>

              <p
                className={`text-[#2D2A26] ${proseSizeClass} mb-6 font-serif ${
                  idx === 0
                    ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#D96C4A]'
                    : ''
                }`}
              >
                {section.content}
              </p>

              {/* Pull Quote */}
              {section.pullQuote && (
                <figure className="my-8 py-5 px-6 border-l-2 border-[#D96C4A] bg-white rounded-r shadow-xs">
                  <blockquote className="text-xl md:text-2xl font-serif italic text-[#2D2A26] leading-snug">
                    "{section.pullQuote}"
                  </blockquote>
                </figure>
              )}

              {/* Code Snippet */}
              {section.codeSnippet && (
                <div className="my-6 rounded-lg overflow-hidden border border-[#2D2A26] bg-[#2D2A26] text-stone-100 font-mono text-xs shadow-sm">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-stone-700">
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider">
                      {section.codeSnippet.language}
                    </span>
                    <button
                      onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                      className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors text-[11px] cursor-pointer"
                    >
                      {codeCopiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto leading-relaxed text-stone-200">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                  {section.codeSnippet.caption && (
                    <div className="px-4 py-2 bg-black/50 border-t border-stone-800 text-[10px] text-stone-400 font-mono italic">
                      {section.codeSnippet.caption}
                    </div>
                  )}
                </div>
              )}
            </section>
          ))}

          {/* Embedded Interactive Lab Widget */}
          {article.interactiveWidget && (
            <InteractiveWidget config={article.interactiveWidget} />
          )}

          {/* Key Takeaways */}
          <div className="my-10 p-6 bg-white border border-[#E5E0D8] rounded-lg shadow-sm font-sans">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#D96C4A] font-semibold mb-3">
              Core Masterclass Takeaways
            </h3>
            <ul className="space-y-2.5 text-sm text-[#2D2A26]">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#D96C4A] font-mono text-xs pt-0.5">0{i + 1}.</span>
                  <span className="leading-relaxed font-serif">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Prompt Box */}
          <div className="my-8 p-6 bg-[#2D2A26] text-stone-100 rounded-lg border border-stone-800 font-mono shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#D96C4A] uppercase tracking-widest font-semibold">
                Practical Workflow Formula
              </span>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded transition-colors cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed bg-black/30 p-3.5 rounded border border-stone-700 font-sans">
              "{article.suggestedPrompt}"
            </p>
          </div>

          {/* Author Spotlight */}
          <div className="my-12 p-6 bg-white border border-[#E5E0D8] rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-5 font-sans shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#2D2A26] text-white flex items-center justify-center font-mono text-base font-semibold shrink-0">
              {article.author.avatar}
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-[#2D2A26]">{article.author.name}</h4>
              <p className="text-xs text-[#D96C4A] mb-1">{article.author.role}</p>
              <p className="text-xs text-[#595550] leading-relaxed font-serif">{article.author.bio}</p>
            </div>
          </div>

          {/* Discussion Section */}
          <section className="my-12 pt-6 font-sans">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 mb-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#D96C4A]" />
                <h3 className="text-lg font-semibold text-[#2D2A26]">
                  Notes & Discussion ({comments.length})
                </h3>
              </div>
              <span className="text-xs font-mono text-[#595550]">Open Exchange</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="bg-white p-5 rounded-lg border border-[#E5E0D8] mb-8 space-y-3 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Liam Patel)"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] font-sans"
                />
                <input
                  type="text"
                  placeholder="Your Role or Company (e.g. Product Lead)"
                  value={newCommentRole}
                  onChange={(e) => setNewCommentRole(e.target.value)}
                  className="text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] font-sans"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Leave a reflection, question, or note from your own practice..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] resize-none font-serif leading-relaxed"
                required
              />
              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] text-[#595550] font-mono">Friendly discourse</span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D96C4A] hover:bg-[#B85536] text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Note</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white p-5 rounded-lg border border-[#E5E0D8] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#FAF8F5] text-[#2D2A26] border border-[#E5E0D8] flex items-center justify-center font-mono text-xs font-semibold">
                        {comment.avatar}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#2D2A26]">{comment.author}</span>
                        <span className="text-[11px] text-[#595550] ml-2">· {comment.role}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#595550]">{comment.createdAt}</span>
                  </div>
                  <p className="text-xs text-[#2D2A26] leading-relaxed font-serif pl-9">
                    {comment.content}
                  </p>
                  <div className="pl-9 mt-3 flex items-center gap-4 text-xs text-[#595550]">
                    <button
                      onClick={() => handleToggleLikeComment(comment.id)}
                      className={`flex items-center gap-1 transition-colors cursor-pointer ${
                        commentLiked[comment.id] ? 'text-[#D96C4A] font-semibold' : 'hover:text-[#2D2A26]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${commentLiked[comment.id] ? 'fill-[#D96C4A]' : ''}`} />
                      <span className="font-mono tabular-nums">{comment.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Right Sticky Companion Rail (4 cols): Optimum White Space Utilization */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Table of Contents Box */}
            <div className="bg-white border border-[#E5E0D8] rounded-lg p-6 shadow-xs font-sans">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8] mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D96C4A] font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Article Outline</span>
                </span>
                <span className="text-xs font-mono text-[#595550]">
                  {Math.round(scrollProgress)}%
                </span>
              </div>
              <nav className="space-y-2 text-xs">
                {article.sections.map((sec, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(i)}
                    className="w-full text-left py-1 text-[#595550] hover:text-[#D96C4A] transition-colors flex items-start gap-2 cursor-pointer font-serif"
                  >
                    <span className="font-mono text-[#D96C4A] text-[11px] pt-0.5">0{i + 1}.</span>
                    <span className="line-clamp-1">{sec.title}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Audio Narration & Stats Card */}
            <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg p-5 font-sans space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#595550]">
                <span>READING PACE</span>
                <span>{article.readTime}</span>
              </div>
              <button
                onClick={handleToggleAudio}
                className="w-full py-2.5 bg-[#2D2A26] hover:bg-[#D96C4A] text-white rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? 'Pause Narration' : 'Listen with Audio TTS'}</span>
              </button>
              <p className="text-[11px] font-serif text-[#595550] leading-snug text-center">
                Hands-free audio synthesis powered by Gemini 3.8.
              </p>
            </div>

            {/* Core Takeaways Summary Badge */}
            <div className="bg-white border border-[#E5E0D8] rounded-lg p-5 font-sans space-y-2 shadow-xs">
              <span className="text-[11px] font-mono uppercase text-[#D96C4A] font-semibold block">
                Quick Takeaway Snapshot
              </span>
              <p className="text-xs font-serif text-[#595550] leading-relaxed">
                "{article.keyTakeaways[0]}"
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
