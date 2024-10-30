import axios from 'axios';
import { Article, Topic } from '../types';

const NEWS_API_KEY = 'pub_577897b3869a16a715badc44818f4918b1716';
const CRYPTO_API_KEY = 'b6a3c0ec35b5e1d3281c83594277f525976a7d0c';

const newsApiClient = axios.create({
  baseURL: 'https://newsdata.io/api/1',
});

const cryptoApiClient = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data/v2',
});

const topicToCategory: Record<Topic, string> = {
  general: 'top',
  business: 'business',
  technology: 'technology',
  crypto: 'crypto',
  sports: 'sports',
  entertainment: 'entertainment'
};

export const fetchNewsArticles = async (topics: Topic[]): Promise<Article[]> => {
  try {
    const articles: Article[] = [];
    
    // Fetch regular news
    const newsPromises = topics
      .filter(topic => topic !== 'crypto')
      .map(async (topic) => {
        const response = await newsApiClient.get('/news', {
          params: {
            apikey: NEWS_API_KEY,
            category: topicToCategory[topic],
            language: 'en'
          }
        });

        return response.data.results.map((article: any) => ({
          id: article.article_id || Math.random().toString(36).substr(2, 9),
          title: article.title,
          description: article.description || 'No description available',
          url: article.link,
          imageUrl: article.image_url || 'https://source.unsplash.com/random/800x600/?news',
          publishedAt: article.pubDate,
          category: topic,
          source: {
            name: article.source_id,
            id: article.source_id
          }
        }));
      });

    // Fetch crypto news if selected
    if (topics.includes('crypto')) {
      const cryptoResponse = await cryptoApiClient.get('/news/', {
        params: {
          api_key: CRYPTO_API_KEY,
          lang: 'EN'
        }
      });

      const cryptoArticles = cryptoResponse.data.Data.map((article: any) => ({
        id: article.id,
        title: article.title,
        description: article.body,
        url: article.url,
        imageUrl: article.imageurl || 'https://source.unsplash.com/random/800x600/?crypto',
        publishedAt: new Date(article.published_on * 1000).toISOString(),
        category: 'crypto',
        source: {
          name: article.source,
          id: article.source_info.name
        }
      }));

      articles.push(...cryptoArticles);
    }

    const newsArticles = await Promise.all(newsPromises);
    articles.push(...newsArticles.flat());

    // Sort by published date and remove duplicates
    return articles
      .filter((article, index, self) => 
        index === self.findIndex((a) => a.url === article.url)
      )
      .sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}