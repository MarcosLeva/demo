'use client';
import Link from 'next/link';
import React, { useState } from 'react';
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
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { CreateTerminalDialog } from './dashboard/create-terminal-dialog';
import { useAuthStore } from '@/store/auth';
import { CreateUserDialog } from './dashboard/create-user-dialog';

const navItems = [
  { href: '/dashboard', icon: Users, label: 'Panel de usuarios' },
  { href: '/balance-history', icon: Landmark, label: 'Historia de balance' },
  { href: '/provider-statistics', icon: BarChartHorizontal, label: 'Estadísticas de proveedores' },
  { href: '/statistics', icon: PieChart, label: 'Estadísticas' },
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
            pathname === item.href && !item.id && 'bg-sidebar-accent text-sidebar-primary',
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

export function Sidebar() {
  const [isTerminalDialogOpen, setTerminalDialogOpen] = useState(false);
  const [isUserDialogOpen, setUserDialogOpen] = useState(false);

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
            <span className="">AdminView</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 flex-col justify-between overflow-auto py-2">
         <NavContent onLinkClick={handleLinkClick} />
         <div className="mt-auto">
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
                  <span className="">AdminView</span>
                </Link>
                <ThemeToggle />
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
