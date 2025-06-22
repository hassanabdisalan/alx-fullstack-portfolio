import { MainAdminDashboard } from "@/components/admin-dashboard/MainAdminDashboard";

interface AdminRootPageProps {}

export function AdminRootPage({}: AdminRootPageProps) {
  return (
    <div className="o flex w-full flex-col items-center justify-center">
      <MainAdminDashboard />
    </div>
  );
}
