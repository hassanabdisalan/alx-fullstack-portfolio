import { GET_TOTAL_CAMPAIGNS } from "@/graphql/queries/admin";
import { MonthlyMetricsWidgets } from "../MonthlyMetricsWidgets";
import { useQuery } from "@apollo/client";

export function TotalCampaignWidget() {
  const { data, loading, error } = useQuery(GET_TOTAL_CAMPAIGNS);
  const totalCount = data?.campaignCounts?.totalCampaigns ?? 0;
  const rawMonthlyData =
    data?.campaignCounts?.monthlyData?.map((item) => {
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
      chartData={monthlyData}
      title="Total Campaigns"
      emptyMessage="No Campaigns yet"
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
