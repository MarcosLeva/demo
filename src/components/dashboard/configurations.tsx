"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./date-picker";

export function Configurations() {
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    let formattedValue = "";

    if (rawValue.length > 0) {
      formattedValue = rawValue.slice(0, 2);
    }
    if (rawValue.length > 2) {
      formattedValue += ":" + rawValue.slice(2, 4);
    }
    if (rawValue.length > 4) {
      formattedValue += ":" + rawValue.slice(4, 6);
    }

    setter(formattedValue);
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuraciones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-end">
          <div className="flex flex-col gap-2">
            <Label>De Fecha</Label>
            <DatePicker
              date={fromDate}
              setDate={setFromDate}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>A Fecha</Label>
            <DatePicker
              date={toDate}
              setDate={setToDate}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="from-time">De Hora</Label>
              <Input 
                id="from-time" 
                type="text" 
                placeholder="00:00:00" 
                value={fromTime}
                onChange={(e) => handleTimeChange(e, setFromTime)}
                maxLength={8}
              />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="to-time">A Hora</Label>
             <Input 
                id="to-time" 
                type="text" 
                placeholder="23:59:59" 
                value={toTime}
                onChange={(e) => handleTimeChange(e, setToTime)}
                maxLength={8}
              />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="period">Elegir el periodo</Label>
            <Select>
              <SelectTrigger id="period">
                <SelectValue placeholder="Elegir el periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="yesterday">Ayer</SelectItem>
                <SelectItem value="last7">Últimos 7 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap flex-1">
             <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
              <Label>Mostrar</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Mostrar todo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Mostrar todo</SelectItem>
                  </SelectContent>
                </Select>
             </div>
             <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
               <Label>Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Mostrar todo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Mostrar todo</SelectItem>
                  </SelectContent>
                </Select>
             </div>
          </div>
          <Button className="w-full sm:w-auto">Mostrar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
