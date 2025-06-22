import { MONTHLY_LEAD_TRENDS } from "@/graphql/queries/admin";
import { MonthlyMetricsWidgets } from "../MonthlyMetricsWidgets";
import { useQuery } from "@apollo/client";

export function TotalGeneratedLeads() {
  const { data, loading, error } = useQuery(MONTHLY_LEAD_TRENDS);
  const totalCount = data?.monthlyLeadTrends?.totalLeads ?? 0;
  const rawMonthlyData =
    data?.monthlyLeadTrends?.data?.map((item) => {
      if (!item.month || !item.count) return;
      const monthYear = new Date(item.month);
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
      chartData={monthlyData}
      title="Total Generated Leads"
      emptyMessage="No Leads yet"
      valueSuffix=""
      increaseColor="#0052cc"
      decreaseColor="#dc2626"
      totalCount={totalCount}
      percentChange={percentChange}
      loading={loading}
      errorMessage={error?.message}
    />
  );
}
