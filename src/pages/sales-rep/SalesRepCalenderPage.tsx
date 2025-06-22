import { BetterUserCalender } from "@/components/dashboard/calender/BetterUserCalender";

interface SalesRepCalenderPageProps {}

export function SalesRepCalenderPage({}: SalesRepCalenderPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <BetterUserCalender />
    </div>
  );
}
