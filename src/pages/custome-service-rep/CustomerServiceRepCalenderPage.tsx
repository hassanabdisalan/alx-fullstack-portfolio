import { BetterUserCalender } from "@/components/dashboard/calender/BetterUserCalender";


interface CustomerServiceRepCalenderPageProps {}

export function CustomerServiceRepCalenderPage({}: CustomerServiceRepCalenderPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <BetterUserCalender />
    </div>
  );
}
