import { GET_LEAD_SOURCES } from "@/graphql/queries/admin";
import { useQuery } from "@apollo/client";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { WidgetLoading } from "../WidgetStatus";

const chartColors = [
  "#facc15", // yellow
  "#16a34a", // green
  "#ef4444", // red
  "#6366f1", // blue
  "#3b82f6", // light blue
  "#eab308", // amber
  "#9333ea", // purple
  "#f97316", // orange
];

const EMPTY_DATA = [
  {
    name: "No Data",
    count: 1,
    color: "var(--muted-foreground)", // light gray
  },
];

export function LeadSourcesPieWidget() {
  const { data, loading, error } = useQuery(GET_LEAD_SOURCES);
  const leadSourcesArray = data?.leadSourcesStats?.data || [];

  if (loading) {
    return <WidgetLoading message="Loading lead sources..." />;
  }

  if (error) {
    return (
      <div
        className="bg-background flex w-full flex-col items-center justify-center p-5"
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid var(--muted-foreground)",
          borderRadius: "5px",
        }}
      >
        <span className="text-foreground mb-4 text-xl font-medium">
          Lead Sources
        </span>
        <div className="flex h-full flex-col items-center justify-center text-red-500">
          <span className="text-lg font-medium">Error</span>
          <span className="text-muted-foreground text-sm">
            Failed to load lead sources
          </span>
        </div>
      </div>
    );
  }

  if (!leadSourcesArray || leadSourcesArray.length === 0) {
    return (
      <div
        className="bg-background flex w-full flex-col p-5"
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid var(--muted-foreground)",
          borderRadius: "5px",
        }}
      >
        <span className="text-foreground mb-4 text-xl font-medium">
          Lead Sources
        </span>
        <div className="relative flex justify-center">
          <ResponsiveContainer width={190} height={190}>
            <PieChart>
              <Pie
                dataKey="count"
                data={EMPTY_DATA}
                cx="50%"
                cy="50%"
                outerRadius={80}
                paddingAngle={0}
                label={false}
                stroke="none"
              >
                <Cell key="empty" fill={EMPTY_DATA[0].color} />
              </Pie>
              <Tooltip content={() => null} /> {/* Disable tooltip */}
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="inline-flex items-center gap-2">
            <div className="inline-block h-3 w-3 rounded-full bg-muted" />
            <span className="text-foreground font-semibold">No Data</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-foreground/20 bg-background/90 h-full w-full rounded-xl border p-4">
      <span className="text-foreground mb-4 text-xl font-medium">
        Lead Sources
      </span>

      <div className="relative flex justify-center">
        <ResponsiveContainer width={190} height={190}>
          <PieChart>
            <Pie
              dataKey="count"
              isAnimationActive={false}
              data={leadSourcesArray}
              cx="50%"
              cy="50%"
              outerRadius={80}
              paddingAngle={2}
              label={false}
              stroke="none"
            >
              {leadSourcesArray.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => {
                const total = leadSourcesArray.reduce(
                  (sum, item) => sum + (item.count ?? 0),
                  0,
                );
                const percentage = ((Number(value) / total) * 100).toFixed(1);
                return [`${value} (${percentage}%)`, name];
              }}
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                padding: "0.5rem",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {leadSourcesArray.map((source, index) => (
          <div
            key={source.name}
            className="inline-flex items-center gap-2"
            style={{ color: chartColors[index % chartColors.length] }}
          >
            <div
              className="inline-block h-3 w-3 rounded-full"
              style={{
                backgroundColor: chartColors[index % chartColors.length],
              }}
            />
            <span className="text-foreground font-bold">{source.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
