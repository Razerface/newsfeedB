import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Article } from '../types';

interface ShareModalProps {
  article: Article;
  onClose: () => void;
  onShare: (text: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ article, onClose, onShare }) => {
  const [shareText, setShareText] = useState('');
  const maxLength = 140;

  useEffect(() => {
    const hashtags = `#${article.category} #news`;
    const initialText = `${article.title} ${article.url} ${hashtags}`;
    setShareText(initialText.slice(0, maxLength));
  }, [article]);

  const handleShare = () => {
    onShare(shareText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Share to X</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <textarea
            value={shareText}
            onChange={(e) => setShareText(e.target.value.slice(0, maxLength))}
            className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What's happening?"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">
              {shareText.length}/{maxLength} characters
            </span>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};