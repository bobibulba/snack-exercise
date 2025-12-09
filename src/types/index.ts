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
}

export interface TimeWindow {
  timeOfDay: TimeOfDay;
  startHour: number;
  endHour: number;
}

export interface AppState {
  dailyGoal: number;
  todaySnacks: DailySnack[];
  exerciseLibrary: ExerciseTemplate[];
  timeWindows: TimeWindow[];
}
