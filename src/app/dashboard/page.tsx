
import { users } from "@/lib/data";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { Configurations } from "@/components/dashboard/configurations";
import Link from "next/link";
import { Home } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
       <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Home className="h-4 w-4" />
            /
            <span>Usuarios</span>
        </div>
      <Configurations />
      <UserDashboard users={users} />
    </main>
  );
}
