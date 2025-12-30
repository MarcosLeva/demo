
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
import { Home, ChevronRight, Settings, Gamepad2, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const currencies = ["ARS", "BRL", "CLP", "DOP", "EUR", "MXN", "PEN", "USD", "UYU", "VEF"];

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
                    <TabsTrigger value="basics">
                        <Settings className="mr-2 h-4 w-4" />
                        Información General
                    </TabsTrigger>
                    <TabsTrigger value="game_settings">
                        <Gamepad2 className="mr-2 h-4 w-4" />
                        Configuración del juego
                    </TabsTrigger>
                </TabsList>
                
                <TabsContent value="basics">
                    <div className="space-y-6">
                        <div className="space-y-2">
                           <Label>Login</Label>
                           <p className="font-medium text-sm text-muted-foreground">{email}</p>
                        </div>
                        
                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="language">Idioma preferido</Label>
                                <Select value={formData.language} onValueChange={handleSelectChange('language')}>
                                    <SelectTrigger id="language">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="es">Español</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Zona horaria</Label>
                                <Select value={formData.timezone} onValueChange={handleSelectChange('timezone')}>
                                    <SelectTrigger id="timezone">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gmt-3">(-03:00) America/Argentina/Buenos_Aires</SelectItem>
                                        <SelectItem value="gmt-5">(-05:00) America/New_York</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input 
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder='+54 9 11 1234-5678'
                            />
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Seguridad</h3>
                             <div className="space-y-2">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                  <div>
                                    <Label htmlFor="doubleAuth" className="font-semibold">Autenticación de dos factores</Label>
                                    <p className='text-xs text-muted-foreground pt-1'>Asegura tu cuenta con un paso de verificación adicional.</p>
                                  </div>
                                     <Switch 
                                        id="doubleAuth"
                                        checked={formData.doubleAuth}
                                        onCheckedChange={(checked) => setFormData(prev => ({...prev, doubleAuth: !!checked}))}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Cambiar contraseña</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="oldPassword">Contraseña anterior</Label>
                                        <Input 
                                            id="oldPassword"
                                            name="oldPassword"
                                            type="password"
                                            value={formData.oldPassword}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                         <Label htmlFor="newPassword">Contraseña nueva</Label>
                                        <Input 
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                               <div className="space-y-2">
                                     <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                                    <Input 
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                               </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="game_settings" className="pt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Conectar a jugadores de póker en este nivel</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label htmlFor="poker-active" className="font-semibold">Activo</Label>
                                    <p className='text-xs text-muted-foreground pt-1'>Habilita la conexión para jugadores de póker.</p>
                                </div>
                                <Switch id="poker-active" />
                            </div>

                            <div>
                               <h4 className="text-base font-semibold mb-4">Configuración por Divisa</h4>
                               <Accordion type="multiple" className="w-full">
                                   {currencies.map(currency => (
                                    <AccordionItem key={currency} value={currency}>
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                                                <span>{currency}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="p-4 bg-muted/50 rounded-md space-y-4">
                                                <p className="text-sm text-muted-foreground">
                                                    Aquí puedes configurar las opciones específicas para la divisa {currency}.
                                                </p>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id={`${currency}-option1`} />
                                                    <label
                                                        htmlFor={`${currency}-option1`}
                                                        className="text-sm font-medium leading-none"
                                                    >
                                                        Habilitar opción 1
                                                    </label>
                                                </div>
                                                 <div className="flex items-center space-x-2">
                                                    <Checkbox id={`${currency}-option2`} />
                                                    <label
                                                        htmlFor={`${currency}-option2`}
                                                        className="text-sm font-medium leading-none"
                                                    >
                                                        Habilitar opción 2
                                                    </label>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                   ))}
                                </Accordion>
                            </div>
                        </CardContent>
                    </Card>
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

    