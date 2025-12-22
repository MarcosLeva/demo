"use client";

import { Globe, Laptop } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Set initial status
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


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex-1">
        {/* Mobile menu button will be handled by sidebar */}
      </div>
      <div className="flex items-center gap-4">
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
  );
}
