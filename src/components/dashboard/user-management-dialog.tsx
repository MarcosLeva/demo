"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  actionType: "deposit" | "withdraw" | null;
}

export function UserManagementDialog({
  isOpen,
  onClose,
  user,
  actionType,
}: Props) {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
    }
  }, [isOpen]);

  if (!user || !actionType) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Monto Inválido",
        description: "Por favor, ingrese un número positivo válido.",
        variant: "destructive",
      });
      return;
    }

    if (actionType === "withdraw" && numAmount > user.balance) {
      toast({
        title: "Fondos Insuficientes",
        description: `No se puede retirar más que el saldo actual de $${user.balance.toFixed(
          2
        )}.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Éxito!",
      description: `Se procesó con éxito un ${
        actionType === "deposit" ? "depósito" : "retiro"
      } de $${numAmount.toFixed(2)} para ${user.name}.`,
    });

    onClose();
  };

  const title =
    actionType === "deposit" ? "Realizar un Depósito" : "Realizar un Retiro";
  const description = `Ingrese el monto a ${
    actionType === "deposit" ? "depositar" : "retirar"
  } para ${user.name}. Saldo actual: ${user.balance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Monto
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Confirmar{" "}
              {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
