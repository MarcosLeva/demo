
"use client";

import React, { useState, useMemo, useEffect } from "react";
import type { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { UserTable } from "./user-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CreateUserDialog } from "./create-user-dialog";
import { TableSkeleton } from "./table-skeleton";

export function UserDashboard({ users }: { users: User[] }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUserDialogOpen, setUserDialogOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
  
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  return (
    <>
      <CreateUserDialog isOpen={isUserDialogOpen} onClose={() => setUserDialogOpen(false)} />
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>USUARIOS</CardTitle>
            </div>
             <div className="flex items-center gap-2 justify-start">
                <Input
                    type="search"
                    placeholder="Búsqueda por la tabla"
                    className="pl-8 w-full bg-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button className="bg-green-600 hover:bg-green-700 text-white">Buscar</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
             <TableSkeleton columns={10} rows={itemsPerPage} />
          ) : (
            <UserTable 
              users={paginatedUsers} 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
