import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Activity, Calendar as CalendarIcon } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultExercises, defaultTimeWindows } from './data/defaultData';
import { ExerciseTemplate, DailySnack, AppState, TimeOfDay } from './types';
import { getCurrentTimeWindow } from './utils/timeUtils';
import { getTodayDateKey, calculateStreak } from './utils/dateUtils';
import { ReminderBanner } from './components/ReminderBanner';
import { TodayOverview } from './components/TodayOverview';
import { SnackList } from './components/SnackList';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { StreakCounter } from './components/StreakCounter';
import { CalendarPage } from './pages/CalendarPage';

function HomePage() {
  const navigate = useNavigate();
  const [appState, setAppState] = useLocalStorage<AppState>('exercise-snacks-state', {
    dailyGoal: 3,
    todaySnacks: [],
    exerciseLibrary: defaultExercises,
    timeWindows: defaultTimeWindows,
    historicalData: {},
    currentStreak: 0,
    longestStreak: 0
  });

  const [currentTimeWindow, setCurrentTimeWindow] = useState(getCurrentTimeWindow(appState.timeWindows));

  // Sync today's snacks with historical data
  useEffect(() => {
    const today = getTodayDateKey();
    const updatedHistoricalData = { ...appState.historicalData };
    const completedCount = appState.todaySnacks.filter(s => s.completed).length;
    
    updatedHistoricalData[today] = {
      dateKey: today,
      snacks: appState.todaySnacks.map(snack => ({ ...snack, dateKey: today })),
      goalMet: completedCount >= appState.dailyGoal
    };

    // Calculate streaks
    const { current, longest } = calculateStreak(updatedHistoricalData, appState.dailyGoal);

    if (JSON.stringify(updatedHistoricalData) !== JSON.stringify(appState.historicalData) ||
        current !== appState.currentStreak || longest !== appState.longestStreak) {
      setAppState({
        ...appState,
        historicalData: updatedHistoricalData,
        currentStreak: current,
        longestStreak: longest
      });
    }
  }, [appState.todaySnacks, appState.dailyGoal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeWindow(getCurrentTimeWindow(appState.timeWindows));
    }, 60000);

    return () => clearInterval(interval);
  }, [appState.timeWindows]);

  const completedCount = appState.todaySnacks.filter(s => s.completed).length;

  const handleToggleSnack = (id: string) => {
    setAppState({
      ...appState,
      todaySnacks: appState.todaySnacks.map(snack =>
        snack.id === id ? { ...snack, completed: !snack.completed } : snack
      )
    });
  };

  const handleRemoveSnack = (id: string) => {
    setAppState({
      ...appState,
      todaySnacks: appState.todaySnacks.filter(snack => snack.id !== id)
    });
  };

  const handleAddToToday = (exercise: ExerciseTemplate, timeOfDay: TimeOfDay) => {
    const newSnack: DailySnack = {
      id: `snack-${Date.now()}-${Math.random()}`,
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      description: exercise.description,
      timeOfDay: timeOfDay,
      completed: false,
      timestamp: Date.now(),
      dateKey: getTodayDateKey()
    };

    setAppState({
      ...appState,
      todaySnacks: [...appState.todaySnacks, newSnack]
    });
  };

  const handleAddNewExercise = (exercise: Omit<ExerciseTemplate, 'id'>) => {
    const newExercise: ExerciseTemplate = {
      ...exercise,
      id: `exercise-${Date.now()}`
    };

    setAppState({
      ...appState,
      exerciseLibrary: [...appState.exerciseLibrary, newExercise]
    });
  };

  const handleGoalChange = (goal: number) => {
    setAppState({
      ...appState,
      dailyGoal: goal
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-4 md:p-8" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 bg-black border-4 border-black p-6 shadow-[8px_8px_0_#FF005C]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Activity className="w-12 h-12 text-[#00F0FF]" strokeWidth={3} />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">EXERCISE SNACKS</h1>
                <p className="text-[#00F0FF] text-lg font-semibold mt-1">MICRO-WORKOUTS. MAXIMUM IMPACT.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/calendar')}
              className="bg-[#00F0FF] border-4 border-white px-6 py-3 text-lg font-bold text-black shadow-[4px_4px_0_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_white] transition-all flex items-center gap-2"
            >
              <CalendarIcon className="w-6 h-6" strokeWidth={3} />
              CALENDAR
            </button>
          </div>
        </header>

        {currentTimeWindow && (
          <ReminderBanner timeOfDay={currentTimeWindow} />
        )}

        <StreakCounter 
          currentStreak={appState.currentStreak}
          longestStreak={appState.longestStreak}
        />

        <div className="space-y-8">
          <TodayOverview 
            completed={completedCount}
            goal={appState.dailyGoal}
            onGoalChange={handleGoalChange}
          />

          <SnackList 
            snacks={appState.todaySnacks}
            onToggle={handleToggleSnack}
            onRemove={handleRemoveSnack}
          />

          <ExerciseLibrary 
            exercises={appState.exerciseLibrary}
            onAddToToday={handleAddToToday}
            onAddNewExercise={handleAddNewExercise}
          />
        </div>

        <footer className="mt-12 text-center p-6 bg-black border-4 border-black">
          <p className="text-white font-bold text-sm">
            BUILT WITH CHATANDBUILD • NO EXCUSES • JUST MOVE
          </p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}

export default App;
