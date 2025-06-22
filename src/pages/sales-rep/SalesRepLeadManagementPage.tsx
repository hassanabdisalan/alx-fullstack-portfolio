import { ConversionRatesWidget } from "@/components/widgets/leads/ConversionRatesWidget";
import { LeadskanbanBoardContainer } from "@/components/widgets/leads/LeadsKanbanBoard/LeadskanbanBoardContainer";


import { TotalLeadsWidget } from "@/components/widgets/leads/TotalLeadsWidget";
import { TotalSubscriberWidget } from "@/components/widgets/sales/TotalSubscriberWidget";
import { ManualSwappy } from "@/components/widgets/SwappableWidgetsContainer";

interface SalesRepLeadManagementPageProps {}

export function SalesRepLeadManagementPage({}: SalesRepLeadManagementPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex max-h-screen w-full flex-col gap-4 p-4">
        <ManualSwappy
          sectionKey="MainSupportTicketKeys"
          initialItems={[
            {
              id: "total-leads",
              title: "Total Leads",
              children: <TotalLeadsWidget />,
            },
            {
              id: "subscribers",
              title: "Subscriber",
              children: <TotalSubscriberWidget />,
            },
            {
              id: "conversion-rates",
              title: "Conversion Rates",
              children: <ConversionRatesWidget />,
            },
          ]}
        />
        <div className="flex w-full gap-4">
          {/* <LeadKanbanBoardcontainer /> */}
          <LeadskanbanBoardContainer />
        </div>
      </div>
    </div>
  );
}
