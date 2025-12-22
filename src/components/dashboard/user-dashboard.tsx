"use client";

import React, { useState, useMemo } from "react";
import type { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import { UserTable } from "./user-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "./date-range-picker";
import { Button } from "../ui/button";
import { type DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export function UserDashboard({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exportación Iniciada",
      description: "Tus datos se están preparando para la exportación.",
    });
    // In a real app, you would trigger a download here.
  };

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (search) {
      const lowercasedSearch = search.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(lowercasedSearch) ||
          user.login.toLowerCase().includes(lowercasedSearch) ||
          user.id.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Date filtering logic can be added here if needed
    
    return filtered;
  }, [users, search, date]);

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>
          Gestiona tus usuarios y sus actividades financieras.
        </CardDescription>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nombre, login o ID..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
      </CardHeader>
      <CardContent>
        <UserTable users={filteredUsers} />
      </CardContent>
    </Card>
  );
}
