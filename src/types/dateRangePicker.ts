export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface PredefinedRange {
  label: string;
  range: () => [Date, Date];
}

export interface WeekdayDateRangePickerProps {
  onChange: (range: [string, string], weekends: string[]) => void;
  predefinedRanges?: PredefinedRange[];
}
