import React from "react";

import { PredefinedRange } from "./types/dateRangePicker";
import { getLastNDays } from "./utils/dateUtils";
import { WeekdayDateRangePicker } from "./components/WeekdayRangePicker";

const predefinedRanges: PredefinedRange[] = [
  {
    label: "Last 7 days",
    range: () => getLastNDays(7),
  },
  {
    label: "Last 30 days",
    range: () => getLastNDays(30),
  },
  {
    label: "This month",
    range: () => {
      const now = new Date();
      return [new Date(now.getFullYear(), now.getMonth(), 1), now];
    },
  },
  {
    label: "Last month",
    range: () => {
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return [lastMonth, new Date(now.getFullYear(), now.getMonth(), 0)];
    },
  },
];

const App: React.FC = () => {
  const handleDateRangeChange = (
    range: [string, string],
    weekends: string[]
  ) => {
    console.log("Selected range:", range);
    console.log("Weekends in range:", weekends);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-foreground">
            Weekday Date Range Picker
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Select a range of weekdays
          </p>
        </div>
        <WeekdayDateRangePicker
          onChange={handleDateRangeChange}
          predefinedRanges={predefinedRanges}
        />
      </div>
    </div>
  );
};

export default App;
