import { WidgetEmpty, WidgetLoading } from "./WidgetStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

// Interface for a single monthly data record
interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

// Chart configuration for shadcn/ui charts
const chartConfig = {
  value: {
    label: "Value",
  },
} satisfies ChartConfig;

interface MonthlyMetricsWidgetProps {
  title: string;
  chartData: ChartData[];
  emptyMessage: string;
  valueSuffix?: string;
  increaseColor?: string;
  decreaseColor?: string;
  neutralColor?: string;
  totalCount?: number;
  percentChange?: number;
  loading?: boolean;
  errorMessage?: string;
}

export function MonthlyMetricsWidgets({
  title,
  chartData,
  valueSuffix,
  emptyMessage,
  increaseColor = "#0052cc",
  decreaseColor = "#dc2626",
  neutralColor = "var(--color-muted)",
  totalCount = 0,
  percentChange = 0,
  loading = false,
  errorMessage,
}: MonthlyMetricsWidgetProps) {
  const hasData = chartData && chartData.length > 0;
  const hasIncreased = percentChange > 0;
  const formartedPercentChange = percentChange.toFixed(2);

  if (loading) return <WidgetLoading />;
  if (errorMessage && errorMessage.length > 1 && !hasData) {
    if (import.meta.env.DEV) {
      return <WidgetEmpty message={errorMessage} />;
    }
    return <WidgetEmpty message={"Error loading data"} />;
  }
  const lastBar = chartData[chartData.length - 1];
  return (
    <Card className="border-foreground/20 pretty-scrollbar bg-background/90 h-full max-h-52 w-full rounded-xl border p-4">
      <div className="flex h-full items-start justify-between">
        <div className="flex w-[40%] flex-col">
          <CardHeader className="mb-2 p-0">
            <CardTitle className="text-foreground/90 text-lg font-semibold">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="mb-1 text-3xl font-bold">
              {valueSuffix} {totalCount.toLocaleString()}
            </div>
            {hasData ? (
              <div className="text-muted-foreground text-sm">
                The number of {title.toLowerCase()}{" "}
                {hasIncreased ? "increased" : "decreased"} by
                <span
                  className={`ml-1 font-semibold ${
                    hasIncreased ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {hasIncreased
                    ? `+${formartedPercentChange}%`
                    : `${formartedPercentChange}%`}
                </span>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">
                {emptyMessage}
              </div>
            )}
          </CardContent>
        </div>

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
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar
                dataKey="value"
                fill={
                  hasData
                    ? hasIncreased
                      ? increaseColor
                      : decreaseColor
                    : "(var(--muted-foreground))"
                }
                radius={[4, 4, 0, 0]}
                barSize={22}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name === lastBar.name
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
