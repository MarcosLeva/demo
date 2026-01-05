
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth';
import { ThemeToggle } from '@/components/theme-toggle';
import { SunMoon, User, Lock } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  useEffect(() => {
    const firstVisit = localStorage.getItem('hasVisited');
    if (!firstVisit) {
      toast({
        title: '¡Bienvenido!',
        description: (
          <div className="flex items-center gap-2">
            <SunMoon className="h-5 w-5" />
            <span>Puedes cambiar el tema (claro/oscuro) con el botón de la esquina.</span>
          </div>
        ),
        duration: 5000,
      });
      localStorage.setItem('hasVisited', 'true');
    }
  }, [toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      login(email);
      
      toast({
        title: 'Inicio de sesión exitoso',
        description: 'Bienvenido de nuevo.',
      });
      router.push('/dashboard');
    } else {
      toast({
        title: 'Error de inicio de sesión',
        description: 'Por favor, ingrese su correo y contraseña.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen login-gradient">
      <main className="flex flex-1 items-center justify-center py-12">
        <Card className="w-full max-w-sm mx-4 relative">
          <div className='absolute top-4 right-4'>
            <ThemeToggle />
          </div>
          <CardHeader className="items-center pt-8 pb-4">
            <Image src="/logo.png" alt="463 Logo" width={150} height={37} className="mb-4" />
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Ingresar usuario
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                   <Lock className="h-4 w-4 text-muted-foreground" />
                  Ingresar password
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
               <div className="flex items-center">
                 <Link
                    href="#"
                    className="ml-auto inline-block text-sm text-primary hover:underline"
                  >
                    Recuperar contraseña
                  </Link>
               </div>
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
          </CardFooter>
        </Card>
      </main>

      <footer className="w-full p-4 text-center text-xs text-white/70">
        © 2024 AdminView. Todos los derechos reservados.
      </footer>
    </div>
  );
}
