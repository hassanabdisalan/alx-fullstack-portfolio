import { InviteUserModal } from "@/components/admin-dashboard/forms/InviteUserModal";
import { DashboardNavbarEditWidgets } from "./DashboardNavbarEditWidgets";
import { DashboardNavbarNotifications } from "./DashboardNavbarNotifications";

interface DashboardNavbarNavbarActionsProps {}

export function DashboardNavbarNavbarActions({}: DashboardNavbarNavbarActionsProps) {
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <InviteUserModal />
      <DashboardNavbarEditWidgets />
      <DashboardNavbarNotifications />
    </div>
  );
}
