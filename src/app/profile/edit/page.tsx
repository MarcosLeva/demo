
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/store/auth';
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const FormRow = ({ label, children, description }: { label: string; children: React.ReactNode; description?: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-2 md:gap-4 py-4">
      <div className='md:text-right'>
        <Label>{label}</Label>
      </div>
      <div className="md:col-span-2">
        {children}
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </div>
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
        <span>Editar Perfil</span>
      </div>
      <form onSubmit={handleSubmit}>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Configuración de la cuenta</CardTitle>
            <CardDescription>Gestiona los detalles de tu perfil y la configuración de seguridad.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basics">
                <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
                    <TabsTrigger value="basics">Información General</TabsTrigger>
                    <TabsTrigger value="game_settings">Configuración del juego</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basics">
                    <div className="space-y-2">
                        <FormRow label="Login">
                            <p className="font-medium pt-2">{email}</p>
                        </FormRow>

                        <Separator />

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

                        <Separator />

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
                        
                        <Separator />

                        <FormRow label="Teléfono">
                            <Input 
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder='+54 9 11 1234-5678'
                            />
                        </FormRow>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">Seguridad</h3>
                        <div className="space-y-2">
                             <FormRow label="Autenticación de dos factores">
                                <div className="flex items-center space-x-2 pt-2">
                                     <Checkbox 
                                        id="doubleAuth"
                                        name="doubleAuth"
                                        checked={formData.doubleAuth}
                                        onCheckedChange={(checked) => setFormData(prev => ({...prev, doubleAuth: !!checked}))}
                                    />
                                    <label htmlFor="doubleAuth" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Habilitar
                                    </label>
                                </div>
                            </FormRow>
                            
                            <Separator />

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
                                <Separator />
                                <FormRow label="Contraseña nueva">
                                    <Input 
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                    />
                                </FormRow>
                                <Separator />
                                <FormRow label="Confirmar contraseña">
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
                    </div>
                </TabsContent>

                <TabsContent value="game_settings" className="pt-6">
                    <p className="text-center text-muted-foreground">
                    Configuración del juego no disponible.
                    </p>
                </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="mt-6 flex justify-end">
            <Button type="submit">Guardar Cambios</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
