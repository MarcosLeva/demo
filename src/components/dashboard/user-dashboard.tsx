"use client";

import React, { useState, useMemo } from "react";
import type { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UserTable } from "./user-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UserDashboard({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");

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
    
    return filtered;
  }, [users, search]);

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
        </div>
      </CardHeader>
      <CardContent>
        <UserTable users={filteredUsers} />
      </CardContent>
    </Card>
  );
}
