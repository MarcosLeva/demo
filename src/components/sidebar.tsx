
'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users,
  PanelLeft,
  Landmark,
  Terminal,
  AlertTriangle,
  LogOut,
  UserCog,
  UserPlus,
  BarChartHorizontal,
  PieChart,
  History,
  Shuffle,
  Home,
  FilePen,
  Repeat,
  Wallet,
  ChevronsLeft,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { CreateTerminalDialog } from './dashboard/create-terminal-dialog';
import { useAuthStore } from '@/store/auth';
import { CreateUserDialog } from './dashboard/create-user-dialog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';


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


function NavContent({ onLinkClick, isCollapsed }: { onLinkClick: (id?: string) => void, isCollapsed: boolean }) {
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
     <TooltipProvider>
      <nav className="flex flex-col items-stretch gap-1 px-2 text-sm font-medium">
        {navItems.map((item) => (
          <Tooltip key={item.label} delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
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
                    isCollapsed && 'justify-center',
                    'cursor-pointer text-xs'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className={cn('overflow-hidden transition-all', isCollapsed ? 'w-0' : 'w-auto')}>{item.label}</span>
                </Link>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                {item.label}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  );
}

function LogoutNavContent({ isCollapsed }: { isCollapsed: boolean }) {
    const router = useRouter();
    const { logout } = useAuthStore();

    const handleLogout = (e: React.MouseEvent) => {
      e.preventDefault();
      logout();
      router.push(logoutItem.href);
    };

    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
             <a
                href={logoutItem.href}
                onClick={handleLogout}
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-primary',
                    isCollapsed && 'justify-center',
                    'cursor-pointer text-xs'
                )}
            >
                <logoutItem.icon className="h-4 w-4" />
                <span className={cn('overflow-hidden transition-all', isCollapsed ? 'w-0' : 'w-auto')}>SALIR</span>
            </a>
          </TooltipTrigger>
           {isCollapsed && (
            <TooltipContent side="right">
              SALIR
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
}

export function Sidebar({ isCollapsed, toggleSidebar }: { isCollapsed: boolean; toggleSidebar: () => void; }) {
  const [isTerminalDialogOpen, setTerminalDialogOpen] = useState(false);
  const [isUserDialogOpen, setUserDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), 'dd.MM.yyyy HH:mm:ss', { locale: es }));
    }, 1000);
    return () => clearInterval(timer);
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
      <aside className={cn(
        "fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-sidebar sm:flex transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
        )}>
        <div className="flex h-16 items-center justify-between border-b px-4">
             <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="relative"
            >
                <Menu className={cn("h-5 w-5 transition-all", isCollapsed ? 'rotate-90 scale-0' : 'rotate-0 scale-100')} />
                <X className={cn("absolute h-5 w-5 transition-all", isCollapsed ? 'rotate-0 scale-100' : '-rotate-90 scale-0')} />
                <span className="sr-only">Alternar barra lateral</span>
            </Button>
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-2 font-semibold transition-all duration-300",
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            )}
          >
             <Image 
                src="/logo.png" 
                alt="463 Logo" 
                width={150} 
                height={37}
              />
          </Link>
        </div>

        {!isCollapsed && (
          <div className="p-4 space-y-2">
              <p className="text-center text-xs text-muted-foreground">{currentTime}</p>
              <div>
                <Input placeholder="Búsqueda del usuario" className="bg-input"/>
              </div>
          </div>
        )}

        <div className="flex-1 py-2 overflow-y-auto">
         <NavContent onLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
        </div>

         <div className="mt-auto p-2 border-t">
            <div className={cn("flex items-center", isCollapsed ? 'flex-col gap-2' : 'justify-between' )}>
                <LogoutNavContent isCollapsed={isCollapsed}/>
                <ThemeToggle />
            </div>
         </div>
      </aside>
    </>
  );
}
