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
        title: "Invalid Amount",
        description: "Please enter a valid positive number.",
        variant: "destructive",
      });
      return;
    }

    if (actionType === "withdraw" && numAmount > user.balance) {
      toast({
        title: "Insufficient Funds",
        description: `Cannot withdraw more than the current balance of $${user.balance.toFixed(
          2
        )}.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: `Successfully processed ${actionType} of $${numAmount.toFixed(
        2
      )} for ${user.name}.`,
    });

    onClose();
  };

  const title =
    actionType === "deposit" ? "Make a Deposit" : "Make a Withdrawal";
  const description = `Enter the amount to ${actionType} for ${
    user.name
  }. Current balance: $${user.balance.toLocaleString("en-US", {
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
                Amount
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
              Cancel
            </Button>
            <Button type="submit">
              Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
