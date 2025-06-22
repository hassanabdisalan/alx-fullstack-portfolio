import { CustomerSatisfactionWidget } from "../widgets/customers/CustomerSatisfactionWidget";

import { ConversionRatesWidget } from "../widgets/leads/ConversionRatesWidget";
import { ManualSwappy } from "../widgets/SwappableWidgetsContainer";
import { TotalCustomersWidget } from "../widgets/customers/totalCustomersWidget";
import { RevenueForecastWidget } from "../widgets/sales/RevenueForecastWidget";
import { SalesRevenueWidget } from "../widgets/sales/SalesRevenueWidget";

interface MainAdminDashboardProps {}

export function MainAdminDashboard({}: MainAdminDashboardProps) {
  return (
    <div className="flex max-h-screen w-full flex-col gap-4 p-4">
      <ManualSwappy
        sectionKey="MainAdminDashboarPdKey"
        initialItems={[
          {
            id: "total-cusomers",
            title: "Total Customers",
            // connected to api
            children: <TotalCustomersWidget />,
          },
          {
            id: "sales-revenue",
            title: "Sales Revenue",
            // connected to api
            children: <SalesRevenueWidget />,
          },
          {
            id: "conversion-rates",
            title: "Conversion Rates",
            // connected to api
            children: <ConversionRatesWidget />,
          },
        ]}
      />

      <div className="flex w-full gap-2">
        {/* connected to api */}
        <div className="w-2/3">
          <RevenueForecastWidget />
        </div>
        {/* Connected to the API */}
        <div className="w-1/3">
          <CustomerSatisfactionWidget />
        </div>
      </div>
    </div>
  );
}
