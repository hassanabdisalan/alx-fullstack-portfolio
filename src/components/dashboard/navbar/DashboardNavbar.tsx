import { useViewer } from "@/hooks/use-viewr";
import { CurrentUser } from "@/components/authz/CurrentUser";
import { DashboardNavbarNavbarActions } from "./DashboardNavbarActions";
import { DashboardNavbarBusinessTeam } from "./DashboardNavbarBusinessTeam";

interface DashboardNavbarProps {}

export function DashboardNavbar({}: DashboardNavbarProps) {
  const { user } = useViewer()!;
  return (
    <div className="shadow-muted flex w-full items-center gap-4 rounded-t-2xl border-t-[1px] border-b py-1 shadow">
      <p className="line-clamp-1 w-full text-lg font-semibold">
        Welcome back {user?.Fname}
      </p>
      <div className="flex items-center justify-end gap-[10%]">
        <DashboardNavbarBusinessTeam />
        <DashboardNavbarNavbarActions />
        <CurrentUser />
      </div>
    </div>
  );
}
