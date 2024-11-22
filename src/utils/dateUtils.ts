export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function getMonthDays(year: number, month: number): Date[] {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function getWeekendDatesInRange(start: Date, end: Date): Date[] {
  const weekends: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    if (!isWeekday(current)) {
      weekends.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return weekends;
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getLastNDays(n: number): [Date, Date] {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - n + 1);
  return [start, end];
}
