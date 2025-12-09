import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultExercises, defaultTimeWindows } from './data/defaultData';
import { ExerciseTemplate, DailySnack, AppState, TimeOfDay } from './types';
import { getCurrentTimeWindow } from './utils/timeUtils';
import { ReminderBanner } from './components/ReminderBanner';
import { TodayOverview } from './components/TodayOverview';
import { SnackList } from './components/SnackList';
import { ExerciseLibrary } from './components/ExerciseLibrary';

function App() {
  const [appState, setAppState] = useLocalStorage<AppState>('exercise-snacks-state', {
    dailyGoal: 3,
    todaySnacks: [],
    exerciseLibrary: defaultExercises,
    timeWindows: defaultTimeWindows
  });

  const [currentTimeWindow, setCurrentTimeWindow] = useState(getCurrentTimeWindow(appState.timeWindows));

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

  const handleAddToToday = (exercise: ExerciseTemplate, timeOfDay: TimeOfDay) => {
    const newSnack: DailySnack = {
      id: `snack-${Date.now()}-${Math.random()}`,
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      description: exercise.description,
      timeOfDay: timeOfDay,
      completed: false,
      timestamp: Date.now()
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
          <div className="flex items-center gap-4">
            <Activity className="w-12 h-12 text-[#00F0FF]" strokeWidth={3} />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">EXERCISE SNACKS</h1>
              <p className="text-[#00F0FF] text-lg font-semibold mt-1">MICRO-WORKOUTS. MAXIMUM IMPACT.</p>
            </div>
          </div>
        </header>

        {currentTimeWindow && (
          <ReminderBanner timeOfDay={currentTimeWindow} />
        )}

        <div className="space-y-8">
          <TodayOverview 
            completed={completedCount}
            goal={appState.dailyGoal}
            onGoalChange={handleGoalChange}
          />

          <SnackList 
            snacks={appState.todaySnacks}
            onToggle={handleToggleSnack}
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

export default App;
