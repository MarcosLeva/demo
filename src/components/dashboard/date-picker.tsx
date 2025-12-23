"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
      // Input type="date" returns "YYYY-MM-DD"
      // new Date() needs to adjust for timezone to avoid off-by-one day errors
      const [year, month, day] = dateValue.split('-').map(Number);
      setDate(new Date(year, month - 1, day));
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
        <Input
          type="date"
          value={date ? format(date, 'yyyy-MM-dd') : ''}
          onChange={handleDateChange}
          className="w-full justify-start text-left font-normal"
        />
    </div>
  );
}
