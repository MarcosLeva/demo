import { users } from "@/lib/data";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-background/80 backdrop-blur-sm md:px-6">
        <h1 className="text-lg font-semibold md:text-xl text-foreground">
          AdminView
        </h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <UserDashboard users={users} />
      </main>
    </div>
  );
}
