
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
import { Clock } from "lucide-react";
import { DatePicker } from "./date-picker";

export function Configurations() {
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

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
            <div className="relative">
              <Input id="from-time" type="text" placeholder="00:00:00" />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="to-time">A Hora</Label>
            <div className="relative">
              <Input id="to-time" type="text" placeholder="23:59:59" />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
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
        <div className="flex flex-col gap-4 sm:flex-row">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Mostrar todo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Mostrar todo</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Mostrar todo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Mostrar todo</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full sm:w-auto">Mostrar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
