"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      // The browser returns a yyyy-mm-dd string. The Date constructor
      // correctly parses this in UTC time.
      const selectedDate = new Date(value + "T00:00:00");
      setDate(selectedDate);
    } else {
      setDate(undefined);
    }
  };

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return "";
    // Format to yyyy-mm-dd for the input value
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={cn("relative", className)}>
      <input
        type="date"
        value={formatDateForInput(date)}
        onChange={handleChange}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "appearance-none"
        )}
      />
    </div>
  );
}
