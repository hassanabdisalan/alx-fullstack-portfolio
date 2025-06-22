import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { WidgetLoading } from "../WidgetStatus";
import { EmptyTotalOpenTicketsWidget, ErrorStateWidget } from "../WidgetStatus";
import { GET_TICKET_STATUS_COUNT } from "@/graphql/tickets";

// Chart configuration for shadcn/ui charts
const chartConfig = {
  count: {
    label: "Tickets",
    color: "hsl(var(--chart-1))",
  },
  Open: {
    label: "Open",
    color: "#0052cc",
  },
  Closed: {
    label: "Closed", 
    color: "#10b981",
  },
  In_Progress: {
    label: "In Progress",
    color: "#f59e0b",
  },
  Awaiting: {
    label: "Awaiting",
    color: "#6366f1",
  },
  Rejected: {
    label: "Rejected",
    color: "#ef4444",
  },
} satisfies ChartConfig;

interface TicketStatus {
  ticketStatus: string;
  count: number;
}

interface TicketStatusReport {
  distribution: TicketStatus[];
  message: string | null;
  status: string;
}

export function OpenTicketsWidget() {
  const { data, loading, error } = useQuery<{
    ticketStatusCount: TicketStatusReport;
  }>(GET_TICKET_STATUS_COUNT);

  const { totalTickets, statusData, isEmpty } = useMemo(() => {
    const distribution = data?.ticketStatusCount?.distribution ?? [];
    const total = distribution.reduce((sum, item) => sum + item.count, 0);
    const processedData = distribution.map((item) => ({
      status: item.ticketStatus,
      count: item.count,
      fill: chartConfig[item.ticketStatus as keyof typeof chartConfig]?.color || "#64748b",
    }));
    processedData.sort((a, b) => b.count - a.count);

    return {
      totalTickets: total,
      statusData: processedData,
      isEmpty: total === 0,
    };
  }, [data]);

  if (loading) return <WidgetLoading />;

  if (error)
    return (
      <ErrorStateWidget
        message={" Couldn't load ticket status data. Please try again."}
      />
    );

  if (isEmpty) return <EmptyTotalOpenTicketsWidget />;

  return (
    <Card className="border-foreground/20 pretty-scrollbar bg-background/90 h-full max-h-52 w-full rounded-xl border p-4">

      <CardContent className="flex h-full gap-4 p-0 justify-between ">
        <div className="flex flex-col justify-between w-2/5 h-full">
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-semibold">Open Tickets</CardTitle>
          <div className="mb-1 text-3xl font-bold">
            {totalTickets.toLocaleString()}
          </div>
      </CardHeader>
          <p className="text-muted-foreground mb-3 text-sm">
            Tickets by current status
          </p>
        </div>

        {/* Right - Chart */}
        <div className=" h-full w-3/5  ">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              data={statusData}
              layout="vertical"
              barCategoryGap={10}
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="status"
                width={80}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 13 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar 
                dataKey="count" 
                radius={[0, 4, 4, 0]} 
                barSize={16}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
