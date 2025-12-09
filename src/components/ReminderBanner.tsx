import React from 'react';
import { Bell } from 'lucide-react';
import { TimeOfDay } from '../types';

interface ReminderBannerProps {
  timeOfDay: TimeOfDay;
}

export function ReminderBanner({ timeOfDay }: ReminderBannerProps) {
  return (
    <div className="bg-[#FF005C] border-4 border-black p-6 mb-8 shadow-[8px_8px_0_black]">
      <div className="flex items-center gap-4">
        <Bell className="w-8 h-8 text-black" strokeWidth={3} />
        <div>
          <h2 className="text-2xl font-bold text-black mb-1">
            IT'S YOUR {timeOfDay.toUpperCase()} SNACK WINDOW!
          </h2>
          <p className="text-black text-lg font-semibold">
            Do one quick exercise now →
          </p>
        </div>
      </div>
    </div>
  );
}
