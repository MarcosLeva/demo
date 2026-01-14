
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/store/auth';
import { Home, ChevronRight, Settings, Gamepad2, CreditCard, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Checkbox } from '@/components/ui/checkbox';


const currencies = ["ARS", "USD", "UYU"];

const FormRow = ({ label, children, subLabel }: { label: string; children: React.ReactNode, subLabel?: string }) => (
    <div className="grid grid-cols-2 items-center gap-4">
        <div className='flex flex-col'>
            <Label className="text-sm">{label}</Label>
            {subLabel && <p className="text-xs text-muted-foreground">{subLabel}</p>}
        </div>
        {children}
    </div>
);

const ReadOnlyField = ({ label, value }: { label: string; value: string | null | undefined }) => (
    <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">{label}</Label>
        <p className="font-medium text-sm">{value || 'No disponible'}</p>
    </div>
);


export default function EditProfilePage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'basics';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { accessToken, username } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    language: 'es',
    timezone: 'gmt-3',
    phone: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    role: '',
    createdAt: ''
  });

  const fetchProfile = useCallback(async () => {
    if (!accessToken) {
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        
        setFormData(prev => ({
            ...prev,
            username: data.username || '',
            fullName: data.fullName || '',
            phone: data.phoneE164 || '',
            language: data.language || 'es',
            timezone: data.timezone || 'gmt-3',
            twoFactorEnabled: data.twoFactorEnabled || false,
            role: data.roles?.[0]?.role?.name || 'N/A',
            createdAt: data.createdAt ? format(new Date(data.createdAt), "dd 'de' MMMM, yyyy", { locale: es }) : 'N/A',
        }));

    } catch (error) {
        toast({
            title: 'Error al cargar perfil',
            description: 'No se pudieron obtener los datos de tu perfil.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  }, [accessToken, toast]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);


  useEffect(() => {
    const tab = searchParams.get('tab') || 'basics';
    setActiveTab(tab);
  }, [searchParams]);

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
    setIsSubmitting(true);
    // Here you would add the logic to submit the form data to the API
    console.log('Form data submitted:', formData);

    setTimeout(() => {
        toast({
            title: "Perfil actualizado",
            description: "Tus cambios han sido guardados con éxito.",
        });
        setIsSubmitting(false);
    }, 1000);
  };
  
  const ProfileSkeleton = () => (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-6 w-1/2" />
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
         <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
        </div>
        <Separator />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-12 w-full" />
      </div>
  );

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
       <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/dashboard"><Home className="h-4 w-4" /></Link>
        <ChevronRight className="h-4 w-4" />
        <span>Editar Perfil</span>
      </div>
      <form onSubmit={handleSubmit}>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Configuración de la cuenta</CardTitle>
            <CardDescription>Gestiona los detalles de tu perfil y la configuración de seguridad.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="basics">
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
                    {isLoading ? <ProfileSkeleton /> : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <ReadOnlyField label="Nombre de usuario" value={formData.username} />
                                <ReadOnlyField label="Nombre Completo" value={formData.fullName} />
                                <ReadOnlyField label="Rol" value={formData.role} />
                                <ReadOnlyField label="Miembro desde" value={formData.createdAt} />
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
                                        <Label htmlFor="twoFactorEnabled" className="font-semibold">Autenticación de dos factores</Label>
                                        <p className='text-xs text-muted-foreground pt-1'>Asegura tu cuenta con un paso de verificación adicional.</p>
                                    </div>
                                        <Switch 
                                            id="twoFactorEnabled"
                                            checked={formData.twoFactorEnabled}
                                            onCheckedChange={(checked) => setFormData(prev => ({...prev, twoFactorEnabled: !!checked}))}
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
                    )}
                </TabsContent>

                <TabsContent value="game_settings" className="pt-6">
                    <Card>
                        <CardContent className="space-y-6 pt-6">
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="poker-connect" className="font-semibold">Conectar a jugadores de póker en este nivel</Label>
                                <Switch id="poker-connect" />
                             </div>
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label htmlFor="poker-active" className="font-semibold">Activo</Label>
                                </div>
                                <Switch id="poker-active" defaultChecked />
                            </div>

                            <div>
                               <Accordion type="multiple" className="w-full">
                                   {currencies.map(currency => (
                                    <AccordionItem key={currency} value={currency}>
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-lg">{currency}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="p-4 bg-muted/20 rounded-md space-y-6">
                                                
                                                <div className="space-y-4">
                                                    <h4 className='font-semibold'>Configuración general</h4>
                                                    <FormRow label="RTP">
                                                        <Select defaultValue="95">
                                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="95">95</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormRow>
                                                    <FormRow label="Tasa mínima"><Input type="number" defaultValue="0.01" /></FormRow>
                                                    <FormRow label="Apuesta total máxima"><Input type="number" defaultValue="10000.00" /></FormRow>
                                                    <FormRow label="Demo equilibrar"><Input type="number" defaultValue="0" /></FormRow>
                                                </div>

                                                <Separator />

                                                <div className='space-y-4'>
                                                    <h4 className='font-semibold'>Games System</h4>
                                                    <FormRow label="la pantalla" subLabel='La sala'>
                                                         <Select defaultValue="3x4">
                                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="3x4">3x4</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormRow>
                                                    <FormRow label="EGT JACKPOT">
                                                        <div className="flex items-center h-full">
                                                          <Checkbox />
                                                        </div>
                                                    </FormRow>
                                                </div>
                                                
                                                <Separator />

                                                <div className='space-y-4'>
                                                    <h4 className='font-semibold'>Tragamonedas</h4>
                                                    <FormRow label="Denominación" subLabel='Igrosoft, American Poker II'>
                                                         <Select defaultValue="0.01">
                                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="0.01">0.01</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormRow>
                                                    <FormRow label="Denominación" subLabel='Aristocrat, Novomatic, Merkur'>
                                                         <Select defaultValue="true">
                                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="true">true</SelectItem>
                                                                <SelectItem value="false">false</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormRow>
                                                    <FormRow label="Novomatic (menos 5 líneas)">
                                                        <div className="flex items-center h-full">
                                                          <Checkbox />
                                                        </div>
                                                    </FormRow>
                                                </div>

                                                <Separator />

                                                <div className='space-y-4'>
                                                    <h4 className='font-semibold'>ImperiumBet</h4>
                                                    <FormRow label="Tasa mínima"><Input type="number" defaultValue="0.10" /></FormRow>
                                                    <FormRow label="Apuesta total máxima"><Input type="number" defaultValue="50.00" /></FormRow>
                                                    <FormRow label="Solo una apuesta por evento">
                                                        <div className="flex items-center h-full">
                                                          <Checkbox />
                                                        </div>
                                                    </FormRow>
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
            <Button type="submit" disabled={isSubmitting || isLoading}>
                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
