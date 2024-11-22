import React, { useState, useCallback } from "react";

import {
  WeekdayDateRangePickerProps,
  DateRange,
} from "../types/dateRangePicker";
import { MONTHS, getWeekendDatesInRange, formatDate } from "../utils/dateUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "./Calender";

export const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  onChange,
  predefinedRanges,
}) => {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateClick = useCallback(
    (date: Date) => {
      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        setSelectedRange({ start: date, end: null });
      } else {
        const start = selectedRange.start;
        const end = date;
        let rangeStart, rangeEnd;
        if (start <= end) {
          rangeStart = start;
          rangeEnd = end;
        } else {
          rangeStart = end;
          rangeEnd = start;
        }
        setSelectedRange({ start: rangeStart, end: rangeEnd });
        const weekends = getWeekendDatesInRange(rangeStart, rangeEnd);
        onChange(
          [formatDate(rangeStart), formatDate(rangeEnd)],
          weekends.map(formatDate)
        );
      }
    },
    [selectedRange, onChange]
  );

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(parseInt(year));
    setCurrentDate(newDate);
  };

  const handlePredefinedRange = (range: () => [Date, Date]) => {
    const [start, end] = range();
    setSelectedRange({ start, end });
    const weekends = getWeekendDatesInRange(start, end);
    onChange([formatDate(start), formatDate(end)], weekends.map(formatDate));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMonthChange(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMonthChange(1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          selectedRange={selectedRange}
          onDateClick={handleDateClick}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-medium">Year:</span>
          <Select
            onValueChange={handleYearChange}
            value={currentDate.getFullYear().toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: 10 },
                (_, i) => currentDate.getFullYear() - 5 + i
              ).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {predefinedRanges && (
          <div className="w-full">
            <span className="text-sm font-medium mb-2 block">
              Predefined Ranges:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {predefinedRanges.map((range, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handlePredefinedRange(range.range)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
