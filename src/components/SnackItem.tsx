import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import { DailySnack } from '../types';

interface SnackItemProps {
  snack: DailySnack;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function SnackItem({ snack, onToggle, onRemove }: SnackItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border-4 border-black shadow-[4px_4px_0_black] mb-3">
      <div className="flex items-center gap-3 p-4">
        <button
          onClick={() => onToggle(snack.id)}
          className={`w-8 h-8 border-4 border-black flex items-center justify-center cursor-pointer transition-all ${
            snack.completed 
              ? 'bg-[#FF005C] shadow-[2px_2px_0_black]' 
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          {snack.completed && <Check className="w-6 h-6 text-black" strokeWidth={4} />}
        </button>
        
        <div className="flex-1">
          <h4 className={`text-lg font-bold ${snack.completed ? 'line-through text-gray-500' : 'text-black'}`}>
            {snack.exerciseName}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {!snack.completed && (
            <button
              onClick={() => onRemove(snack.id)}
              className="p-2 hover:bg-red-100 border-2 border-black bg-white transition-colors"
              title="Remove exercise"
            >
              <X className="w-5 h-5 text-red-600" strokeWidth={3} />
            </button>
          )}

          {snack.description && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 hover:bg-gray-100 border-2 border-black"
            >
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {expanded && snack.description && (
        <div className="px-4 pb-4 pt-0 border-t-4 border-black bg-gray-50">
          <p className="text-black font-semibold mt-3">{snack.description}</p>
        </div>
      )}
    </div>
  );
}
