
import { users } from "@/lib/data";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { Configurations } from "@/components/dashboard/configurations";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
      <Configurations />
      <UserDashboard users={users} />
    </main>
  );
}
