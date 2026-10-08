import React from 'react';
import { Article } from '../types';
import { Bookmark, Heart, MessageSquare, ArrowUpRight } from 'lucide-react';
import { EditorialArtwork } from './EditorialArtwork';

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
      className="group flex flex-col justify-between bg-white border border-stone-200/80 rounded-lg p-6 hover:border-stone-400/80 transition-all cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
    >
      <div>
        {/* Visual Artwork Thumbnail */}
        <div className="w-full h-44 rounded-md overflow-hidden mb-5 border border-stone-200/60 bg-stone-100 relative group-hover:opacity-95 transition-opacity">
          <EditorialArtwork
            type={article.visualGraphic}
            accent={article.coverAccent}
            className="w-full h-full"
          />
        </div>

        {/* Clean Unboxed Metadata with Typographic Separator (NO PILLS) */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2.5 font-sans">
          <span className="font-medium text-stone-700">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedAt}</span>
        </div>

        {/* Headline */}
        <h3 className="text-xl font-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
          {article.excerpt}
        </p>
      </div>

      {/* Author & Interactive Actions */}
      <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center font-mono text-[10px] font-semibold text-stone-700">
            {article.author.avatar}
          </div>
          <span className="text-stone-700 font-medium">{article.author.name}</span>
        </div>

        <div className="flex items-center gap-3 text-stone-500">
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
          <span className="flex items-center gap-1 p-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">{article.commentsCount}</span>
          </span>

          {/* Bookmark */}
          <button
            onClick={(e) => onToggleSave(article.id, e)}
            className={`p-1 hover:text-stone-900 transition-colors ${
              isSaved ? 'text-stone-900' : 'text-stone-400'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-stone-900' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
};
