"use client";

import React, { useState, useMemo } from "react";
import type { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { DateRangePicker } from "./date-range-picker";
import { UserTable } from "./user-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function UserDashboard({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const { toast } = useToast();

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

    if (date?.from) {
      filtered = filtered.filter((user) => {
        const userDate = new Date(user.createdAt);
        return userDate >= date.from!;
      });
    }
    if (date?.to) {
        filtered = filtered.filter((user) => {
            const userDate = new Date(user.createdAt);
            // Add one day to the end date to make it inclusive
            const inclusiveToDate = new Date(date.to!);
            inclusiveToDate.setDate(inclusiveToDate.getDate() + 1);
            return userDate < inclusiveToDate;
        });
    }

    return filtered;
  }, [users, search, date]);

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your data is being prepared for export.",
    });
    // In a real app, you would trigger a download here.
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage your users and their financial activities.
        </CardDescription>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, login, or ID..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <DateRangePicker date={date} setDate={setDate} />
            <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export
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
