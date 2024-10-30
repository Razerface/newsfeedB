import React from 'react';
import { Crown } from 'lucide-react';

interface PremiumBannerProps {
  onUpgrade: () => void;
}

export default function PremiumBanner({ onUpgrade }: PremiumBannerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Crown className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">Upgrade to Premium</h3>
            <p className="text-sm opacity-90">Unlock unlimited articles and sharing</p>
          </div>
        </div>
        <button
          onClick={onUpgrade}
          className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-opacity-90"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}