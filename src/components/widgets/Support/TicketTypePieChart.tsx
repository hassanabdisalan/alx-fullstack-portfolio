import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, PieChart as PieChartIcon } from "lucide-react";
import { GET_TICKET_TYPE_DISTRIBUTION } from "@/graphql/tickets";

interface TicketDistribution {
  percentage: number;
  ticketType: string;
}

interface TicketTypeDistributionData {
  ticketTypeDistribution: {
    distribution: TicketDistribution[];
    message: string;
    status: string;
  };
}

const COLORS = [
  "#0052cc", // Blue (Technical)
  "#F5A623", // Orange/Yellow (Complains)
  "#7ED321", // Green (Payments)
  "#D0021B", // Red (Inquiries)
];

export function TicketTypePieChart() {
  const { data, loading, error } = useQuery<TicketTypeDistributionData>(
    GET_TICKET_TYPE_DISTRIBUTION,
  );

  const chartData = useMemo(() => {
    if (!data?.ticketTypeDistribution?.distribution) return [];
    return data.ticketTypeDistribution.distribution.map((item, index) => ({
      name: item.ticketType,
      value: item.percentage,
      color: COLORS[index % COLORS.length],
    }));
  }, [data]);

  if (loading) {
    return (
      <Card className="flex h-[300px] w-full flex-col items-center justify-center p-6">
        <Skeleton className="mb-4 h-6 w-32" />
        <Skeleton className="h-48 w-48 rounded-full" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex h-[300px] w-full flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-destructive/10 rounded-full p-3">
            <AlertCircle className="text-destructive h-8 w-8" />
          </div>
          <div>
            <h6 className="text-destructive mb-1 font-semibold">
              Failed to load data
            </h6>
            <p className="text-muted-foreground text-sm">
              Could not fetch ticket distribution. Please try again later.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="flex h-[300px] w-full flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-primary/10 rounded-full p-3">
            <PieChartIcon className="text-primary h-8 w-8" />
          </div>
          <div>
            <h6 className="font-muted mb-1">No ticket data available</h6>
            <p className="text-muted-foreground text-sm">
              There are no tickets to display in the selected time period.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h6 className="text-foreground/80 mb-2 font-medium">
        Ticket Type Distribution
      </h6>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}\n${(percent * 100).toFixed(1)}%`
              }
              isAnimationActive={true}
              animationDuration={500}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props) => [
                `${value.toFixed(1)}%`,
                props.payload.name,
              ]}
              contentStyle={{
                background: "rgba(255, 255, 255, 0.96)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "8px 12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend-like Labels */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">
              {item.name} ({item.value.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
