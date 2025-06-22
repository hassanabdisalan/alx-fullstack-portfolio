import { ManualSwappy } from "../widgets/SwappableWidgetsContainer";
import { TotalLeadsWidget } from "../widgets/leads/TotalLeadsWidget";
import { TotalSubscriberWidget } from "../widgets/sales/TotalSubscriberWidget";
import { ConversionRatesWidget } from "../widgets/leads/ConversionRatesWidget";
import { LeadskanbanBoardContainer } from "../widgets/leads/LeadsKanbanBoard/LeadskanbanBoardContainer";



interface MainLeadsManagmentProps {}



export function MainLeadsManagment({}: MainLeadsManagmentProps) {
  return (
    <div className="max-h-scree flex w-full flex-col gap-4">
      <ManualSwappy
        sectionKey="MainLeadsAnalytyticsKeys"
        initialItems={[
          {
            id: "total-leads",
            title: "Total Leads",
            //  api is connected
            children: <TotalLeadsWidget />,
          },
          {
            id: "subscribers",
            title: "Subscribers",
            children: <TotalSubscriberWidget />,
          },
          {
            id: "conversion-rates",
            title: "Conversion Rates",
            // api is connected
            children: <ConversionRatesWidget />,
          },
        ]}
      />
      <div className="flex w-full gap-4">
        <LeadskanbanBoardContainer />
        {/* <LeadKanbanBoardcontainer /> */}
      </div>
    </div>
  );
}
