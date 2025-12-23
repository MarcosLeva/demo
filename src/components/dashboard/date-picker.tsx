"use client";

import * as React from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const [year, month, day] = dateValue.split('-').map(Number);
      setDate(new Date(year, month - 1, day));
    } else {
      setDate(undefined);
    }
  };
  
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cn("relative", className)}>
      <Input
        ref={inputRef}
        type="date"
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        onChange={handleDateChange}
        className="w-full justify-start text-left font-normal pr-8"
      />
      <CalendarIcon 
        className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" 
        onClick={() => inputRef.current?.showPicker()}
      />
    </div>
  );
}