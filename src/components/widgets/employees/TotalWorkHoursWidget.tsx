import { useQuery } from "@apollo/client";
import { BarChart, Bar, XAxis, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { WidgetLoading, WidgetEmpty } from "../WidgetStatus";
import { WORKLOG } from "@/graphql/queries/admin";
import { getLastFourMonths } from "@/utils/chart-utils";
import { useMemo } from "react";

// Chart configuration for shadcn/ui charts
const chartConfig = {
  value: {
    label: "Hours",
  },
} satisfies ChartConfig;

export function TotalWorkHoursWidget() {
  const { data, loading, error } = useQuery(WORKLOG);

  const { totalWorkingHours, chartData, percentChange } = useMemo(() => {
    const total = data?.workLog?.totalWorkingHours ?? 0;
    const monthlyData = data?.workLog?.monthlyData ?? [];

    // Generate default chart data for the last 4 months
    const chartBase = getLastFourMonths();

    // Populate chart data
    monthlyData.forEach((entry) => {
      const monthShort = entry.month?.slice(0, 3); // "Jan", "Feb", etc.
      const found = chartBase.find((m) => m.name === monthShort);
      if (found) {
        found.value = entry.totalWorkingHours ?? 0;
      }
    });

    // Calculate % change from last 2 non-zero months
    let change = 0;
    const nonZeroMonths = monthlyData.filter(
      (m) => (m.totalWorkingHours ?? 0) > 0,
    );

    if (nonZeroMonths.length >= 2) {
      const current =
        nonZeroMonths[nonZeroMonths.length - 1].totalWorkingHours ?? 0;
      const previous =
        nonZeroMonths[nonZeroMonths.length - 2].totalWorkingHours ?? 0;
      change = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
    } else if (nonZeroMonths.length === 1) {
      change = 100;
    }

    return {
      totalWorkingHours: Math.ceil(total),
      chartData: chartBase,
      percentChange: parseFloat(change.toFixed(1)),
    };
  }, [data]);

  const hasIncreased = percentChange >= 0;
  const hasData = totalWorkingHours > 0;
  const lastBar = chartData[chartData.length - 1];
  const increaseColor = "#0052cc";
  const decreaseColor = "#dc2626";
  const neutralColor = "var(--color-muted)";

  if (loading) return <WidgetLoading />;
  if (error || !data?.workLog) {
    if (import.meta.env.DEV) {
      return <WidgetEmpty message={error?.message} />;
    }
    return <WidgetEmpty message={"Error loading data"} />;
  }

  return (
    <Card className="border-foreground/20 bg-background/90 h-full max-h-52 w-full rounded-xl border p-4">
      <div className="flex h-full items-start justify-between">
        {/* Text Content */}
        <div className="flex flex-col w-[40%]">
          <CardHeader className="mb-2 p-0">
            <CardTitle className="text-foreground/90 text-lg font-semibold">
              Total Work Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="mb-1 text-3xl font-bold">
              {totalWorkingHours} Hrs
            </div>
            {hasData ? (
              <div className="text-muted-foreground text-sm">
                The number of work hours{" "}
                {hasIncreased ? "increased" : "decreased"} by
                <span
                  className={`ml-1 font-semibold ${
                    hasIncreased ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {hasIncreased ? "+" : ""}
                  {percentChange}%
                </span>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">
                No working hour data available
              </div>
            )}
          </CardContent>
        </div>

        {/* Chart Content */}
        <div className="h-full w-[60%]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart data={chartData} barGap={8} barCategoryGap="20%">
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
              <Bar
                dataKey="value"
                fill={
                  hasData
                    ? hasIncreased
                      ? increaseColor
                      : decreaseColor
                    : neutralColor
                }
                radius={[4, 4, 0, 0]}
                barSize={22}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name === lastBar?.name
                        ? hasIncreased
                          ? increaseColor
                          : decreaseColor
                        : neutralColor
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </Card>
  );
}
