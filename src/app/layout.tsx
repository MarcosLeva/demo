
'use client';

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

// Metadata can't be in a client component, but we can export it from a server component if needed
// export const metadata: Metadata = {
//   title: "AdminView",
//   description: "Panel de gestión de usuarios",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, email } = useAuthStore.getState(); // Get initial state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Re-check auth state on client-side
      const { isAuthenticated: currentAuthStatus } = useAuthStore.getState();
      if (!currentAuthStatus && pathname !== '/login') {
        router.replace('/login');
      }
    }
  }, [pathname, isClient, router]);


  const showLayout = pathname !== '/login';

  if (!isClient) {
    return (
       <html lang="es" suppressHydrationWarning>
        <body className="font-body antialiased">
          {/* Or a proper loading spinner */}
        </body>
      </html>
    );
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>AdminView</title>
        <meta name="description" content="Panel de gestión de usuarios" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          {showLayout && isAuthenticated ? (
            <div className="flex min-h-screen w-full">
              <Sidebar />
              <div className="flex flex-col flex-1 sm:pl-60">
                  <Header />
                  {children}
              </div>
            </div>
          ) : (
            <main>{children}</main>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
