import { CUSTOMER_SATISFACTION } from "@/graphql/queries/admin";
import { useQuery } from "@apollo/client";
import { MonthlyMetricsWidgets } from "../MonthlyMetricsWidgets";

export function TotalCustomerSatisfaction() {
  const { data, loading, error } = useQuery(CUSTOMER_SATISFACTION);
  const totalCount = data?.customerSatisfaction?.total ?? 0;
  const rawMonthlyData =
    data?.customerSatisfaction?.distribution?.map((item) => {
      if (!item.monthYear || !item.count) return;
      return {
        name: item.monthYear,
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
      title="Customer Satisfaction"
      emptyMessage="No customer feedback this month"
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
