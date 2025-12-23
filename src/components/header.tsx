"use client";

import { Globe, Laptop, PanelLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import {
  Users,
  Landmark,
  Terminal,
  AlertTriangle,
  LogOut,
} from 'lucide-react';
import { CreateTerminalDialog } from './dashboard/create-terminal-dialog';


const navItems = [
  { href: '/', icon: Users, label: 'Panel de usuarios' },
  { href: '/balance-history', icon: Landmark, label: 'Historia de balance' },
  { href: '#', icon: Terminal, label: 'Crear terminal', id: 'create-terminal' },
  {
    href: '#',
    icon: AlertTriangle,
    label: 'Panic',
    className: 'text-destructive dark:text-red-500 hover:text-destructive/90 dark:hover:text-red-400',
  },
];

const logoutItem = { href: '#', icon: LogOut, label: 'Cerrar sesión' };

function NavContent({ onLinkClick }: { onLinkClick: (id?: string) => void }) {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-2 px-4 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={(e) => {
            if (item.id) {
              e.preventDefault();
              onLinkClick(item.id);
            }
          }}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-primary',
            pathname === item.href && !item.id &&'bg-sidebar-accent text-sidebar-primary',
            item.className,
            'cursor-pointer'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function LogoutNavContent() {
    const pathname = usePathname();
    return (
        <nav className="grid items-start gap-2 px-4 text-sm font-medium">
            <Link
                href={logoutItem.href}
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-primary',
                    pathname === logoutItem.href && 'bg-sidebar-accent text-sidebar-primary',
                    'cursor-pointer'
                )}
            >
                <logoutItem.icon className="h-4 w-4" />
                {logoutItem.label}
            </Link>
        </nav>
    );
}


export function Header() {
  const [isOnline, setIsOnline] = useState(true);
  const [isTerminalDialogOpen, setTerminalDialogOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
      setIsOnline(window.navigator.onLine);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLinkClick = (id?: string) => {
    if (id === 'create-terminal') {
      setTerminalDialogOpen(true);
    }
  };


  return (
    <>
      <CreateTerminalDialog isOpen={isTerminalDialogOpen} onClose={() => setTerminalDialogOpen(false)} />
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 sm:justify-end">
        <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Alternar Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs bg-sidebar p-0 flex flex-col">
              <div className="flex h-16 items-center justify-between border-b px-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold text-sidebar-primary"
                  >
                    <span className="">AdminView</span>
                  </Link>
                  <ThemeToggle />
                </div>
              <div className='py-2 flex-1 flex flex-col justify-between'>
                  <NavContent onLinkClick={handleLinkClick} />
                  <div className="mt-auto">
                      <LogoutNavContent />
                  </div>
              </div>
            
            </SheetContent>
          </Sheet>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Button variant="ghost" size="icon" aria-label="PC">
            <Laptop className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Planeta">
            <Globe
              className={cn("h-5 w-5 transition-colors", {
                "text-green-500": isOnline,
                "text-red-500": !isOnline,
              })}
            />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://picsum.photos/seed/user/40/40" alt="Usuario" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 text-sm">
              <div className="font-medium">Nombre Usuario</div>
              <div className="text-muted-foreground">rol</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
