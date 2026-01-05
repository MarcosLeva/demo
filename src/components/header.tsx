
'use client';

import { Globe, Laptop, PanelLeft, UserCog, UserPlus, BarChartHorizontal, PieChart, History, Shuffle, ChevronsLeft, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Users,
  Landmark,
  Terminal,
  AlertTriangle,
  LogOut,
  Home,
  FilePen,
  Repeat,
  Wallet
} from 'lucide-react';
import { CreateTerminalDialog } from './dashboard/create-terminal-dialog';
import { useAuthStore } from '@/store/auth';
import { CreateUserDialog } from './dashboard/create-user-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Image from 'next/image';
import { Input } from './ui/input';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'USUARIOS' },
  { href: '/profile/edit', icon: FilePen, label: 'EDITAR', id: 'edit-profile' },
  { href: '/balance-history', icon: Repeat, label: 'ÚLTIMAS TRANSACCIONES' },
  { href: '#', icon: UserPlus, label: 'CREAR UN USUARIO', id: 'create-user' },
  { href: '/provider-statistics', icon: BarChartHorizontal, label: 'ESTADÍSTICAS DE PROVEEDORES' },
  { href: '/statistics', icon: PieChart, label: 'ESTADÍSTICAS' },
  { href: '/profile/edit?tab=game_settings', icon: Wallet, label: 'CONFIGURACIÓN DEL JUEGO', id: 'game-settings' },
  { href: '/changes', icon: History, label: 'CHANGES' },
  { href: '/intersection-ip', icon: Shuffle, label: 'INTERSECTION IP' },
];

const logoutItem = { href: '/login', icon: LogOut, label: 'SALIR' };


function NavContent({ onLinkClick }: { onLinkClick: (id?: string) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string, id?: string) => {
    const tab = searchParams.get('tab');
    if (id === 'edit-profile') {
      return pathname === href && !tab;
    }
    if (id === 'game-settings') {
      return pathname === '/profile/edit' && tab === 'game_settings';
    }
    return pathname === href;
  }


  return (
    <nav className="grid items-start gap-1 px-2 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={(e) => {
            if (item.id === 'create-user') {
              e.preventDefault();
              onLinkClick(item.id);
            }
          }}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-primary',
            isActive(item.href, item.id) && 'bg-sidebar-accent text-sidebar-primary',
            'cursor-pointer text-xs'
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
        <nav className="grid items-start gap-1 px-2 text-sm font-medium">
            <a
                href={logoutItem.href}
                onClick={handleLogout}
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-primary',
                    'cursor-pointer text-xs'
                )}
            >
                <logoutItem.icon className="h-4 w-4" />
                SALIR
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


export function Header({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isTerminalDialogOpen, setTerminalDialogOpen] = useState(false);
  const [isUserDialogOpen, setUserDialogOpen] = useState(false);
  const { email } = useAuthStore();
  const [sheetOpen, setSheetOpen] = useState(false);

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
    setSheetOpen(false);
  };


  return (
    <>
      <CreateTerminalDialog isOpen={isTerminalDialogOpen} onClose={() => setTerminalDialogOpen(false)} />
      <CreateUserDialog isOpen={isUserDialogOpen} onClose={() => setUserDialogOpen(false)} />
      <header className={cn("sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-sidebar px-4 backdrop-blur-sm sm:px-6", isSidebarCollapsed ? 'sm:pl-24' : 'sm:pl-72')}>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                    className="flex items-center gap-2 font-semibold"
                  >
                     <Image src="/logo.png" alt="463 Logo" width={150} height={37} />
                  </Link>
                </div>
              <div className='py-4 space-y-4 flex-1 flex flex-col'>
                  <div className="relative px-4">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Búsqueda del usuario" className="bg-input pl-8"/>
                  </div>
                  <NavContent onLinkClick={handleLinkClick} />
                   <div className="mt-auto p-2 border-t">
                      <div className="flex items-center justify-between">
                        <LogoutNavContent />
                        <ThemeToggle />
                      </div>
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
