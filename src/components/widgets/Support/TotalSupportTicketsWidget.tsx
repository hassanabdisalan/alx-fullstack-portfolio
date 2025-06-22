
import { useQuery } from "@apollo/client";
import { MonthlyMetricsWidgets } from "../MonthlyMetricsWidgets";
import { GET_TOTAL_SUPPORT_TICKETS } from "@/graphql/tickets";

export function TotalSupportTicketsWidget() {
  const { data, loading, error } = useQuery(GET_TOTAL_SUPPORT_TICKETS);
  const totalCount = data?.ticketsCount?.totalTickets ?? 0;
  const rawMonthlyData =
    data?.ticketsCount?.monthlyData?.map((item) => {
      if (!item.monthYear || !item.count) return;
      const monthYear = new Date(item.monthYear);
      const month = monthYear.toLocaleString("default", { month: "short" });
      return {
        name: month,
        value: item.count,
      };
    }) ?? [];
  const monthlyData = rawMonthlyData.filter((item) => !!item);
  const lastMonthCount = monthlyData[monthlyData.length - 1]?.value ?? 0;
  const secondLastMonthCount = monthlyData[monthlyData.length - 2]?.value ?? 0;
  const percentChange =
    lastMonthCount && secondLastMonthCount
      ? ((lastMonthCount - secondLastMonthCount) / secondLastMonthCount) * 100
      : 0;

  return (
    <MonthlyMetricsWidgets
      title="Total Support Tickets"
      emptyMessage="No support tickets yet"
      chartData={monthlyData}
      valueSuffix=""
      totalCount={totalCount}
      percentChange={percentChange}
      loading={loading}
      errorMessage={error?.message}
    />
  );
}
