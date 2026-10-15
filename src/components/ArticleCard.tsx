import React from 'react';
import { Article } from '../types';
import { Bookmark, Heart, MessageSquare, ArrowUpRight, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onClap: (id: string, e: React.MouseEvent) => void;
  hasClapped?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isSaved,
  onToggleSave,
  onClap,
  hasClapped,
}) => {
  return (
    <article
      onClick={() => onSelect(article)}
      className="group flex flex-col justify-between bg-white border border-[#E5E0D8] rounded-lg p-6 hover:border-[#2D2A26] transition-all cursor-pointer shadow-xs"
    >
      <div>
        {/* Dedicated Article Vector Image with Small File Size & Explicit Alt Text */}
        <div className="w-full h-48 rounded-md overflow-hidden mb-5 border border-[#E5E0D8]/80 bg-[#FAF8F5] relative group-hover:opacity-95 transition-opacity">
          <img
            src={article.coverImage}
            alt={article.imageAlt}
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-[#2D2A26]/80 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded">
            SVG · &lt; 3KB
          </div>
        </div>

        {/* Clean Unboxed Metadata with Typographic Separator (Zero-Pill Discipline) */}
        <div className="flex items-center gap-2 text-xs text-[#595550] mb-2.5 font-sans">
          <span className="font-semibold text-[#D96C4A]">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedAt}</span>
        </div>

        {/* Headline with Semantic Anchor Text for Crawlers */}
        <h3 className="text-xl font-serif font-medium text-[#2D2A26] group-hover:text-[#D96C4A] transition-colors leading-snug mb-2 line-clamp-2">
          <a
            href={`/articles/${article.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(article);
            }}
            className="hover:underline focus:outline-none"
            title={`Read complete article: ${article.title}`}
          >
            {article.title}
          </a>
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-[#595550] line-clamp-3 leading-relaxed mb-4 font-serif">
          {article.excerpt}
        </p>

        {/* Explicit Anchor Link with Rich Descriptive Anchor Text */}
        <div className="mb-4">
          <a
            href={`/articles/${article.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(article);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#D96C4A] hover:text-[#B85536] transition-colors"
            title={`Read the full guide: ${article.title}`}
          >
            <span>Read complete guide on {article.mainKeyword}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Author & Interactive Actions */}
      <div className="pt-4 border-t border-[#E5E0D8]/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#2D2A26] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
            {article.author.avatar}
          </div>
          <span className="text-[#2D2A26] font-medium font-sans">{article.author.name}</span>
        </div>

        <div className="flex items-center gap-3 text-[#595550]">
          {/* Claps */}
          <button
            onClick={(e) => onClap(article.id, e)}
            className={`flex items-center gap-1 hover:text-rose-600 transition-colors p-1 ${
              hasClapped ? 'text-rose-600 font-medium' : ''
            }`}
            title="Applaud article"
          >
            <Heart className={`w-3.5 h-3.5 ${hasClapped ? 'fill-rose-600' : ''}`} />
            <span className="font-mono tabular-nums">{article.claps}</span>
          </button>

          {/* Comments count */}
          <span className="flex items-center gap-1 p-1" title={`${article.commentsCount} reader notes`}>
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">{article.commentsCount}</span>
          </span>

          {/* Bookmark */}
          <button
            onClick={(e) => onToggleSave(article.id, e)}
            className={`p-1 hover:text-[#2D2A26] transition-colors ${
              isSaved ? 'text-[#D96C4A]' : 'text-stone-400'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#D96C4A]' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
};
