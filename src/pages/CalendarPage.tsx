import React, { useEffect, useState } from 'react';
import { Calendar } from '../components/Calendar';
import { AppState, ExerciseTemplate, TimeOfDay } from '../types';
import { getTodayDateKey } from '../utils/dateUtils';
import { defaultExercises, defaultTimeWindows } from '../data/defaultData';

export function CalendarPage() {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load state from localStorage with fallback to defaults
    try {
      const stored = localStorage.getItem('sweat-snack-state');
      if (stored) {
        const state = JSON.parse(stored);
        // Ensure historicalData exists
        if (!state.historicalData) {
          state.historicalData = {};
        }
        // Ensure exerciseLibrary exists
        if (!state.exerciseLibrary || state.exerciseLibrary.length === 0) {
          state.exerciseLibrary = defaultExercises;
        }
        // Ensure timeWindows exists
        if (!state.timeWindows) {
          state.timeWindows = defaultTimeWindows;
        }
        // Ensure dailyGoal exists
        if (!state.dailyGoal) {
          state.dailyGoal = 3;
        }
        // Ensure todaySnacks exists
        if (!state.todaySnacks) {
          state.todaySnacks = [];
        }
        setAppState(state);
      } else {
        // Initialize with default state if nothing in localStorage
        const defaultState: AppState = {
          dailyGoal: 3,
          todaySnacks: [],
          exerciseLibrary: defaultExercises,
          timeWindows: defaultTimeWindows,
          historicalData: {},
          currentStreak: 0,
          longestStreak: 0
        };
        setAppState(defaultState);
        localStorage.setItem('sweat-snack-state', JSON.stringify(defaultState));
      }
    } catch (error) {
      console.error('Error loading state:', error);
      // Fallback to default state on error
      const defaultState: AppState = {
        dailyGoal: 3,
        todaySnacks: [],
        exerciseLibrary: defaultExercises,
        timeWindows: defaultTimeWindows,
        historicalData: {},
        currentStreak: 0,
        longestStreak: 0
      };
      setAppState(defaultState);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddSnack = (dateKey: string, exercise: ExerciseTemplate, timeOfDay: TimeOfDay) => {
    if (!appState) return;

    const newSnack = {
      id: `snack-${Date.now()}-${Math.random()}`,
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      description: exercise.description,
      timeOfDay: timeOfDay,
      completed: false,
      timestamp: Date.now(),
      dateKey: dateKey
    };

    const updatedHistoricalData = { ...appState.historicalData };
    if (!updatedHistoricalData[dateKey]) {
      updatedHistoricalData[dateKey] = {
        dateKey,
        snacks: [],
        goalMet: false
      };
    }

    updatedHistoricalData[dateKey].snacks.push(newSnack);

    const newState = {
      ...appState,
      historicalData: updatedHistoricalData
    };

    setAppState(newState);
    localStorage.setItem('sweat-snack-state', JSON.stringify(newState));

    // If adding to today, also update todaySnacks
    if (dateKey === getTodayDateKey()) {
      newState.todaySnacks = [...newState.todaySnacks, newSnack];
      localStorage.setItem('sweat-snack-state', JSON.stringify(newState));
    }
  };

  const handleToggleSnack = (dateKey: string, snackId: string) => {
    if (!appState) return;

    const updatedHistoricalData = { ...appState.historicalData };
    if (updatedHistoricalData[dateKey]) {
      updatedHistoricalData[dateKey].snacks = updatedHistoricalData[dateKey].snacks.map(snack =>
        snack.id === snackId ? { ...snack, completed: !snack.completed } : snack
      );

      const completedCount = updatedHistoricalData[dateKey].snacks.filter(s => s.completed).length;
      updatedHistoricalData[dateKey].goalMet = completedCount >= appState.dailyGoal;
    }

    const newState = {
      ...appState,
      historicalData: updatedHistoricalData
    };

    // If toggling today's snack, also update todaySnacks
    if (dateKey === getTodayDateKey()) {
      newState.todaySnacks = newState.todaySnacks.map(snack =>
        snack.id === snackId ? { ...snack, completed: !snack.completed } : snack
      );
    }

    setAppState(newState);
    localStorage.setItem('sweat-snack-state', JSON.stringify(newState));
  };

  const handleRemoveSnack = (dateKey: string, snackId: string) => {
    if (!appState) return;

    const updatedHistoricalData = { ...appState.historicalData };
    if (updatedHistoricalData[dateKey]) {
      updatedHistoricalData[dateKey].snacks = updatedHistoricalData[dateKey].snacks.filter(
        snack => snack.id !== snackId
      );
    }

    const newState = {
      ...appState,
      historicalData: updatedHistoricalData
    };

    // If removing from today, also update todaySnacks
    if (dateKey === getTodayDateKey()) {
      newState.todaySnacks = newState.todaySnacks.filter(snack => snack.id !== snackId);
    }

    setAppState(newState);
    localStorage.setItem('sweat-snack-state', JSON.stringify(newState));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-black mb-2">LOADING...</p>
          <div className="w-16 h-16 border-4 border-black border-t-[#FF005C] rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!appState) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-2xl font-bold text-red-600">ERROR LOADING DATA</p>
      </div>
    );
  }

  return (
    <Calendar
      historicalData={appState.historicalData}
      exerciseLibrary={appState.exerciseLibrary}
      dailyGoal={appState.dailyGoal}
      onAddSnack={handleAddSnack}
      onToggleSnack={handleToggleSnack}
      onRemoveSnack={handleRemoveSnack}
    />
  );
}
