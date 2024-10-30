import React, { useState, useEffect } from 'react';
import { TopicSelector } from './components/TopicSelector';
import { ArticleCard } from './components/ArticleCard';
import { ShareModal } from './components/ShareModal';
import { Article, Topic } from './types';
import { fetchNewsArticles } from './utils/api';
import { getUser, mockUser, saveUser } from './utils/mockAuth';

function App() {
  const [user, setUser] = useState(getUser() || mockUser);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, [user.preferences.topics]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedArticles = await fetchNewsArticles(user.preferences.topics);
      setArticles(user.isPremium ? fetchedArticles : fetchedArticles.slice(0, 10));
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicToggle = (topic: Topic) => {
    const updatedTopics = user.preferences.topics.includes(topic)
      ? user.preferences.topics.filter((t) => t !== topic)
      : [...user.preferences.topics, topic];

    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        topics: updatedTopics,
      },
    };

    setUser(updatedUser);
    saveUser(updatedUser);
  };

  const handleShare = (article: Article) => {
    if (!user.isPremium && user.dailyPostsCount >= 1) {
      alert('Upgrade to premium to share more articles!');
      return;
    }
    setSelectedArticle(article);
  };

  const handlePostShare = (text: string) => {
    // Simulate posting to X
    console.log('Sharing to X:', text);
    
    const updatedUser = {
      ...user,
      dailyPostsCount: user.dailyPostsCount + 1,
    };
    setUser(updatedUser);
    saveUser(updatedUser);
    
    alert('Successfully shared to X!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">News Feed</h1>
            <button
              onClick={() => {
                const updatedUser = { ...user, isPremium: !user.isPremium };
                setUser(updatedUser);
                saveUser(updatedUser);
              }}
              className={`px-4 py-2 rounded-full ${
                user.isPremium
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {user.isPremium ? 'Premium Active' : 'Upgrade to Premium'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <TopicSelector
          selectedTopics={user.preferences.topics}
          onTopicToggle={handleTopicToggle}
        />

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onShare={handleShare}
              />
            ))}
          </div>
        )}

        {selectedArticle && (
          <ShareModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
            onShare={handlePostShare}
          />
        )}
      </main>
    </div>
  );
}

export default App;