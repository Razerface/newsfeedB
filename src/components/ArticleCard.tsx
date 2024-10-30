import React from 'react';
import { Share2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onShare: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onShare }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://source.unsplash.com/random/800x600/?news';
          }}
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">
            {article.source.name}
          </span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
        <div className="flex items-center justify-between">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More
          </a>
          <button
            onClick={() => onShare(article)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};