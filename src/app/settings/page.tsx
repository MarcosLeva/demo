"use client";

import React, { useState } from "react";
import { type DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";

export default function SettingsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your data is being prepared for export.",
    });
    // In a real app, you would trigger a download here.
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Configuraciones</CardTitle>
          <CardDescription>
            Ajusta los filtros y exporta los datos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <DateRangePicker date={date} setDate={setDate} />
              <Button
                variant="outline"
                onClick={handleExport}
                className="w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
