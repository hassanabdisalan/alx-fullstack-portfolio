import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMeasure } from "@uidotdev/usehooks";

type ChartData<Dk extends string, Nk extends string> = {
  fill: string;
} & Record<Dk, number> &
  Record<Nk, string>;

interface DonutChartProps<Dk extends string, Nk extends string> {
  dataKey: Dk;
  nameKey: Nk;
  data: ChartData<Dk, Nk>[];
  cardTitle: string;
  chartConfig: ChartConfig;
  cursor?: boolean;
}
export function DonutChart<Dk extends string, Nk extends string>({
  data,
  dataKey,
  chartConfig,
  cardTitle,
  nameKey,
  cursor = false,
}: DonutChartProps<Dk, Nk>) {
  const chartData = data;
  const [ref, { width }] = useMeasure();
  const widthValue = width || 60;
  const innerRadius = Math.min(105, widthValue * 0.2);

  return (
    <Card className="flex w-full flex-col p-1" ref={ref}>
      <CardHeader className="pb-0">
        <CardTitle
          className={`text-xl font-medium ${cardTitle ? "" : "sr-only"}`}
        >
          {cardTitle}
        </CardTitle>
        <CardDescription className="sr-only">
          {nameKey} for {dataKey}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex-1 p-0 px-0">
        <ChartContainer config={chartConfig} className="aspect-square w-full">
          <PieChart>
            <ChartTooltip
              cursor={cursor}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={innerRadius}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey={nameKey} />}
              className="[&>*]:justify-cente -translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
