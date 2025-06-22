import { MainLeadsManagment } from "@/components/admin-dashboard/MainLeadsManagment";

interface AdminLeadManagemnetPageProps {}

export function AdminLeadManagemnetPage({}: AdminLeadManagemnetPageProps) {
  return (
    <div className="o flex h-full w-full flex-col items-center">
      <MainLeadsManagment />
    </div>
  );
}
