import React, { useState } from 'react';
import { Plus, Dumbbell, ChevronDown } from 'lucide-react';
import { ExerciseTemplate, TimeOfDay, Intensity } from '../types';

interface ExerciseLibraryProps {
  exercises: ExerciseTemplate[];
  onAddToToday: (exercise: ExerciseTemplate, timeOfDay: TimeOfDay) => void;
  onAddNewExercise: (exercise: Omit<ExerciseTemplate, 'id'>) => void;
}

const intensityColors = {
  Easy: '#90EE90',
  Medium: '#FFD700',
  Hard: '#FF6B6B'
};

export function ExerciseLibrary({ exercises, onAddToToday, onAddNewExercise }: ExerciseLibraryProps) {
  const [showForm, setShowForm] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    timeOfDay: 'Morning' as TimeOfDay,
    intensity: 'Medium' as Intensity
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAddNewExercise(formData);
      setFormData({
        name: '',
        description: '',
        timeOfDay: 'Morning',
        intensity: 'Medium'
      });
      setShowForm(false);
    }
  };

  const handleAddToTime = (exercise: ExerciseTemplate, timeOfDay: TimeOfDay) => {
    onAddToToday(exercise, timeOfDay);
    setOpenDropdown(null);
  };

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_black]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Dumbbell className="w-8 h-8 text-black" strokeWidth={3} />
          <h2 className="text-3xl font-bold text-black">EXERCISE LIBRARY</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#FF005C] border-4 border-black px-6 py-3 text-lg font-bold text-black shadow-[4px_4px_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_black] transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          NEW SNACK
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-gray-100 border-4 border-black">
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-bold text-black mb-2">EXERCISE NAME*</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-4 border-black px-4 py-2 text-lg font-semibold focus:outline-none focus:shadow-[4px_4px_0_black]"
                placeholder="e.g., 20 Push-ups"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-black mb-2">DESCRIPTION</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border-4 border-black px-4 py-2 text-lg font-semibold focus:outline-none focus:shadow-[4px_4px_0_black] resize-none"
                rows={3}
                placeholder="Optional details..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold text-black mb-2">TIME OF DAY</label>
                <select
                  value={formData.timeOfDay}
                  onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value as TimeOfDay })}
                  className="w-full border-4 border-black px-4 py-2 text-lg font-bold cursor-pointer"
                >
                  <option value="Morning">MORNING</option>
                  <option value="Afternoon">AFTERNOON</option>
                  <option value="Evening">EVENING</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-black mb-2">INTENSITY</label>
                <select
                  value={formData.intensity}
                  onChange={(e) => setFormData({ ...formData, intensity: e.target.value as Intensity })}
                  className="w-full border-4 border-black px-4 py-2 text-lg font-bold cursor-pointer"
                >
                  <option value="Easy">EASY</option>
                  <option value="Medium">MEDIUM</option>
                  <option value="Hard">HARD</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-[#00F0FF] border-4 border-black px-6 py-3 text-lg font-bold text-black shadow-[4px_4px_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_black] transition-all"
              >
                ADD TO LIBRARY
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-white border-4 border-black px-6 py-3 text-lg font-bold text-black shadow-[4px_4px_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_black] transition-all"
              >
                CANCEL
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map(exercise => (
          <div key={exercise.id} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_black]">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-black">{exercise.name}</h3>
              <div 
                className="px-3 py-1 border-2 border-black text-sm font-bold"
                style={{ backgroundColor: intensityColors[exercise.intensity] }}
              >
                {exercise.intensity.toUpperCase()}
              </div>
            </div>
            
            {exercise.description && (
              <p className="text-black font-semibold mb-3">{exercise.description}</p>
            )}
            
            <div className="flex justify-end">
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === exercise.id ? null : exercise.id)}
                  className="bg-[#FF005C] border-2 border-black px-4 py-2 text-sm font-bold text-black shadow-[2px_2px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_black] transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" strokeWidth={3} />
                  ADD TODAY
                  <ChevronDown className="w-4 h-4" strokeWidth={3} />
                </button>

                {openDropdown === exercise.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border-4 border-black shadow-[4px_4px_0_black] z-10">
                    <button
                      onClick={() => handleAddToTime(exercise, 'Morning')}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-black hover:bg-[#00F0FF] border-b-2 border-black transition-colors"
                    >
                      MORNING
                    </button>
                    <button
                      onClick={() => handleAddToTime(exercise, 'Afternoon')}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-black hover:bg-[#FFD700] border-b-2 border-black transition-colors"
                    >
                      AFTERNOON
                    </button>
                    <button
                      onClick={() => handleAddToTime(exercise, 'Evening')}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-black hover:bg-[#9D4EDD] transition-colors"
                    >
                      EVENING
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
