export function getDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayDateKey(): string {
  return getDateKey(new Date());
}

export function formatDateDisplay(dateKey: string): string {
  const [year, month, day] = dateKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}

export function getMonthDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];
  
  // Add padding days from previous month
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push(date);
  }
  
  // Add days of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }
  
  // Add padding days from next month
  const remainingDays = 42 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }
  
  return days;
}

export function calculateStreak(historicalData: Record<string, HistoricalDay>, dailyGoal: number): { current: number; longest: number } {
  const today = getTodayDateKey();
  const sortedDates = Object.keys(historicalData).sort().reverse();
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let checkingCurrent = true;
  
  // Check if today's goal is met
  const todayData = historicalData[today];
  const todayGoalMet = todayData && todayData.snacks.filter(s => s.completed).length >= dailyGoal;
  
  for (let i = 0; i < sortedDates.length; i++) {
    const dateKey = sortedDates[i];
    const dayData = historicalData[dateKey];
    const completedCount = dayData.snacks.filter(s => s.completed).length;
    const goalMet = completedCount >= dailyGoal;
    
    if (goalMet) {
      tempStreak++;
      if (checkingCurrent && (dateKey === today || i === 0)) {
        currentStreak = tempStreak;
      }
    } else {
      if (checkingCurrent && dateKey !== today) {
        checkingCurrent = false;
      }
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
      tempStreak = 0;
    }
  }
  
  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
  }
  
  // If today's goal isn't met yet, don't count it in current streak
  if (!todayGoalMet && currentStreak > 0) {
    currentStreak--;
  }
  
  return { current: currentStreak, longest: longestStreak };
}
