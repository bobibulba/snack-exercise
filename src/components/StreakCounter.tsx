import React from 'react';
import { Flame, Trophy } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCounter({ currentStreak, longestStreak }: StreakCounterProps) {
  return (
    <div className="bg-gradient-to-r from-[#FF005C] to-[#FF6B9D] border-4 border-black p-6 shadow-[8px_8px_0_black] mb-8">
      <div className="flex items-center justify-between">
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
    </div>
  );
}
