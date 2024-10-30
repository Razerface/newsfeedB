export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  category: string;
  source: {
    name: string;
    id: string;
  };
}

export type Topic = 'general' | 'business' | 'technology' | 'crypto' | 'sports' | 'entertainment';

export interface User {
  id: string;
  name: string;
  isPremium: boolean;
  dailyPostsCount: number;
  preferences: {
    topics: Topic[];
  };
}