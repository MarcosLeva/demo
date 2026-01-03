
'use client';

import { Globe, Laptop, PanelLeft, UserCog, UserPlus, BarChartHorizontal, PieChart, History, Shuffle } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users,
  Landmark,
  Terminal,
  AlertTriangle,
  LogOut,
  Home,
} from 'lucide-react';
import { CreateTerminalDialog } from './dashboard/create-terminal-dialog';
import { useAuthStore } from '@/store/auth';
import { CreateUserDialog } from './dashboard/create-user-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Image from 'next/image';

const navItems = [
  { href: '/dashboard', icon: Users, label: 'Panel de usuarios' },
  { href: '/balance-history', icon: Landmark, label: 'Historia de balance' },
  { href: '/provider-statistics', icon: BarChartHorizontal, label: 'Estadísticas de proveedores' },
  { href: '/statistics', icon: PieChart, label: 'Estadísticas' },
  { href: '/changes', icon: History, label: 'Changes' },
  { href: '/intersection-ip', icon: Shuffle, label: 'Intersection IP' },
  { href: '/profile/edit', icon: UserCog, label: 'Editar mi usuario' },
  { href: '#', icon: UserPlus, label: 'Crear usuario', id: 'create-user' },
  { href: '#', icon: Terminal, label: 'Crear terminal', id: 'create-terminal' },
  {
    href: '#',
    icon: AlertTriangle,
    label: 'Panic',
    className: 'text-destructive dark:text-red-500 hover:text-destructive/90 dark:hover:text-red-400',
  },
];

const logoutItem = { href: '/login', icon: LogOut, label: 'Cerrar sesión' };

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
    const router = useRouter();
    const { logout } = useAuthStore();

    const handleLogout = (e: React.MouseEvent) => {
      e.preventDefault();
      logout();
      router.push(logoutItem.href);
    };

    return (
        <nav className="grid items-start gap-2 px-4 text-sm font-medium">
            <a
                href={logoutItem.href}
                onClick={handleLogout}
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-primary',
                    'cursor-pointer'
                )}
            >
                <logoutItem.icon className="h-4 w-4" />
                {logoutItem.label}
            </a>
        </nav>
    );
}

const CheckedLaptopIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.28 20H3.72a1 1 0 0 1-.9-1.45L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m9 11 2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export function Header() {
  const [isOnline, setIsOnline] = useState(true);
  const [isTerminalDialogOpen, setTerminalDialogOpen] = useState(false);
  const [isUserDialogOpen, setUserDialogOpen] = useState(false);
  const { email } = useAuthStore();

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
    if (id === 'create-user') {
      setUserDialogOpen(true);
    }
  };


  return (
    <>
      <CreateTerminalDialog isOpen={isTerminalDialogOpen} onClose={() => setTerminalDialogOpen(false)} />
      <CreateUserDialog isOpen={isUserDialogOpen} onClose={() => setUserDialogOpen(false)} />
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-sidebar px-4 backdrop-blur-sm sm:px-6">
        <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Alternar Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs bg-sidebar p-0 flex flex-col">
              <div className="flex h-16 items-center justify-center border-b px-6">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 font-semibold text-sidebar-primary"
                  >
                     <Image src="/logo.png" alt="463 Logo" width={150} height={37} />
                  </Link>
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
            <CheckedLaptopIcon />
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
            <div className="grid gap-0.5 text-sm text-right">
              <div className="font-medium">{email} | 207000145.00</div>
            </div>
            <Select defaultValue="UYU">
                <SelectTrigger className="w-auto h-8 text-xs border-border/80 bg-background/50 rounded-md">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ARS">ARS</SelectItem>
                    <SelectItem value="UYU">UYU</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>
      </header>
    </>
  );
}
