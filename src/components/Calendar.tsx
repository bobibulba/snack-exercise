import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Check, X, Home } from 'lucide-react';
import { DailySnack, ExerciseTemplate, TimeOfDay, HistoricalDay } from '../types';
import { getDateKey, formatDateDisplay, getMonthDays } from '../utils/dateUtils';

interface CalendarProps {
  historicalData: Record<string, HistoricalDay>;
  exerciseLibrary: ExerciseTemplate[];
  dailyGoal: number;
  onAddSnack: (dateKey: string, exercise: ExerciseTemplate, timeOfDay: TimeOfDay) => void;
  onToggleSnack: (dateKey: string, snackId: string) => void;
  onRemoveSnack: (dateKey: string, snackId: string) => void;
}

export function Calendar({ 
  historicalData, 
  exerciseLibrary, 
  dailyGoal,
  onAddSnack,
  onToggleSnack,
  onRemoveSnack
}: CalendarProps) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<TimeOfDay>('Morning');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthDays = getMonthDays(year, month);
  const today = getDateKey(new Date());

  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const handleDateClick = (date: Date) => {
    const dateKey = getDateKey(date);
    setSelectedDate(dateKey);
    setShowAddExercise(false);
  };

  const handleAddExercise = (exercise: ExerciseTemplate) => {
    if (selectedDate) {
      onAddSnack(selectedDate, exercise, selectedTimeOfDay);
      setShowAddExercise(false);
    }
  };

  const selectedDayData = selectedDate ? historicalData[selectedDate] : null;
  const selectedDaySnacks = selectedDayData?.snacks || [];

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-8" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 bg-black border-4 border-black p-6 shadow-[8px_8px_0_#FF005C]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">EXERCISE CALENDAR</h1>
              <p className="text-[#00F0FF] text-lg font-semibold mt-1">TRACK YOUR PROGRESS • PLAN AHEAD</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-[#00F0FF] border-4 border-white px-6 py-3 text-lg font-bold text-black shadow-[4px_4px_0_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_white] transition-all flex items-center gap-2"
            >
              <Home className="w-6 h-6" strokeWidth={3} />
              HOME
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_black]">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={previousMonth}
                  className="bg-[#00F0FF] border-2 border-black p-2 shadow-[2px_2px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_black] transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-black" strokeWidth={3} />
                </button>
                <h2 className="text-2xl font-bold text-black">
                  {monthNames[month]} {year}
                </h2>
                <button
                  onClick={nextMonth}
                  className="bg-[#00F0FF] border-2 border-black p-2 shadow-[2px_2px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_black] transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-black" strokeWidth={3} />
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center font-bold text-black text-sm p-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((date, index) => {
                  const dateKey = getDateKey(date);
                  const dayData = historicalData[dateKey];
                  const isCurrentMonth = date.getMonth() === month;
                  const isToday = dateKey === today;
                  const isSelected = dateKey === selectedDate;
                  const completedCount = dayData?.snacks.filter(s => s.completed).length || 0;
                  const goalMet = completedCount >= dailyGoal;

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(date)}
                      className={`
                        aspect-square border-2 border-black p-2 text-center transition-all
                        ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'}
                        ${isToday ? 'border-4 border-[#FF005C]' : ''}
                        ${isSelected ? 'bg-[#00F0FF] shadow-[2px_2px_0_black]' : 'hover:bg-gray-50'}
                        ${goalMet && isCurrentMonth ? 'bg-green-100' : ''}
                      `}
                    >
                      <div className="text-sm font-bold text-black">
                        {date.getDate()}
                      </div>
                      {dayData && dayData.snacks.length > 0 && (
                        <div className="flex justify-center gap-1 mt-1">
                          {dayData.snacks.slice(0, 3).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < completedCount ? 'bg-[#FF005C]' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Day Details */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_black] sticky top-8">
              {selectedDate ? (
                <>
                  <h3 className="text-xl font-bold text-black mb-4">
                    {formatDateDisplay(selectedDate)}
                  </h3>

                  {selectedDaySnacks.length === 0 ? (
                    <div className="text-center py-8 bg-gray-100 border-2 border-black mb-4">
                      <p className="text-sm font-bold text-black">NO EXERCISES</p>
                    </div>
                  ) : (
                    <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
                      {selectedDaySnacks.map(snack => (
                        <div key={snack.id} className="bg-gray-50 border-2 border-black p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className={`text-sm font-bold ${snack.completed ? 'line-through text-gray-500' : 'text-black'}`}>
                                {snack.exerciseName}
                              </p>
                              <p className="text-xs font-semibold text-gray-600 mt-1">
                                {snack.timeOfDay}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => onToggleSnack(selectedDate, snack.id)}
                                className={`p-1 border-2 border-black ${
                                  snack.completed ? 'bg-[#FF005C]' : 'bg-white'
                                }`}
                              >
                                <Check className="w-4 h-4 text-black" strokeWidth={3} />
                              </button>
                              {!snack.completed && (
                                <button
                                  onClick={() => onRemoveSnack(selectedDate, snack.id)}
                                  className="p-1 border-2 border-black bg-white hover:bg-red-100"
                                >
                                  <X className="w-4 h-4 text-red-600" strokeWidth={3} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!showAddExercise ? (
                    <button
                      onClick={() => setShowAddExercise(true)}
                      className="w-full bg-[#FF005C] border-2 border-black px-4 py-3 text-sm font-bold text-black shadow-[2px_2px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_black] transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" strokeWidth={3} />
                      ADD EXERCISE
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <select
                        value={selectedTimeOfDay}
                        onChange={(e) => setSelectedTimeOfDay(e.target.value as TimeOfDay)}
                        className="w-full border-2 border-black px-3 py-2 text-sm font-bold"
                      >
                        <option value="Morning">MORNING</option>
                        <option value="Afternoon">AFTERNOON</option>
                        <option value="Evening">EVENING</option>
                      </select>

                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {exerciseLibrary.map(exercise => (
                          <button
                            key={exercise.id}
                            onClick={() => handleAddExercise(exercise)}
                            className="w-full text-left bg-gray-50 border-2 border-black p-3 hover:bg-[#00F0FF] transition-colors"
                          >
                            <p className="text-sm font-bold text-black">{exercise.name}</p>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setShowAddExercise(false)}
                        className="w-full bg-white border-2 border-black px-4 py-2 text-sm font-bold text-black"
                      >
                        CANCEL
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm font-bold text-gray-500">SELECT A DATE</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
