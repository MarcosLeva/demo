"use client";
import React, { useState } from "react";
import { MoreHorizontal, PlusCircle, MinusCircle } from "lucide-react";
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

  const handleAction = (type: "deposit" | "withdraw") => {
    setActionType(type);
    setIsDialogOpen(true);
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
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction("deposit")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Depositar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("withdraw")}>
            <MinusCircle className="mr-2 h-4 w-4" />
            Retirar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
