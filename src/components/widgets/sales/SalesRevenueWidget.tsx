import { SALES_REVENUE_STATS } from "@/graphql/queries/admin";
import { MonthlyMetricsWidgets } from "../MonthlyMetricsWidgets";
import { useQuery } from "@apollo/client";

export function SalesRevenueWidget() {
  const { data, loading, error } = useQuery(SALES_REVENUE_STATS);
  const totalCount = data?.salesRevenueStats?.totalRevenue ?? 0;
  const rawMonthlyData =
    data?.salesRevenueStats?.revenueByMonth?.map((item) => {
      if (!item.month || !item.total) return;
      return {
        name: item.month,
        value: item.total,
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
      title="Sales Revenue"
      emptyMessage="No sales yet"
      valueSuffix="Ksh"
      increaseColor="#0052cc"
      decreaseColor="#dc2626"
      totalCount={totalCount}
      percentChange={percentChange}
      loading={loading}
      errorMessage={error?.message}
    />
  );
}
