"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-3 items-center gap-4">
        <Label className="text-right text-muted-foreground">{label}</Label>
        <div className="col-span-2 text-sm font-medium">{value}</div>
    </div>
);

const EditableField = ({ label, id, value, onChange, type = "text", placeholder }: { label: string, id:string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, placeholder?: string }) => (
    <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor={id} className="text-right">{label}</Label>
        <Input id={id} type={type} value={value} onChange={onChange} className="col-span-2" placeholder={placeholder} />
    </div>
);


export function EditUserDialog({ isOpen, onClose, user }: Props) {
  const [formData, setFormData] = useState({
    login: "",
    note: "",
    password: "",
    email: "",
    name: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        login: user.login,
        note: "",
        password: "",
        email: "", 
        name: user.name,
      });
    }
  }, [user, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    toast({
      title: "Usuario Actualizado",
      description: `Los datos de ${user.name} se han guardado correctamente.`,
    });
    onClose();
  };
  
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar el usuario: {user.id}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basics">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basics">Básicos</TabsTrigger>
              <TabsTrigger value="stamp">Sello del billete</TabsTrigger>
            </TabsList>
            <TabsContent value="basics" className="py-4">
              <div className="space-y-4">
                <ReadOnlyField label="Fecha de creación" value={format(new Date(user.createdAt), "yyyy-MM-dd HH:mm:ss")} />
                <ReadOnlyField label="ID" value={user.id} />
                <EditableField label="Login" id="login" value={formData.login} onChange={handleInputChange} />
                <EditableField label="Nota" id="note" value={formData.note} onChange={handleInputChange} placeholder="mostrar en la página de usuarios" />
                <EditableField label="Contraseña" id="password" type="password" value={formData.password} onChange={handleInputChange} />
                <ReadOnlyField label="Consigna actual" value="5153" />
                <EditableField label="Correo electrónico" id="email" type="email" value={formData.email} onChange={handleInputChange} />
                <EditableField label="Nombre" id="name" value={formData.name} onChange={handleInputChange} />
              </div>
            </TabsContent>
            <TabsContent value="stamp" className="py-4">
              <p className="text-center text-muted-foreground">
                Configuración del sello del billete no disponible.
              </p>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Cambiar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
