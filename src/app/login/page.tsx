
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
import { SunMoon } from 'lucide-react';
import Image from 'next/image';

const AsteriskIcon = () => (
  <Image src="/logo.png" alt="463 Logo" width={64} height={64} />
);

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-.97 2.53-1.94 3.32v2.78h3.57c2.08-1.92 3.28-4.74 3.28-8.11z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.78c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
);


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
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="hidden lg:flex flex-col justify-between p-8 xl:p-12 bg-primary text-primary-foreground">
        <div>
          <AsteriskIcon />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            ¡Hola AdminView! <span role="img" aria-label="waving hand">👋</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Gestiona tus usuarios y operaciones de forma rápida y segura.
            Optimiza tu flujo de trabajo con nuestra interfaz intuitiva.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} AdminView. Todos los derechos reservados.
        </p>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md space-y-8">
            <div className="text-left">
                <h2 className="text-sm font-bold text-foreground">AdminView</h2>
            </div>
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
                ¡Bienvenido de vuelta!
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                ¿No tienes una cuenta?{' '}
                <Link href="#" className="font-medium text-primary hover:text-primary/90">
                  Crea una cuenta nueva ahora
                </Link>
              </p>
            </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                 <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="bg-muted/50 border-border"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
                <div className="text-sm">
                    <Link href="#" className="font-medium text-primary hover:text-primary/90">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>

            <div className="space-y-4">
              <Button type="submit" className="w-full">
                Acceder
              </Button>
              <Button variant="outline" className="w-full">
                <GoogleIcon />
                 Acceder con Google
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
