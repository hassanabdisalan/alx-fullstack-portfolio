import { ManualSwappy } from "../widgets/SwappableWidgetsContainer";
import { TotalEmployeeStatsWidget } from "../widgets/employees/TotalEmployeeStatsWidget";
import { ConversionRatesWidget } from "../widgets/leads/ConversionRatesWidget";
import { TotalWorkHoursWidget } from "../widgets/employees/TotalWorkHoursWidget";
import { EmployeeTable } from "./tables/employess/EmployeeTable";

interface MainEmployeesDashboardProps {}

export function MainEmployeesDashboard({}: MainEmployeesDashboardProps) {
  return (
    <div className="flex max-h-screen w-full flex-col gap-4">
      <ManualSwappy
        sectionKey="MainEmployeesDashboardStatsKey"
        initialItems={[
          {
            id: "employee-stats",
            title: "Employee Stats",
            children: <TotalEmployeeStatsWidget />,
          },
          {
            id: "work-hours",
            title: "Work Hours",
            children: <TotalWorkHoursWidget />,
          },
          {
            id: "conversion-rates",
            title: "Conversion Rates",
            children: <ConversionRatesWidget />,
          },
        ]}
      />

      {/* Bottom Widgets Row - Tables */}
      <div className="grid grid-cols-1 gap-4">
        <div className="">
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
}
