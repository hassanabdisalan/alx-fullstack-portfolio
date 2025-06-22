import { BetterUserCalender } from "@/components/dashboard/calender/BetterUserCalender";

interface MarketingRepCalenderPageProps {}

export function MarketingRepCalenderPage({}: MarketingRepCalenderPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <BetterUserCalender />
    </div>
  );
}
