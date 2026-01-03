
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
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { CreateTerminalDialog } from './dashboard/create-terminal-dialog';
import { useAuthStore } from '@/store/auth';
import { CreateUserDialog } from './dashboard/create-user-dialog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


const navItems = [
  { href: '/dashboard', icon: Home, label: 'USUARIOS' },
  { href: '/profile/edit', icon: FilePen, label: 'EDITAR' },
  { href: '/balance-history', icon: Repeat, label: 'ÚLTIMAS TRANSACCIONES' },
  { href: '#', icon: UserPlus, label: 'CREAR UN USUARIO', id: 'create-user' },
  { href: '/provider-statistics', icon: BarChartHorizontal, label: 'ESTADÍSTICAS DE PROVEEDORES' },
  { href: '/statistics', icon: PieChart, label: 'ESTADÍSTICAS' },
  { href: '/intersection-ip', icon: Wallet, label: 'CONFIGURACIÓN DEL JUEGO' },
  { href: '/changes', icon: History, label: 'CHANGES' },
  { href: '/intersection-ip', icon: Shuffle, label: 'INTERSECTION IP' },
];

const logoutItem = { href: '/login', icon: LogOut, label: 'SALIR' };


function NavContent({ onLinkClick }: { onLinkClick: (id?: string) => void }) {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-1 px-2 text-sm font-medium">
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
            pathname === item.href && !item.id && 'bg-sidebar-accent text-sidebar-primary',
            item.className,
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
                {logoutItem.label}
            </a>
        </nav>
    );
}

export function Sidebar() {
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
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-sidebar sm:flex">
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-sidebar-primary"
          >
            <Image src="/logo.png" alt="463 Logo" width={50} height={50} />
          </Link>
        </div>

        <div className="p-4 space-y-2">
            <p className="text-center text-xs text-muted-foreground">{currentTime}</p>
            <Input placeholder="Búsqueda del usuario" className="bg-input"/>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-auto py-2">
         <NavContent onLinkClick={handleLinkClick} />
         <div className="mt-auto p-2">
           <LogoutNavContent />
         </div>
        </div>
      </aside>
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="fixed top-3 left-4 z-40 sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Alternar Menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs bg-sidebar p-0 flex flex-col">
             <div className="flex h-16 items-center justify-between border-b px-6">
                 <Link
                    href="/dashboard"
                    className="flex items-center gap-2 font-semibold text-sidebar-primary"
                  >
                    <Image src="/logo.png" alt="463 Logo" width={50} height={50} />
                  </Link>
              </div>
            <div className='py-2'>
                <NavContent onLinkClick={handleLinkClick} />
            </div>
            <div className="mt-auto py-2">
              <LogoutNavContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
