export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening';
export type Intensity = 'Easy' | 'Medium' | 'Hard';

export interface ExerciseTemplate {
  id: string;
  name: string;
  description: string;
  timeOfDay: TimeOfDay;
  intensity: Intensity;
}

export interface DailySnack {
  id: string;
  exerciseId: string;
  exerciseName: string;
  description: string;
  timeOfDay: TimeOfDay;
  completed: boolean;
  timestamp?: number;
  dateKey?: string; // Format: YYYY-MM-DD
}

export interface TimeWindow {
  timeOfDay: TimeOfDay;
  startHour: number;
  endHour: number;
}

export interface HistoricalDay {
  dateKey: string; // Format: YYYY-MM-DD
  snacks: DailySnack[];
  goalMet: boolean;
}

export interface AppState {
  dailyGoal: number;
  todaySnacks: DailySnack[];
  exerciseLibrary: ExerciseTemplate[];
  timeWindows: TimeWindow[];
  historicalData: Record<string, HistoricalDay>; // dateKey -> HistoricalDay
  currentStreak: number;
  longestStreak: number;
}
