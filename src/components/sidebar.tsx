'use client';
import Link from 'next/link';
import {
  Home,
  Users,
  PanelLeft,
  Landmark,
  Terminal,
  AlertTriangle,
  LogOut,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', icon: Home, label: 'Panel' },
  { href: '#', icon: Users, label: 'Usuarios' },
  { href: '#', icon: Landmark, label: 'Historia de balance' },
  { href: '#', icon: Terminal, label: 'Crear terminal' },
  {
    href: '#',
    icon: AlertTriangle,
    label: 'Panic',
    className: 'text-destructive dark:text-red-500 hover:text-destructive/90 dark:hover:text-red-400',
  },
];

const logoutItem = { href: '#', icon: LogOut, label: 'Cerrar sesión' };

function NavContent() {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-2 px-4 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary',
            pathname === item.href && 'bg-sidebar-accent text-sidebar-primary',
            item.className
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
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary',
                    pathname === logoutItem.href && 'bg-sidebar-accent text-sidebar-primary',
                )}
            >
                <logoutItem.icon className="h-4 w-4" />
                {logoutItem.label}
            </Link>
        </nav>
    );
}

export function Sidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-sidebar sm:flex">
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-sidebar-primary"
          >
            <span className="">AdminView</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-col justify-between flex-1 overflow-auto py-2">
         <NavContent />
         <div className="mt-auto">
           <LogoutNavContent />
         </div>
        </div>
      </aside>
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="fixed top-4 right-4 z-40 sm:hidden">
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
            <div className='py-2'>
                <NavContent />
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
