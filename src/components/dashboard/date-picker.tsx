"use client";

import * as React from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

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
  
  return (
    <div className={className}>
      <Input
        type="date"
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        onChange={handleDateChange}
        className="w-full justify-start text-left font-normal"
      />
    </div>
  );
}
