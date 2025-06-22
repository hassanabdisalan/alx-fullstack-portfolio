import { PieChart, Pie, Cell } from "recharts";
import { GET_SENTIMENTAL_ANALYSIS } from "@/graphql/queries/admin";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartConfig 
} from "@/components/ui/chart";
import { WidgetLoading, WidgetEmpty } from "../WidgetStatus";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@apollo/client";

// Chart configuration for shadcn/ui charts
const chartConfig = {
  positive: {
    label: "Positive",
    color: "#22c55e", // green
  },
  neutral: {
    label: "Neutral", 
    color: "#eab308", // yellow
  },
  negative: {
    label: "Negative",
    color: "#ef4444", // red
  },
  value: {
    label: "Responses",
  },
} satisfies ChartConfig;

export function SentimentalAnalysisCardWidget() {
  const { data, loading, error } = useQuery(GET_SENTIMENTAL_ANALYSIS);

  if (loading) return <WidgetLoading />;

  if (error) return <WidgetEmpty />;

  const {
    positive: rawPositive,
    neutral: rawNeutral,
    negative: rawNegative,
    total: rawTotal,
    message,
  } = data?.sentimentAnalysis || {};

  // Normalize all possibly null or undefined values
  const positive = rawPositive ?? 0;
  const neutral = rawNeutral ?? 0;
  const negative = rawNegative ?? 0;
  const total = rawTotal ?? 0;

  if (total === 0) {
    const emptyData = [
      {
        sentiment: "nodata",
        value: 1,
        fill: "var(--muted-foreground)",
      },
    ];
    
    return (
      <Card className="flex h-full min-h-[475px] w-full flex-col ">
        <CardHeader className="items-center pb-0">
          <CardTitle>Sentimental Analysis</CardTitle>
          <CardDescription>
            <Badge variant="outline" className="text-sm font-normal">
              0 responses
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={{
              nodata: {
                label: "No Data",
                color: "oklch(var(--muted-foreground))",
              },
              value: {
                label: "Count",
              },
            }}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={emptyData}
                dataKey="value"
                nameKey="sentiment"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="h-full flex-col gap-2 text-sm">
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            No sentiment data available
          </div>
        </CardFooter>
      </Card>
    );
  }

  // Prepare chart data
  const pieData = [
    {
      sentiment: "positive",
      value: positive,
      fill: "#22c55e", // green
    },
    {
      sentiment: "neutral", 
      value: neutral,
      fill: "#eab308", // yellow
    },
    {
      sentiment: "negative",
      value: negative,
      fill: "#ef4444", // red
    },
  ].filter((item) => item.value > 0);

  return (
    <Card className="flex flex-col h-full min-h-[475px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sentimental Analysis</CardTitle>
        <CardDescription>
          <Badge variant="outline" className="text-sm font-normal">
            {total} {total === 1 ? "response" : "responses"}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="sentiment"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex flex-wrap justify-center gap-4">
          {pieData.map((item) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={item.sentiment} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm font-medium capitalize">
                  {item.sentiment}
                </span>
                <span className="text-muted-foreground text-sm">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-muted-foreground text-center leading-none">
          Customer sentiment analysis based on feedback responses
        </div>
      </CardFooter>
    </Card>
  );
}
