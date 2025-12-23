'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/types';
import { users } from '@/lib/data'; // Mock data
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import Link from 'next/link';

const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-3 items-center gap-4">
    <Label className="text-right text-muted-foreground">{label}</Label>
    <div className="col-span-2 text-sm font-medium">{value}</div>
  </div>
);

const EditableField = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div className="grid grid-cols-3 items-center gap-4">
    <Label htmlFor={id} className="text-right">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="col-span-2"
      placeholder={placeholder}
    />
  </div>
);

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    login: '',
    note: '',
    password: '',
    email: '',
    name: '',
  });

  useEffect(() => {
    // In a real app, you'd fetch the user data from an API
    const userToEdit = users.find((u) => u.id === id);
    if (userToEdit) {
      setUser(userToEdit);
      setFormData({
        login: userToEdit.login,
        note: '', // Assuming note is not part of the initial user data
        password: '', // Password should be empty for security
        email: '', // Assuming email is not part of the initial user data
        name: userToEdit.name,
      });
    } else {
      // Handle user not found, maybe redirect or show an error
      toast({
        title: 'Error',
        description: 'Usuario no encontrado.',
        variant: 'destructive',
      });
      router.push('/');
    }
  }, [id, router, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // Here you would typically send the updated data to your backend API
    console.log('Updating user:', user.id, formData);

    toast({
      title: 'Usuario Actualizado',
      description: `Los datos de ${user.name} se han guardado correctamente.`,
    });
    router.push('/'); // Redirect back to the user list
  };

  if (!user) {
    return (
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <p>Cargando usuario...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Editar el usuario: {user.id}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Tabs defaultValue="basics">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basics">Básicos</TabsTrigger>
                <TabsTrigger value="stamp">Sello del billete</TabsTrigger>
              </TabsList>
              <TabsContent value="basics" className="py-4">
                <div className="space-y-4">
                  <ReadOnlyField
                    label="Fecha de creación"
                    value={format(new Date(user.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                  />
                  <ReadOnlyField label="ID" value={user.id} />
                  <EditableField
                    label="Login"
                    id="login"
                    value={formData.login}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    label="Nota"
                    id="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="mostrar en la página de usuarios"
                  />
                  <EditableField
                    label="Contraseña"
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <ReadOnlyField label="Consigna actual" value="5153" />
                  <EditableField
                    label="Correo electrónico"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    label="Nombre"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </TabsContent>
              <TabsContent value="stamp" className="py-4">
                <p className="text-center text-muted-foreground">
                  Configuración del sello del billete no disponible.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" asChild>
                <Link href="/">Cancelar</Link>
            </Button>
            <Button type="submit">Cambiar</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
