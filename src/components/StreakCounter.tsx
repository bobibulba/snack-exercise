import React from 'react';
import { Flame, Trophy, Share2 } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCounter({ currentStreak, longestStreak }: StreakCounterProps) {
  const handleShare = () => {
    const tweetText = `I reached ${currentStreak} ${currentStreak === 1 ? 'day' : 'days'} streak on SweatSnack!

Ready to adapt a new workout style for you?

Join the movement at sweatsnack.bobibulba.xyz

Built using @chatandbuild`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-[#FF005C] to-[#FF6B9D] border-4 border-black p-6 shadow-[8px_8px_0_black]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-white border-4 border-black p-4">
              <Flame className="w-12 h-12 text-[#FF005C]" strokeWidth={3} />
            </div>
            <div>
              <p className="text-white text-sm font-bold mb-1">CURRENT STREAK</p>
              <p className="text-white text-5xl font-bold">{currentStreak}</p>
              <p className="text-white text-sm font-bold mt-1">
                {currentStreak === 1 ? 'DAY' : 'DAYS'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-white text-sm font-bold mb-1 text-right">LONGEST STREAK</p>
              <p className="text-white text-4xl font-bold text-right">{longestStreak}</p>
              <p className="text-white text-sm font-bold mt-1 text-right">
                {longestStreak === 1 ? 'DAY' : 'DAYS'}
              </p>
            </div>
            <div className="bg-white border-4 border-black p-4">
              <Trophy className="w-12 h-12 text-[#FFD700]" strokeWidth={3} />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleShare}
            className="bg-[#00F0FF] border-4 border-black px-6 py-3 text-lg font-bold text-black shadow-[4px_4px_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_black] transition-all flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" strokeWidth={3} />
            SHARE MY STREAK
          </button>
        </div>
      </div>

      <div className="bg-white border-4 border-black border-t-0 p-4 shadow-[8px_8px_0_black]">
        <p className="text-xs font-bold text-gray-600 text-center">
          🔒 PRIVACY NOTE: All your data is stored locally in your browser. We cannot access any information you store in this app. Your workout data stays on your device only.
        </p>
      </div>
    </div>
  );
}
