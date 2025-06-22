import { MonthlyMetricsWidgets } from "../MonthlyMetricsWidgets";
import { SUBSCRIBER_STATS } from "@/graphql/queries/stats";
import { useQuery } from "@apollo/client";


interface SubscriberWidgetProps {
  subscribers?: number;
  percentChange?: number;
  chartData?: { name: string; value: number }[];
}


export function TotalSubscriberWidget({}: SubscriberWidgetProps) {
  const { data, loading, error } = useQuery(SUBSCRIBER_STATS);

  const monthlyData = data?.subscriberStats?.data?.map((item)=>{
    return {
      name: item.month||"Unknown", // Ensure month is a string, default to "Unknown" if undefined
      value: item.count||0, // Ensure value is a number, default to 0 if undefined
    }
  })??[]

  const totalCount =
    monthlyData?monthlyData?.reduce((acc, item) => acc + item?.value, 0) : 0;
  const lastMonth = monthlyData?.[monthlyData.length - 1] ?? 0;
  const previousMonth = monthlyData?.[monthlyData.length - 2] ?? 0;
  const percentChange = ((lastMonth?.value - previousMonth?.value) / previousMonth?.value) * 100;



  return (
    <div className="h-full">
      <MonthlyMetricsWidgets
        title="Total Subscribers"
        chartData={monthlyData}
        emptyMessage="No Subscribers yet"
        valueSuffix=""
        totalCount={totalCount}
        percentChange={percentChange}
        loading={loading}
        // errorMessage={error?.message}
      />
    </div>
  );
}
