import React from 'react';
import { Target } from 'lucide-react';

interface TodayOverviewProps {
  completed: number;
  goal: number;
  onGoalChange: (goal: number) => void;
}

export function TodayOverview({ completed, goal, onGoalChange }: TodayOverviewProps) {
  const goalOptions = [2, 3, 4, 5];

  return (
    <div className="bg-[#00F0FF] border-4 border-black p-6 shadow-[8px_8px_0_black]">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Target className="w-10 h-10 text-black" strokeWidth={3} />
          <div>
            <h2 className="text-3xl font-bold text-black mb-1">TODAY'S GOAL</h2>
            <p className="text-4xl font-bold text-black">
              {completed} / {goal}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-lg font-bold text-black">DAILY TARGET:</label>
          <select
            value={goal}
            onChange={(e) => onGoalChange(Number(e.target.value))}
            className="bg-white border-4 border-black px-4 py-2 text-xl font-bold text-black shadow-[4px_4px_0_black] cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_black] transition-all"
          >
            {goalOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
