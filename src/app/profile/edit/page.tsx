
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/store/auth';
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const FormRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 py-3">
      <Label className="md:text-right text-muted-foreground">{label}</Label>
      <div className="md:col-span-2">{children}</div>
    </div>
  );

export default function EditProfilePage() {
  const { email } = useAuthStore();
  const [formData, setFormData] = useState({
    language: 'es',
    timezone: 'gmt-3',
    phone: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    doubleAuth: false,
    loadMainPage: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

   const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Add toast notification for success
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
       <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/dashboard"><Home className="h-4 w-4" /></Link>
        <ChevronRight className="h-4 w-4" />
        <span>Editar el usuario</span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{email}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Tabs defaultValue="basics">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="basics">Básicos</TabsTrigger>
                <TabsTrigger value="game_settings">Configuración del juego</TabsTrigger>
              </TabsList>
              <TabsContent value="basics" className="pt-6">
                <div className="space-y-4 max-w-xl">
                   <FormRow label="Login">
                      <p className="font-medium">{email}</p>
                   </FormRow>
                   <FormRow label="Idioma preferido">
                        <Select value={formData.language} onValueChange={handleSelectChange('language')}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                        </Select>
                   </FormRow>
                   <FormRow label="Zona horaria">
                        <Select value={formData.timezone} onValueChange={handleSelectChange('timezone')}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gmt-3">(-03:00) America/Argentina/Buenos_Aires</SelectItem>
                                <SelectItem value="gmt-5">(-05:00) America/New_York</SelectItem>
                            </SelectContent>
                        </Select>
                   </FormRow>
                    <FormRow label="Doble autorización">
                        <Checkbox 
                            id="doubleAuth"
                            name="doubleAuth"
                            checked={formData.doubleAuth}
                            onCheckedChange={(checked) => setFormData(prev => ({...prev, doubleAuth: !!checked}))}
                        />
                   </FormRow>
                   <FormRow label="Teléfono">
                        <Input 
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                   </FormRow>
                   <FormRow label="Cargar la página principal inmediatamente">
                        <Checkbox 
                            id="loadMainPage"
                            name="loadMainPage"
                            checked={formData.loadMainPage}
                            onCheckedChange={(checked) => setFormData(prev => ({...prev, loadMainPage: !!checked}))}
                        />
                   </FormRow>

                   <div className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Cambiar contraseña</h3>
                     <FormRow label="Contraseña anterior">
                        <Input 
                            id="oldPassword"
                            name="oldPassword"
                            type="password"
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                        />
                     </FormRow>
                      <FormRow label="Contraseña nueva">
                        <Input 
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                        />
                     </FormRow>
                      <FormRow label="Confirmar la contraseña nueva">
                        <Input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                     </FormRow>
                   </div>
                </div>
              </TabsContent>
              <TabsContent value="game_settings" className="pt-6">
                 <p className="text-center text-muted-foreground">
                  Configuración del juego no disponible.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="mt-6 flex justify-start">
            <Button type="submit" style={{backgroundColor: '#28a745', color: 'white'}}>Cambiar</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}

