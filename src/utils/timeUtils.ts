import { TimeWindow, TimeOfDay } from '../types';

export function getCurrentTimeWindow(timeWindows: TimeWindow[]): TimeOfDay | null {
  const now = new Date();
  const currentHour = now.getHours();

  for (const window of timeWindows) {
    if (currentHour >= window.startHour && currentHour < window.endHour) {
      return window.timeOfDay;
    }
  }

  return null;
}

export function formatTimeWindow(window: TimeWindow): string {
  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour} ${period}`;
  };

  return `${formatHour(window.startHour)} - ${formatHour(window.endHour)}`;
}
