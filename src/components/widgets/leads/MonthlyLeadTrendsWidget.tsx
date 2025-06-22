import { MONTHLY_LEAD_TRENDS } from "@/graphql/queries/admin";
import { useQuery } from "@apollo/client";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
  Text,
} from "recharts";
import { WidgetLoading } from "../WidgetStatus";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

interface MonthlyLeadTrendsWidgetProps {}

export function MonthlyLeadTrendsWidget({}: MonthlyLeadTrendsWidgetProps) {
  const { data, loading, error } = useQuery(MONTHLY_LEAD_TRENDS);
  const leadTrendsArray = data?.monthlyLeadTrends?.data || [];
  const totalLeads = data?.monthlyLeadTrends?.totalLeads || 0;

  if (loading) {
    return (
      <WidgetLoading
        title="Monthly Lead Trends"
        message="Loading monthly lead trends..."
      />
    );
  }

  if (error) {
    return (
      <Card className="bg-background w-full rounded-[5px] border border-[var(--muted-foreground)] p-6 shadow-sm">
        <CardTitle className="text-foreground mb-4 font-semibold">
          Monthly Lead Trends
        </CardTitle>
        <CardContent className="flex h-[265px] w-full items-center justify-center text-red-500">
          <div className="text-center">
            <p className="font-medium">Error loading data</p>
            <p className="text-muted-foreground text-sm">
              Please try again later
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Create empty data structure with all months set to 0 if no data exists
  const emptyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    count: 0,
  }));

  const displayData = totalLeads === 0 ? emptyData : leadTrendsArray;

  return (
    <Card className="border-foreground/20 bg-background/90 w-full rounded-[5px] p-6">
      <CardTitle className="text-foreground mb-4 font-semibold">
        Monthly Lead Trends
        {totalLeads === 0 && (
          <span className="text-muted-foreground ml-2 text-sm font-normal">
            (No leads yet)
          </span>
        )}
      </CardTitle>
      <CardContent className="relative h-[265px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={displayData}
            margin={{ top: 20, right: 15, left: 15, bottom: 20 }}
          >
            <CartesianGrid vertical={false} stroke="var(--muted-foreground)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: "var(--foreground)" }}
              tick={{
                fontSize: 14,
                fill: "var(--muted-foreground)",
                fontWeight: 500,
              }}
              interval={0}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 16,
                fontWeight: "500",
                fill: "var(--muted-foreground)",
              }}
              width={30}
              tickMargin={10}
              domain={[0, "auto"]}
            />
            <Line
              type="linear"
              dataKey="count"
              stroke={
                totalLeads === 0 ? "var(--muted-foreground)" : "var(--primary)"
              } // Gray for empty state
              strokeWidth={2}
              dot={{
                r: 4,
                fill:
                  totalLeads === 0
                    ? "var(--muted-foreground)"
                    : "var(--primary)",
                stroke: "var(--muted-foreground)",
                strokeWidth: 2,
              }}
              activeDot={
                totalLeads === 0
                  ? false
                  : {
                      r: 6,
                      fill: "var(--primary)",
                      stroke: "var(--muted-foreground)",
                      strokeWidth: 2,
                    }
              }
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid var(--muted-foreground)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                fontSize: 12,
              }}
              formatter={(value) =>
                totalLeads === 0
                  ? ["0 leads", "No data"]
                  : [`${value} leads`, "Count"]
              }
            />
          </LineChart>
        </ResponsiveContainer>

        {totalLeads === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-background bg-opacity-80 rounded p-2">
              <p className="text-muted-foreground text-sm">No leads recorded</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
