
"use client";

import React, { useState, useMemo } from "react";
import type { User } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, PlusCircle, MinusCircle, MoreHorizontal, Pencil, Printer, BarChart, History, Trash2, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { UserManagementDialog } from "./user-management-dialog";
import { useRouter } from 'next/navigation';
import { PaginationControls } from "./pagination-controls";


type SortKey = keyof User;

interface UserTableProps {
  users: User[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export function UserTable({ users, currentPage, setCurrentPage, totalPages }: UserTableProps) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>({ key: "createdAt", direction: "descending" });
  
  const [selectedUserForBalance, setSelectedUserForBalance] = useState<User | null>(null);
  const [balanceAction, setBalanceAction] = useState<"deposit" | "withdraw" | null>(null);

  const handleBalanceAction = (user: User, action: "deposit" | "withdraw") => {
    setSelectedUserForBalance(user);
    setBalanceAction(action);
  };

  const handleEditAction = (user: User) => {
    router.push(`/users/${user.id}/edit`);
  };
  
  const closeBalanceDialog = () => {
    setSelectedUserForBalance(null);
    setBalanceAction(null);
  }

  const handleGenericAction = (actionName: string, userId: string) => {
    console.log(`${actionName} for user ${userId}`);
    // Here you would implement the logic for each action
  };

  const sortedUsers = useMemo(() => {
    let sortableItems = [...users];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [users, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/50" />;
    }
    return sortConfig.direction === "ascending" ? "🔼" : "🔽";
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const columns: { key: SortKey; label: string; isNumeric?: boolean }[] = [
    { key: "id", label: "ID" },
    { key: "login", label: "Login" },
    { key: "name", label: "Nombre" },
    { key: "balance", label: "Balance", isNumeric: true },
    { key: "deposits", label: "Depósitos", isNumeric: true },
    { key: "withdrawals", label: "Retiros", isNumeric: true },
    { key: "winnings", label: "Ganancias", isNumeric: true },
    { key: "game", label: "Juego" },
  ];

  return (
    <>
      <UserManagementDialog
          isOpen={!!balanceAction}
          onClose={closeBalanceDialog}
          user={selectedUserForBalance}
          actionType={balanceAction}
      />

      <div className="space-y-4">
        <div className="w-full overflow-x-auto rounded-md border-none">
          <Table>
            <TableHeader className="bg-background text-foreground">
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={col.isNumeric ? "text-right" : ""}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => requestSort(col.key)}
                      className="pl-0 hover:bg-transparent"
                    >
                      {col.label}
                      <span className="ml-2">{getSortIndicator(col.key)}</span>
                    </Button>
                  </TableHead>
                ))}
                <TableHead>Manejar Saldo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.login}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(user.balance)}
                    </TableCell>
                    <TableCell className="text-right text-green-600 dark:text-green-400">
                      {formatCurrency(user.deposits)}
                    </TableCell>
                    <TableCell className="text-right text-red-600 dark:text-red-400">
                      {formatCurrency(user.withdrawals)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={user.winnings >= 0 ? "default" : "destructive"}
                        className={
                          user.winnings > 0
                            ? "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-500/30"
                            : user.winnings < 0
                            ? "bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-500/30"
                            : ""
                        }
                      >
                        {formatCurrency(user.winnings)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.game}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" onClick={() => handleBalanceAction(user, 'deposit')}>
                            <PlusCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleBalanceAction(user, 'withdraw')}>
                            <MinusCircle className="h-4 w-4 text-red-500" />
                          </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditAction(user)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleGenericAction('Imprimir', user.id)}>
                              <Printer className="mr-2 h-4 w-4" />
                              Imprimir
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleBalanceAction(user, 'deposit')}>
                              <DollarSign className="mr-2 h-4 w-4" />
                              Cambiar Balance
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleGenericAction('Ver últimas transacciones', user.id)}>
                              <BarChart className="mr-2 h-4 w-4" />
                              Ver últimas transacciones
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleGenericAction('Historia', user.id)}>
                              <History className="mr-2 h-4 w-4" />
                              Historia
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleGenericAction('Eliminar', user.id)} className="cursor-pointer text-red-600 focus:text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 2}
                    className="h-24 text-center"
                  >
                    No se encontraron resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
