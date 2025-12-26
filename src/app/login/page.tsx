
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth';

const AsteriskIcon = () => (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 4L36.2865 27.7135L56 20L44 32L56 44L36.2865 36.2865L32 60L27.7135 36.2865L8 44L20 32L8 20L27.7135 27.7135L32 4Z"
        fill="white"
      />
    </svg>
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
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-8 xl:p-12 bg-[#2a2d64] text-white" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\' patternTransform=\'rotate(45)\'%3E%3Cpath d=\'M50 0V100M0 50H100\' stroke=\'%23343884\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23p)\'/%3E%3C/svg%3E")'}}>
        <div>
          <AsteriskIcon />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            Hello AdminView! <span role="img" aria-label="waving hand">👋</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Gestiona tus usuarios y operaciones de forma rápida y segura.
            Optimiza tu flujo de trabajo con nuestra interfaz intuitiva.
          </p>
        </div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} AdminView. Todos los derechos reservados.
        </p>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <div className="text-left">
                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-200">AdminView</h2>
            </div>
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="#" className="font-medium text-primary hover:text-primary/90">
                  Create a new account now
                </Link>
              </p>
            </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2 pt-4">
                 <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="bg-gray-50 border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
                <div className="text-sm">
                    <Link href="#" className="font-medium text-primary hover:text-primary/90">
                        Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>

            <div>
              <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200">
                Acceder
              </Button>
            </div>
             <div>
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
