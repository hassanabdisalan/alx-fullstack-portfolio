import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
  Label,
} from "recharts";
import { useQuery } from "@apollo/client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GET_TICKETS_RESPONSE_TIME } from "@/graphql/tickets";

interface MonthHours {
  hours: number;
  month: string;
}

interface TicketsResponseTimeData {
  ticketsResponseTime: {
    data: MonthHours[];
    message: string;
    status: string;
  };
}

export function TicketsResponseTime() {
  const { data, loading, error } = useQuery<TicketsResponseTimeData>(
    GET_TICKETS_RESPONSE_TIME,
  );

  // const chartData = useMemo(() => {
  //   if (!data?.ticketsResponseTime?.data) return [];
  //   // return data.ticketsResponseTime.data.map((item) => ({
  //   //   month: new Date(item.month).toLocaleString("default", { month: "short" }),
  //   //   hours: item.hours,
  //   // }));
  //   return data.ticketsResponseTime.data
  // }, [data]);
const chartData = data?.ticketsResponseTime.data ??[]


  if (loading) {
    return (
      <Card className="flex h-full flex-col p-6">
        <h6 className="mb-4 font-semibold">Tickets Response Time Trends</h6>
        <div className="flex flex-1 items-center justify-center">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex h-full flex-col p-6">
        <h6 className="mb-4 font-semibold">Tickets Response Time Trends</h6>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <h6 className="text-destructive text-sm">
            Failed to load response time data
          </h6>
          <h6 className="text-muted">{error.message}</h6>
        </div>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="border-muted-foreground h-full w-full rounded-md border p-4">
        <h6 className="text-foreground/80 mb-2 font-medium">
          Tickets Response Time Trends
        </h6>
        <CardContent className="flex h-full items-center px-0">
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <h6 className="text-muted-foreground">
              No response time data available
            </h6>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-foreground/20 bg-background/90 h-full w-full rounded-md border p-4">
      <h6 className="text-foreground/80 mb-2 font-medium">
        Tickets Response Time Trends
      </h6>
      <CardContent className="h-full px-0">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "var(--muted-foreground)", // Tailwind gray-500
              }}
              interval={0}
              padding={{ left: 10, right: 10 }}
              axisLine={{ stroke: "#e5e7eb" }} // Tailwind gray-200
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
                fill: "var(--muted-foreground)",
              }}
              width={40}
              tickMargin={10}
            >
              <Label
                angle={-90}
                value="Hours"
                position="insideLeft"
                style={{
                  textAnchor: "middle",
                  fill: "#6b7280",
                  fontSize: 12,
                }}
              />
            </YAxis>
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#4F46E5" // Tailwind indigo-600
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#4F46E5",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#4F46E5",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
              }}
              formatter={(value: number) => [`${value} hours`, "Response Time"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
