import { useQuery } from "@apollo/client";
import { REVENUE_FORECAST } from "@/graphql/queries/admin";
import { WidgetEmpty, ChartWidgetLoaderSkeleton } from "../WidgetStatus";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

// Chart configuration for shadcn/ui charts
const chartConfig = {
  salesRevenue: {
    label: "Sales Revenue",
    color: "var(--muted-foreground)", // Original gray color
  },
  productCost: {
    label: "Product Cost", 
    color: "#0052cc", // Original blue color
  },
} satisfies ChartConfig;

export function RevenueForecastWidget() {
  const { data, loading, error } = useQuery(REVENUE_FORECAST);

  if (loading) return <ChartWidgetLoaderSkeleton />;
  if (error || !data?.revenueForecast?.length)
    return <WidgetEmpty message="No revenue data available" />;

  const chartData = data.revenueForecast.map((item: any) => {
    const date = new Date(item.month);
    const monthName = date.toLocaleString("default", { month: "short" });
    return {
      month: monthName,
      salesRevenue: item.salesRevenue || 0,
      productCost: item.productCost || 0,
    };
  });

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue Forecast</CardTitle>
        <CardDescription>
          Sales revenue vs product cost comparison
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer 
          config={chartConfig} 
          className="min-h-[200px] max-h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            barCategoryGap="19%"
            barGap={8}
          >
            <CartesianGrid vertical={false} strokeDasharray="0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, "dataMax + 200"]}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="salesRevenue"
              fill="var(--color-salesRevenue)"
              name="Sales Revenue"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="productCost"
              fill="var(--color-productCost)"
              name="Product Cost"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center justify-center gap-6 w-full">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "var(--muted-foreground)" }}
            />
            <span className="text-sm font-medium">Sales Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "#0052cc" }}
            />
            <span className="text-sm font-medium">Product Cost</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
