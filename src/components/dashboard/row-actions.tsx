"use client";
import React, { useState } from "react";
import { MoreHorizontal, Pencil, Printer, BarChart, History, Trash2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/lib/types";
import { UserManagementDialog } from "./user-management-dialog";

export function RowActions({ user }: { user: User }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"deposit" | "withdraw" | null>(
    null
  );

  const handleBalanceAction = (type: "deposit" | "withdraw") => {
    setActionType(type);
    setIsDialogOpen(true);
  };

  const handleGenericAction = (actionName: string) => {
    console.log(`${actionName} for user ${user.id}`);
    // Here you would implement the logic for each action
  };


  return (
    <>
      <UserManagementDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={user}
        actionType={actionType}
      />
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
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleGenericAction('Editar')}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleGenericAction('Imprimir')}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </DropdownMenuItem>
           <DropdownMenuItem className="cursor-pointer" onClick={() => handleBalanceAction('deposit')}>
            <DollarSign className="mr-2 h-4 w-4" />
            Cambiar Balance
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleGenericAction('Ver últimas transacciones')}>
            <BarChart className="mr-2 h-4 w-4" />
            Ver últimas transacciones
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleGenericAction('Historia')}>
            <History className="mr-2 h-4 w-4" />
            Historia
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleGenericAction('Eliminar')} className="cursor-pointer text-red-600 focus:text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
