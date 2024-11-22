import React from "react";
import { DAYS_OF_WEEK, getMonthDays, isWeekday } from "../utils/dateUtils";
import { DateRange } from "../types/dateRangePicker";
import { cn } from "@/lib/utils";

interface CalendarProps {
  year: number;
  month: number;
  selectedRange: DateRange;
  onDateClick: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  selectedRange,
  onDateClick,
}) => {
  const days = getMonthDays(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  return (
    <div className="calendar">
      <div className="grid grid-cols-7 gap-1">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center font-medium text-sm text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}
        {days.map((date) => {
          const isSelected =
            selectedRange.start &&
            selectedRange.end &&
            date >= selectedRange.start &&
            date <= selectedRange.end;
          const isDisabled = !isWeekday(date);
          const isToday = new Date().toDateString() === date.toDateString();
          return (
            <button
              key={date.toISOString()}
              onClick={() => !isDisabled && onDateClick(new Date(date))}
              className={cn(
                "h-10 w-full rounded-full flex items-center justify-center text-sm transition-colors",
                isDisabled
                  ? "text-muted-foreground opacity-50 cursor-not-allowed"
                  : "hover:bg-accent",
                isSelected && "bg-black text-white hover:bg-primary/90",
                isToday && !isSelected && "border border-primary"
              )}
              disabled={isDisabled}
              aria-label={`${date.toDateString()}`}
              aria-disabled={isDisabled}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
