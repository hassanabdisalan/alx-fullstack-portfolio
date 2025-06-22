import { MainSupportTicket } from "@/components/admin-dashboard/MainSupportTicket";
interface AdminSupportTicketsProps {}

export function AdminSupportTickets({}: AdminSupportTicketsProps) {
  return (
    <div className="o flex h-full w-full flex-col items-center">
      <MainSupportTicket />
    </div>
  );
}
