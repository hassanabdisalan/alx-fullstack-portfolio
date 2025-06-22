import { BetterUserCalender } from "@/components/dashboard/calender/BetterUserCalender";

interface AdminCalenderPageProps {}

export function AdminCalenderPage({}: AdminCalenderPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <BetterUserCalender />
    </div>
  );
}
