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
import { ArrowUpDown, PlusCircle, MinusCircle } from "lucide-react";
import { RowActions } from "./row-actions";
import { Badge } from "@/components/ui/badge";
import { UserManagementDialog } from "./user-management-dialog";
import { EditUserDialog } from "./edit-user-dialog";


type SortKey = keyof User;

interface UserTableProps {
  users: User[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export function UserTable({ users, currentPage, setCurrentPage, totalPages }: UserTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>({ key: "createdAt", direction: "descending" });
  
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [balanceActionType, setBalanceActionType] = useState<"deposit" | "withdraw" | null>(null);

  const handleBalanceAction = (user: User, type: "deposit" | "withdraw") => {
    setSelectedUser(user);
    setBalanceActionType(type);
    setIsBalanceDialogOpen(true);
  };
  
  const handleEditAction = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  }

  const closeDialogs = () => {
    setIsBalanceDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  }

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
      {selectedUser && (
        <>
            <UserManagementDialog
                isOpen={isBalanceDialogOpen}
                onClose={closeDialogs}
                user={selectedUser}
                actionType={balanceActionType}
            />
            <EditUserDialog
                isOpen={isEditDialogOpen}
                onClose={closeDialogs}
                user={selectedUser}
            />
        </>
      )}

      <div className="space-y-4">
        <div className="w-full overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={col.isNumeric ? "text-right" : ""}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => requestSort(col.key)}
                      className="pl-0"
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
                      <RowActions 
                        user={user} 
                        onEdit={handleEditAction}
                        onBalanceAction={handleBalanceAction}
                        />
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
        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
