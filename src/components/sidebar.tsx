'use client';
import Link from 'next/link';
import { Home, Users, Settings, PanelLeft } from 'lucide-react';
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
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '#', icon: Users, label: 'Users' },
  { href: '#', icon: Settings, label: 'Settings' },
];

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
            pathname === item.href ? 'bg-sidebar-accent text-sidebar-primary' : ''
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
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
        <div className="flex-1 overflow-auto py-2">
         <NavContent />
        </div>
      </aside>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:hidden">
         <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
          >
            AdminView
          </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs bg-sidebar">
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
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
