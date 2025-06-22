import { MainLeadsAnalytytics } from "@/components/admin-dashboard/MainLeadsAnalytics";

interface AdminLeadAnaluticspageProps {}

export function AdminLeadAnaluticspage({}: AdminLeadAnaluticspageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <MainLeadsAnalytytics />
    </div>
  );
}
