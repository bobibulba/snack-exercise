import React from 'react';
import { DailySnack, TimeOfDay } from '../types';
import { SnackItem } from './SnackItem';
import { Sunrise, Sun, Moon } from 'lucide-react';

interface SnackListProps {
  snacks: DailySnack[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const timeOfDayConfig = {
  Morning: { icon: Sunrise, color: '#00F0FF' },
  Afternoon: { icon: Sun, color: '#FFD700' },
  Evening: { icon: Moon, color: '#9D4EDD' }
};

export function SnackList({ snacks, onToggle, onRemove }: SnackListProps) {
  const groupedSnacks = snacks.reduce((acc, snack) => {
    if (!acc[snack.timeOfDay]) {
      acc[snack.timeOfDay] = [];
    }
    acc[snack.timeOfDay].push(snack);
    return acc;
  }, {} as Record<TimeOfDay, DailySnack[]>);

  const timeOrder: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening'];

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_black]">
      <h2 className="text-3xl font-bold text-black mb-6">TODAY'S SNACKS</h2>
      
      {snacks.length === 0 ? (
        <div className="text-center py-8 bg-gray-100 border-4 border-black">
          <p className="text-xl font-bold text-black">NO SNACKS PLANNED YET!</p>
          <p className="text-black font-semibold mt-2">Add some from the library below →</p>
        </div>
      ) : (
        <div className="space-y-6">
          {timeOrder.map(timeOfDay => {
            const snacksForTime = groupedSnacks[timeOfDay] || [];
            if (snacksForTime.length === 0) return null;

            const config = timeOfDayConfig[timeOfDay];
            const Icon = config.icon;

            return (
              <div key={timeOfDay}>
                <div 
                  className="flex items-center gap-3 mb-3 p-3 border-4 border-black"
                  style={{ backgroundColor: config.color }}
                >
                  <Icon className="w-6 h-6 text-black" strokeWidth={3} />
                  <h3 className="text-xl font-bold text-black">{timeOfDay.toUpperCase()}</h3>
                </div>
                {snacksForTime.map(snack => (
                  <SnackItem 
                    key={snack.id} 
                    snack={snack} 
                    onToggle={onToggle}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
