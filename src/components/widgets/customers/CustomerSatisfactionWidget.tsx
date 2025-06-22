import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { CUSTOMER_FEEDBACK } from "@/graphql/queries/admin";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const feedbackColors: Record<string, string> = {
  excellent: "#2ECC71",
  good: "#3498DB",
  average: "#F1C40F",
  poor: "#E74C3C",
  default: "#95A5A6",
};

// Empty state data structure
const emptyData = [{ name: "No data", count: 1, fill: "#F3F4F6" }];

export function CustomerSatisfactionWidget() {
  const { data, loading, error } = useQuery(CUSTOMER_FEEDBACK);

  const chartData = useMemo(() => {
    const rawData = data?.customerFeedback?.data || [];
    if (rawData.length === 0) return emptyData;

    return rawData.map((item: any) => ({
      ...item,
      name: item.name ?? "",
      count: item.count ?? 0,
      fill:
        feedbackColors[(item.name ?? "").toLocaleLowerCase()] ??
        feedbackColors.default,
    }));
  }, [data]);

  const totalFeedback = data?.customerFeedback?.totalFeedback || 0;
  const isEmpty = totalFeedback === 0;

  return (
    <Card className="border-foreground/20 bg-background/90 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Customer Satisfaction</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        ) : error ? (
          <div className="py-8 text-center text-sm text-red-500">
            Failed to load customer feedback.
          </div>
        ) : (
          <ChartContainer
            config={{
              excellent: {
                label: "Excellent",
                color: feedbackColors.excellent,
              },
              good: { label: "Good", color: feedbackColors.good },
              average: { label: "Average", color: feedbackColors.average },
              poor: { label: "Poor", color: feedbackColors.poor },
              count: { label: "Count" },
            }}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel={!isEmpty} />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="mt-4 flex-col gap-2 text-sm">
        {isEmpty ? (
          <div className="text-muted-foreground w-full text-center text-xs">
            No feedback collected yet
          </div>
        ) : (
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
