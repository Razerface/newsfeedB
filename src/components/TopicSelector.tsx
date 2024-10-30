import React from 'react';
import { Topic } from '../types';
import { 
  Newspaper, 
  Briefcase, 
  Cpu, 
  Bitcoin, 
  Trophy, 
  Film
} from 'lucide-react';

interface TopicSelectorProps {
  selectedTopics: Topic[];
  onTopicToggle: (topic: Topic) => void;
}

const topics: { id: Topic; label: string; icon: React.ReactNode }[] = [
  { id: 'general', label: 'General', icon: <Newspaper className="w-5 h-5" /> },
  { id: 'business', label: 'Business', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'technology', label: 'Technology', icon: <Cpu className="w-5 h-5" /> },
  { id: 'crypto', label: 'Crypto', icon: <Bitcoin className="w-5 h-5" /> },
  { id: 'sports', label: 'Sports', icon: <Trophy className="w-5 h-5" /> },
  { id: 'entertainment', label: 'Entertainment', icon: <Film className="w-5 h-5" /> },
];

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopics,
  onTopicToggle,
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {topics.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onTopicToggle(id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full transition-all
            ${
              selectedTopics.includes(id)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};