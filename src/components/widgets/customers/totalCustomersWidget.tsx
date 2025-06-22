import { CUSTOMER_STATS } from "@/graphql/queries/admin";
import { MonthlyMetricsWidgets } from "../MonthlyMetricsWidgets";
import { useQuery } from "@apollo/client";

export function TotalCustomersWidget() {
  const { data, loading, error } = useQuery(CUSTOMER_STATS);
  const totalCount = data?.customerStats?.totalCustomers ?? 0;
  const rawMonthlyData =
    data?.customerStats?.customersByMonth?.map((item) => {
      if (!item.month || !item.count) return;
      return {
        name: item.month,
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
      title="Total Customers"
      emptyMessage="No customers yet"
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
