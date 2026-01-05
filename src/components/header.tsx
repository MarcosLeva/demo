
'use client';

import { Globe, Laptop, PanelLeft, UserCog, UserPlus, BarChartHorizontal, PieChart, History, Shuffle, ChevronsLeft, Search, Menu, X } from 'lucide-react';
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

interface HeaderProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export function Header({ isSidebarCollapsed, toggleSidebar }: HeaderProps) {
  const [isUserDialogOpen, setUserDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const handleLinkClick = (id?: string) => {
    if (id === 'create-user') {
      setUserDialogOpen(true);
    }
    setSheetOpen(false);
  };


  return (
    <>
      <CreateUserDialog isOpen={isUserDialogOpen} onClose={() => setUserDialogOpen(false)} />
      <header className={cn("sticky top-0 z-30 flex h-16 items-center border-b bg-header px-4 sm:px-6")}>
         <div className="flex w-full items-center justify-between">

            {/* Mobile Menu */}
            <div className="flex items-center gap-4 sm:hidden">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="bg-transparent border-0 hover:bg-white/10">
                            <Menu className="h-6 w-6 text-white" />
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
            </div>
            
            {/* Desktop Logo & Menu */}
            <div className="flex flex-1 items-center justify-center sm:justify-start">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="hidden sm:flex relative text-white hover:bg-white/10 hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Alternar barra lateral</span>
                </Button>
                <div className='absolute left-1/2 -translate-x-1/2'>
                    <Link
                    href="/dashboard"
                    >
                    <Image 
                        src="/logo.png" 
                        alt="463 Logo" 
                        width={150} 
                        height={37}
                        />
                    </Link>
                </div>
              </div>
            </div>
            
            <div className='sm:hidden'>
                 <Image 
                    src="/logo.png" 
                    alt="463 Logo" 
                    width={120} 
                    height={30}
                    />
            </div>
            
            <div className="flex-1" />

          </div>
      </header>
    </>
  );
}
