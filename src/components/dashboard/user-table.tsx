
"use client";

import React, { useState, useMemo } from "react";
import type { HierarchyUser } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, MoreHorizontal, Pencil, Printer, BarChart, History, Trash2, DollarSign, ChevronRight } from "lucide-react";
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
import { cn } from "@/lib/utils";


interface UserTableProps {
  users: HierarchyUser[];
  toggleExpand: (userId: string) => void;
}

export function UserTable({ users, toggleExpand }: UserTableProps) {
  const router = useRouter();
  
  const [selectedUserForBalance, setSelectedUserForBalance] = useState<HierarchyUser | null>(null);
  const [balanceAction, setBalanceAction] = useState<"deposit" | "withdraw" | null>(null);

  const handleBalanceAction = (user: HierarchyUser, action: "deposit" | "withdraw") => {
    setSelectedUserForBalance(user);
    setBalanceAction(action);
  };

  const handleEditAction = (user: HierarchyUser) => {
    // Assuming the edit page is still valid or needs adjustment
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

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "type", label: "Tipo" },
    { key: "balance", label: "Balance" },
    { key: "createdUsersCount", label: "Usuarios Creados" },
    { key: "totalDeposits", label: "Depósitos Totales" },
    { key: "totalWithdrawals", label: "Retiros Totales" },
    { key: "totalProfit", label: "Ganancia Total" },
    { key: "avgRtp", label: "RTP Promedio" },
  ];

  return (
    <>
      <UserManagementDialog
          isOpen={!!balanceAction}
          onClose={closeBalanceDialog}
          user={selectedUserForBalance ? { ...selectedUserForBalance, login: '', avatar: '', deposits: 0, withdrawals: 0, winnings: 0, game: '', createdAt: '' } : null}
          actionType={balanceAction}
      />

      <div className="space-y-4">
        <div className="w-full overflow-x-auto rounded-md border-none">
          <Table>
            <TableHeader className="bg-[#23303a]">
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className="text-center"
                  >
                    {col.label}
                  </TableHead>
                ))}
                <TableHead className="text-center">Manejar Saldo</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell style={{ paddingLeft: `${user.level * 2}rem` }}>
                      <div className="flex items-center gap-2">
                        {user.children && user.children.length > 0 && (
                           <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleExpand(user.id)}>
                             <ChevronRight className={cn("h-4 w-4 transition-transform", user.isExpanded && "rotate-90")} />
                           </Button>
                        )}
                        <span className={cn(!user.children || user.children.length === 0 ? "ml-8" : "")}>
                           {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{user.type}</TableCell>
                    <TableCell className="font-medium text-center">
                      {user.currency} {formatCurrency(user.balance)}
                    </TableCell>
                    <TableCell className="text-center">{user.createdUsersCount}</TableCell>
                    <TableCell className="text-green-600 dark:text-green-400 text-center">
                      {formatCurrency(user.totalDeposits)}
                    </TableCell>
                    <TableCell className="text-red-600 dark:text-red-400 text-center">
                       {formatCurrency(user.totalWithdrawals)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={user.totalProfit >= 0 ? "default" : "destructive"}
                        className={
                          user.totalProfit > 0
                            ? "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-500/30"
                            : user.totalProfit < 0
                            ? "bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-500/30"
                            : ""
                        }
                      >
                        {formatCurrency(user.totalProfit)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{user.avgRtp.toFixed(2)}%</TableCell>
                     <TableCell>
                      <div className="flex items-center justify-center gap-2">
                         <Button variant="ghost" size="icon" onClick={() => handleBalanceAction(user, 'deposit')}>
                            <PlusCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleBalanceAction(user, 'withdraw')}>
                            <MinusCircle className="h-4 w-4 text-red-500" />
                          </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer mx-auto">
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
      </div>
    </>
  );
}

