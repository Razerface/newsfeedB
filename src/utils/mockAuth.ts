import { User } from '../types';

const STORAGE_KEY = 'news_app_user';

export const mockUser: User = {
  id: 'user1',
  name: 'Demo User',
  isPremium: false,
  dailyPostsCount: 0,
  preferences: {
    topics: ['general', 'technology']
  }
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const togglePremium = (): void => {
  const user = getUser() || mockUser;
  const updatedUser = {
    ...user,
    isPremium: !user.isPremium
  };
  saveUser(updatedUser);
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};