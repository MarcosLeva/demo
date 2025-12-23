"use client";

import * as React from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      // The browser provides the date in 'yyyy-mm-dd' format, which new Date() parses correctly in UTC.
      setDate(new Date(dateValue));
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        type="date"
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        onChange={handleDateChange}
        className="w-full justify-start text-left font-normal pr-8"
        style={{
          // Hides the native calendar icon in WebKit browsers (Chrome, Safari)
          WebkitAppearance: 'none'
        }}
      />
      <CalendarIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}
