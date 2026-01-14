
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
import { useAuthStore } from "@/store/auth";
import { Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserDialog({ isOpen, onClose }: Props) {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currency, setCurrency] = useState("ARS");
  const [initialBalance, setInitialBalance] = useState("0");
  const [roleKey, setRoleKey] = useState("USER");
  const [parentId, setParentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { user, accessToken } = useAuthStore();

  useEffect(() => {
    if (isOpen) {
      // Reset form on open
      setUsername("");
      setFullName("");
      setEmail("");
      setPassword("");
      setCurrency("ARS");
      setInitialBalance("0");
      setRoleKey("USER");
      // Set parentId to the logged-in user's ID by default
      setParentId(user?.id || "");
      setIsLoading(false);
    }
  }, [isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !fullName || !password || !email || !parentId) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const payload = {
      username,
      fullName,
      email,
      password,
      currency,
      initialBalance: parseFloat(initialBalance) || 0,
      roleKey,
      parentId,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Error al crear el usuario');
      }

      toast({
        title: "¡Usuario Creado!",
        description: `El usuario "${fullName}" ha sido creado con éxito.`,
      });

      onClose();

    } catch (error: any) {
      toast({
        title: "Error al crear usuario",
        description: error.message || "No se pudo conectar con el servidor.",
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
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
              <Label htmlFor="username" className="text-right">
                Nombre de usuario
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-2"
                required
                disabled={isLoading}
              />
            </div>
             <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Nombre completo
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="col-span-2"
                required
                disabled={isLoading}
              />
            </div>
             <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-2"
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
             <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="roleKey" className="text-right">
                Rol
              </Label>
              <Select value={roleKey} onValueChange={setRoleKey} disabled={isLoading}>
                <SelectTrigger id="roleKey" className="col-span-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">Usuario</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="currency" className="text-right">
                Divisa
              </Label>
              <Select value={currency} onValueChange={setCurrency} disabled={isLoading}>
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
              <Label htmlFor="initialBalance" className="text-right">
                Balance Inicial
              </Label>
              <Input
                id="initialBalance"
                type="number"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                className="col-span-2"
                placeholder="0.00"
                step="0.01"
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Creando...' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
