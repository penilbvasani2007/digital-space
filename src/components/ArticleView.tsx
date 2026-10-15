import React, { useState, useEffect, useRef } from 'react';
import { Article, Comment } from '../types';
import { 
  ArrowLeft, Bookmark, Heart, Share2, Copy, Check, 
  MessageSquare, Send, Volume2, VolumeX, Type, 
  Clock, BookOpen, Compass, Sparkles, HelpCircle, 
  Globe, ShieldCheck, ArrowRight, Tag
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

  // STEP 3 ON-PAGE SEO: Dynamically manage Title, Meta Description, OpenGraph, Canonical, and Schema.org JSON-LD
  useEffect(() => {
    // 1. Title Tag
    const originalTitle = document.title;
    document.title = article.seoTitle || `${article.title} | Penil's Digital Space`;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    const originalDesc = metaDesc.getAttribute('content') || '';
    metaDesc.setAttribute('content', article.seoDescription || article.excerpt);

    // 3. OpenGraph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', article.seoTitle || article.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', article.seoDescription || article.excerpt);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', `${window.location.origin}/articles/${article.slug}`);

    // 4. Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/articles/${article.slug}`);

    // 5. Schema.org JSON-LD (Article + FAQPage for AEO)
    const jsonLdId = 'schema-article-faq';
    let scriptTag = document.getElementById(jsonLdId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          'headline': article.title,
          'description': article.seoDescription || article.excerpt,
          'author': {
            '@type': 'Person',
            'name': article.author.name,
            'jobTitle': article.author.role,
          },
          'datePublished': '2026-10-06T08:00:00+00:00',
          'publisher': {
            '@type': 'Organization',
            'name': "Penil's Digital Space",
            'url': window.location.origin,
          },
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `${window.location.origin}/articles/${article.slug}`,
          },
          'keywords': [article.mainKeyword, ...article.relatedKeywords].join(', '),
        },
        ...(article.faqList && article.faqList.length > 0
          ? [
              {
                '@type': 'FAQPage',
                'mainEntity': article.faqList.map((faq) => ({
                  '@type': 'Question',
                  'name': faq.question,
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': faq.answer,
                  },
                })),
              },
            ]
          : []),
      ],
    };
    scriptTag.textContent = JSON.stringify(schemaData);

    // Scroll progress handler
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDesc);
      window.removeEventListener('scroll', handleScroll);
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [article]);

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

      {/* Top Floating Action Bar with Semantic Back Anchor */}
      <div className="sticky top-[57px] z-20 bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-[#E5E0D8]/60 py-2.5 px-6 md:px-8 max-w-[1140px] mx-auto flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-xs font-sans text-[#595550] hover:text-[#2D2A26] transition-colors cursor-pointer group"
          title="Return to Digital Business and Design Notes articles index"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-medium">Return to Notebook Articles Index</span>
        </a>

        {/* Reading Controls */}
        <div className="flex items-center gap-3">
          {/* Typography scale */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E5E0D8] rounded px-1.5 py-0.5 text-xs font-mono text-[#595550]">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'sm' ? 'bg-[#2D2A26] text-white font-bold' : 'hover:text-[#2D2A26]'}`}
              title="Compact text size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'base' ? 'bg-[#2D2A26] text-white font-bold' : 'hover:text-[#2D2A26]'}`}
              title="Standard text size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'lg' ? 'bg-[#2D2A26] text-white font-bold' : 'hover:text-[#2D2A26]'}`}
              title="Large text size"
            >
              A+
            </button>
          </div>

          {/* Audio TTS Narrator */}
          <button
            onClick={handleToggleAudio}
            disabled={audioLoading}
            className={`flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-sans font-semibold transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#D96C4A] text-white border-[#D96C4A]'
                : 'bg-white border-[#E5E0D8] text-[#2D2A26] hover:border-[#D96C4A]'
            }`}
            title="Listen to AI voice narration"
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
            title={isSaved ? 'Saved to personal reading archive' : 'Save for later'}
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

      {/* On-Page SEO Verified Metadata Ribbon */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-8 pt-4">
        <div className="p-3 bg-white border border-[#E5E0D8] rounded-md flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-[#D96C4A]">
              <Tag className="w-3 h-3" />
              <span>MAIN KEYWORD:</span>
            </span>
            <span className="bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E5E0D8] text-[#2D2A26] font-semibold">
              {article.mainKeyword}
            </span>
            <span className="text-[#E5E0D8]">|</span>
            <span className="text-[#595550]">RELATED:</span>
            <span className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E5E0D8] text-[#595550]">
              {article.relatedKeywords[0]}
            </span>
            <span className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E5E0D8] text-[#595550]">
              {article.relatedKeywords[1]}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#595550]">
            <Globe className="w-3 h-3 text-emerald-700" />
            <span>URL: /articles/{article.slug}</span>
          </div>
        </div>
      </div>

      {/* Article Header (H1) */}
      <header className="max-w-[1140px] mx-auto px-6 md:px-8 pt-6 pb-6 border-b border-[#E5E0D8]">
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

          {/* Direct Answer Summary Box for AEO (Answer Engine Optimization) */}
          {article.directAnswerSummary && (
            <div className="my-5 p-4 bg-amber-50/80 border-l-3 border-[#D96C4A] rounded-r-md">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D96C4A] mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXECUTIVE DIRECT ANSWER SUMMARY (AEO &amp; AI OVERVIEWS)</span>
              </div>
              <p className="text-sm font-serif text-[#2D2A26] leading-relaxed">
                {article.directAnswerSummary}
              </p>
            </div>
          )}

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

      {/* Dedicated Small-Size Vector Artwork & Specimen Image with Descriptive Alt Text */}
      <figure className="max-w-[1140px] mx-auto px-6 md:px-8 my-8">
        <div className="w-full h-72 sm:h-88 md:h-[420px] rounded-lg overflow-hidden border border-[#E5E0D8] shadow-sm bg-white relative">
          <img
            src={article.coverImage}
            alt={article.imageAlt}
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-[#2D2A26]/85 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded border border-white/20">
            Vector SVG Asset · &lt; 3KB · Zero CLS
          </div>
        </div>
        <figcaption className="text-xs font-serif italic text-[#595550] text-center mt-2.5">
          {article.imageAlt}
        </figcaption>
      </figure>

      {/* Main Two-Column Reading Layout */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
        {/* Left / Center Prose Column (8 cols ~ 68ch measure) */}
        <main className="lg:col-span-8 font-serif">
          {article.sections.map((section, idx) => (
            <section key={idx} id={`section-${idx}`} className="my-8 scroll-mt-24">
              {/* Question Subheading (H2) for AEO */}
              <h2 className="text-2xl font-sans font-semibold text-[#2D2A26] mb-3 flex items-start gap-2">
                <span className="text-[#D96C4A] font-mono text-lg shrink-0 mt-0.5">Q:</span>
                <span>{section.title}</span>
              </h2>

              {/* Direct Answer Paragraph & Prose Content */}
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
                    <div className="px-4 py-2 bg-stone-900 border-t border-stone-800 text-[11px] text-stone-400 font-sans italic">
                      {section.codeSnippet.caption}
                    </div>
                  )}
                </div>
              )}
            </section>
          ))}

          {/* Interactive Widget if present */}
          {article.interactiveWidget && (
            <div className="my-10">
              <InteractiveWidget config={article.interactiveWidget} />
            </div>
          )}

          {/* Schema.org FAQPage Accordion for AEO Direct Answers */}
          {article.faqList && article.faqList.length > 0 && (
            <section className="my-12 p-6 bg-white border border-[#E5E0D8] rounded-lg">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E5E0D8]">
                <HelpCircle className="w-4 h-4 text-[#D96C4A]" />
                <h3 className="font-sans font-semibold text-lg text-[#2D2A26]">
                  Frequently Asked Questions (Schema.org FAQPage)
                </h3>
              </div>
              <div className="space-y-4 font-sans text-xs">
                {article.faqList.map((faq, i) => (
                  <div key={i} className="p-3.5 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                    <div className="font-semibold text-sm text-[#2D2A26] mb-1.5">
                      {faq.question}
                    </div>
                    <div className="font-serif text-sm text-[#595550] leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Takeaways */}
          <div className="my-10 p-6 bg-white border border-[#E5E0D8] rounded-lg shadow-xs">
            <h3 className="font-sans font-semibold text-base text-[#2D2A26] mb-3 uppercase tracking-wider text-xs">
              Key Strategic Takeaways
            </h3>
            <ul className="space-y-2.5 font-serif text-base text-[#2D2A26]">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#D96C4A] font-bold mt-1 text-sm">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Prompt Block */}
          {article.suggestedPrompt && (
            <div className="my-10 p-5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D96C4A] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Suggested AI Workflow Prompt
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 text-xs font-mono text-[#595550] hover:text-[#2D2A26] transition-colors cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-xs text-[#2D2A26] bg-white p-3 rounded border border-[#E5E0D8] leading-relaxed">
                {article.suggestedPrompt}
              </p>
            </div>
          )}

          {/* Reader Discussion / Comments */}
          <div className="mt-12 pt-8 border-t border-[#E5E0D8]">
            <h3 className="font-sans font-semibold text-xl text-[#2D2A26] mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D96C4A]" />
              <span>Reader Notes &amp; Observations ({comments.length})</span>
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="bg-white border border-[#E5E0D8] rounded-lg p-5 mb-8 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Maya Chen)"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="px-3 py-2 border border-[#E5E0D8] rounded text-xs font-sans focus:outline-none focus:border-[#D96C4A] bg-[#FAF8F5]"
                />
                <input
                  type="text"
                  placeholder="Your Role (e.g. Design Technologist)"
                  value={newCommentRole}
                  onChange={(e) => setNewCommentRole(e.target.value)}
                  className="px-3 py-2 border border-[#E5E0D8] rounded text-xs font-sans focus:outline-none focus:border-[#D96C4A] bg-[#FAF8F5]"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Share a perspective on typography, unit economics, or executive metrics..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5E0D8] rounded text-xs font-serif focus:outline-none focus:border-[#D96C4A] bg-[#FAF8F5] mb-3 leading-relaxed"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2D2A26] hover:bg-[#D96C4A] text-white rounded text-xs font-sans font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Reader Note</span>
              </button>
            </form>

            {/* Existing Comments */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-white border border-[#E5E0D8] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-[#2D2A26] flex items-center justify-center font-mono text-[10px] font-semibold">
                        {comment.avatar}
                      </div>
                      <span className="font-sans font-semibold text-xs text-[#2D2A26]">{comment.author}</span>
                      <span className="text-[#E5E0D8]">·</span>
                      <span className="text-[11px] text-[#595550]">{comment.role}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#595550]">{comment.createdAt}</span>
                  </div>
                  <p className="font-serif text-sm text-[#2D2A26] leading-relaxed">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#E5E0D8]/60 text-xs text-[#595550]">
                    <button
                      onClick={() => handleToggleLikeComment(comment.id)}
                      className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${commentLiked[comment.id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                      <span className="font-mono text-[11px]">{comment.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar Rail (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Table of Contents */}
          <div className="p-5 bg-white border border-[#E5E0D8] rounded-lg shadow-xs sticky top-28">
            <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-[#595550] mb-3 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#D96C4A]" />
              <span>Section Questions (AEO Index)</span>
            </h4>
            <nav className="space-y-2">
              {article.sections.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(idx)}
                  className="w-full text-left font-serif text-xs text-[#595550] hover:text-[#D96C4A] transition-colors line-clamp-2 block py-1 border-b border-[#E5E0D8]/40 cursor-pointer"
                >
                  <span className="font-mono text-[10px] text-[#D96C4A] mr-1.5 font-semibold">Q{idx + 1}.</span>
                  {section.title}
                </button>
              ))}
            </nav>

            {/* Author Card */}
            <div className="mt-6 pt-5 border-t border-[#E5E0D8]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#2D2A26] text-white flex items-center justify-center font-mono text-xs font-semibold">
                  {article.author.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#2D2A26]">{article.author.name}</div>
                  <div className="text-[11px] text-[#595550]">{article.author.role}</div>
                </div>
              </div>
              <p className="font-serif text-xs text-[#595550] leading-relaxed">
                {article.author.bio}
              </p>
            </div>

            {/* Related Topics Anchor Links */}
            <div className="mt-6 pt-5 border-t border-[#E5E0D8]">
              <div className="text-xs font-mono font-semibold text-[#2D2A26] mb-2">
                Target SEO Keywords
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] font-mono bg-white border border-[#D96C4A] text-[#D96C4A] px-2 py-0.5 rounded font-semibold">
                  {article.mainKeyword}
                </span>
                {article.relatedKeywords.map((kw, i) => (
                  <span key={i} className="text-[11px] font-mono bg-[#FAF8F5] border border-[#E5E0D8] text-[#595550] px-2 py-0.5 rounded">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
