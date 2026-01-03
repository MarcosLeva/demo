
"use client";

import { useState } from "react";
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
import { Button } from "../ui/button";

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
    <Card className="bg-card/50 border-0">
      <CardHeader>
        <CardTitle>CONFIGURACIONES</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-end">
          <div className="flex items-end gap-2">
            <div className="flex flex-col gap-2 flex-1">
                <Label>De</Label>
                 <DatePicker
                  date={fromDate}
                  setDate={setFromDate}
                  className="w-full bg-input"
                />
            </div>
             <Input 
                id="from-time" 
                type="text" 
                placeholder="00:00:00" 
                value={fromTime}
                onChange={(e) => handleTimeChange(e, setFromTime)}
                maxLength={8}
                className="w-24 bg-input"
              />
          </div>
           <div className="flex items-end gap-2">
            <div className="flex flex-col gap-2 flex-1">
                <Label>A</Label>
                <DatePicker
                  date={toDate}
                  setDate={setToDate}
                  className="w-full bg-input"
                />
            </div>
             <Input 
                id="to-time" 
                type="text" 
                placeholder="23:59:59" 
                value={toTime}
                onChange={(e) => handleTimeChange(e, setToTime)}
                maxLength={8}
                className="w-24 bg-input"
              />
          </div>
          <div className="flex flex-col gap-2 col-start-5">
            <Label htmlFor="period">Elegir el periodo</Label>
            <Select>
              <SelectTrigger id="period" className="bg-input">
                <SelectValue placeholder="Elegir el periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today" className="cursor-pointer">Hoy</SelectItem>
                <SelectItem value="yesterday" className="cursor-pointer">Ayer</SelectItem>
                <SelectItem value="this_week" className="cursor-pointer">Esta semana</SelectItem>
                <SelectItem value="this_month" className="cursor-pointer">Este mes</SelectItem>
                <SelectItem value="last_month" className="cursor-pointer">Mes anterior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
             <div className="flex flex-col gap-2">
               <Label>Mostrar todo</Label>
                <Select>
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Mostrar todo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">Mostrar todo</SelectItem>
                  </SelectContent>
                </Select>
             </div>
              <div className="flex flex-col gap-2">
               <Label>Esconder a los usuarios inactivos</Label>
                <Select>
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Esconder a los usuarios inactivos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">Si</SelectItem>
                  </SelectContent>
                </Select>
             </div>
             <div className="flex flex-col gap-2">
               <Label>Total Entrada/Salida</Label>
                <Select>
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Total Entrada/Salida" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">Mostrar todo</SelectItem>
                  </SelectContent>
                </Select>
             </div>
             <div className="flex flex-col gap-2">
               <Label>Moneda</Label>
                <Select>
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">UYU</SelectItem>
                  </SelectContent>
                </Select>
             </div>
            <div className="flex items-end">
                 <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Mostrar</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
