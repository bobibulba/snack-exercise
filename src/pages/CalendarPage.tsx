import React, { useEffect, useState } from 'react';
import { Calendar } from '../components/Calendar';
import { AppState, ExerciseTemplate, TimeOfDay } from '../types';
import { getTodayDateKey } from '../utils/dateUtils';

export function CalendarPage() {
  const [appState, setAppState] = useState<AppState | null>(null);

  useEffect(() => {
    // Load state from localStorage
    const stored = localStorage.getItem('exercise-snacks-state');
    if (stored) {
      const state = JSON.parse(stored);
      // Ensure historicalData exists
      if (!state.historicalData) {
        state.historicalData = {};
      }
      setAppState(state);
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
    localStorage.setItem('exercise-snacks-state', JSON.stringify(newState));

    // If adding to today, also update todaySnacks
    if (dateKey === getTodayDateKey()) {
      newState.todaySnacks = [...newState.todaySnacks, newSnack];
      localStorage.setItem('exercise-snacks-state', JSON.stringify(newState));
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
    localStorage.setItem('exercise-snacks-state', JSON.stringify(newState));
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
    localStorage.setItem('exercise-snacks-state', JSON.stringify(newState));
  };

  if (!appState) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-2xl font-bold">LOADING...</p>
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
