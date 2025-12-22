import { users } from "@/lib/data";
import { UserDashboard } from "@/components/dashboard/user-dashboard";

export default function Page() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <UserDashboard users={users} />
    </main>
  );
}
