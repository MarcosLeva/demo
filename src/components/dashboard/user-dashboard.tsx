"use client";

import React, { useState, useMemo } from "react";
import type { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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

export function UserDashboard({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>
          Gestiona tus usuarios y sus actividades financieras.
        </CardDescription>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative w-full flex-1">
               <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Búsqueda por la tabla"
                className="pl-8 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button>Buscar</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
            <div className="flex items-center gap-2">
              <Label htmlFor="page" className="shrink-0">Página:</Label>
              <Select value={String(currentPage)} onValueChange={(val) => setCurrentPage(Number(val))}>
                <SelectTrigger id="page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <SelectItem key={page} value={String(page)}>{page}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="limit" className="shrink-0">Límites:</Label>
              <Select value={String(itemsPerPage)} onValueChange={(val) => setItemsPerPage(Number(val))}>
                <SelectTrigger id="limit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 50, 100].map(limit => (
                    <SelectItem key={limit} value={String(limit)}>{limit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="flex items-center gap-2">
              <Label htmlFor="cashier" className="shrink-0">Cajero:</Label>
              <Select>
                <SelectTrigger id="cashier">
                  <SelectValue placeholder="Todo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="flex items-center gap-2">
              <Label htmlFor="partial-cancellation" className="shrink-0">Cancelación parcial:</Label>
              <Select>
                <SelectTrigger id="partial-cancellation">
                  <SelectValue placeholder="Parte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="part">Parte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="print" />
              <Label htmlFor="print" className="font-normal">Imprimir</Label>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <UserTable 
          users={paginatedUsers} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </CardContent>
    </Card>
  );
}
