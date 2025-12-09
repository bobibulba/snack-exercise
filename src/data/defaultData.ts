import { ExerciseTemplate, TimeWindow } from '../types';

export const defaultExercises: ExerciseTemplate[] = [
  {
    id: '1',
    name: '20 Push-ups',
    description: 'Standard push-ups, keep your core tight and back straight',
    timeOfDay: 'Morning',
    intensity: 'Medium'
  },
  {
    id: '2',
    name: '30 Squats',
    description: 'Bodyweight squats, go as low as comfortable',
    timeOfDay: 'Morning',
    intensity: 'Medium'
  },
  {
    id: '3',
    name: '15-min Dog Walk',
    description: 'Quick walk around the block with your furry friend',
    timeOfDay: 'Afternoon',
    intensity: 'Easy'
  },
  {
    id: '4',
    name: '1-min Plank',
    description: 'Hold a plank position, engage your core',
    timeOfDay: 'Evening',
    intensity: 'Hard'
  },
  {
    id: '5',
    name: '10 Burpees',
    description: 'Full body exercise, modify as needed',
    timeOfDay: 'Morning',
    intensity: 'Hard'
  },
  {
    id: '6',
    name: 'Stretch Session',
    description: '5 minutes of light stretching and mobility work',
    timeOfDay: 'Evening',
    intensity: 'Easy'
  },
  {
    id: '7',
    name: '20 Jumping Jacks',
    description: 'Get your heart rate up with some cardio',
    timeOfDay: 'Afternoon',
    intensity: 'Easy'
  },
  {
    id: '8',
    name: '15 Lunges',
    description: 'Alternating lunges, 15 per leg',
    timeOfDay: 'Afternoon',
    intensity: 'Medium'
  }
];

export const defaultTimeWindows: TimeWindow[] = [
  { timeOfDay: 'Morning', startHour: 7, endHour: 10 },
  { timeOfDay: 'Afternoon', startHour: 14, endHour: 17 },
  { timeOfDay: 'Evening', startHour: 18, endHour: 21 }
];
