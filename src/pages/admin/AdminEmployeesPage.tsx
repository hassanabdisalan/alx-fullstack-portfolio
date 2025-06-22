import { MainEmployeesDashboard } from "@/components/admin-dashboard/MainEmployeesDashboard";

interface AdminEmployeesPageProps {}

export function AdminEmployeesPage({}: AdminEmployeesPageProps) {
  return (
    <div className="o flex h-full w-full flex-col items-center">
      <MainEmployeesDashboard />
    </div>
  );
}
