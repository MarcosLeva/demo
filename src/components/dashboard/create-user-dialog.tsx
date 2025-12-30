
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserDialog({ isOpen, onClose }: Props) {
  const [userType, setUserType] = useState("distributor");
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [currency, setCurrency] = useState("ARS");
  const [balance, setBalance] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!isOpen) {
      // Reset form on close
      setUserType("distributor");
      setName("");
      setLogin("");
      setPassword("");
      setCurrency("ARS");
      setBalance("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !login || !password) {
      toast({
        title: "Campos requeridos",
        description: "Nombre, login y contraseña son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Handle user creation logic here
    console.log({
        userType,
        name,
        login,
        password,
        currency,
        balance,
    });

    toast({
      title: "¡Usuario Creado!",
      description: `El usuario "${name}" ha sido creado con éxito.`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            <DialogDescription>
              Complete los siguientes campos para crear un nuevo usuario.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="user-type" className="text-right">
                Tipo de usuario
              </Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger id="user-type" className="col-span-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distributor">Distributor</SelectItem>
                  <SelectItem value="player">Player</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-2"
                required
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="login" className="text-right">
                Login
              </Label>
              <Input
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="col-span-2"
                required
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-2"
                required
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="currency" className="text-right">
                Divisa
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" className="col-span-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ARS">ARS</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="balance" className="text-right">
                Balance
              </Label>
              <Input
                id="balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="col-span-2"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Crear
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
