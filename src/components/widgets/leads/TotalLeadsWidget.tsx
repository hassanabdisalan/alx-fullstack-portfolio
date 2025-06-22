import { MONTHLY_LEAD_TRENDS } from "@/graphql/queries/admin";
import { LEADS_SUMMARY } from "@/graphql/queries/admin";
import { useQuery } from "@apollo/client";
import { WidgetEmpty, WidgetLoading } from "../WidgetStatus";

interface LeadStatus {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

const STATUS_COLORS: Record<string, string> = {
  Completed: "bg-primary",
  Ongoing: "bg-primary",
  Awaiting: "bg-primary",
};

export function TotalLeadsWidget() {
  const { data, loading, error } = useQuery(LEADS_SUMMARY);

  if (loading) {
    return <WidgetLoading message="Loading leads data..." />;
  }



  const errorMessage = error?.message;
  if (errorMessage && errorMessage.length > 1 && !data) {
    if (import.meta.env.DEV) {
      return <WidgetEmpty message={errorMessage} />;
    }
    return <WidgetEmpty message={"Error loading data"} />;
  }

  // const totalLeads = data?.monthlyLeadTrends?.totalLeads || 0;
  const totalLeads = data?.leadSummary?.total || 0;
  const completed = data?.leadSummary?.completed || 0;
  const ongoing = data?.leadSummary?.ongoing || 0;
  const awaiting = data?.leadSummary?.awaiting || 0;
  const monthlyIncrease = data?.leadSummary?.monthlyIncrease || 0;

  const leadStatuses: LeadStatus[] = [
    {
      status: "Completed",
      count: completed,
      percentage: totalLeads ? Math.round((completed / totalLeads) * 100) : 0,
      color: STATUS_COLORS.Completed,
    },
    {
      status: "Ongoing",
      count: ongoing,
      percentage: totalLeads ? Math.round((ongoing / totalLeads) * 100) : 0,
      color: STATUS_COLORS.Ongoing,
    },
    {
      status: "Awaiting",
      count: awaiting,
      percentage: totalLeads ? Math.round((awaiting / totalLeads) * 100) : 0,
      color: STATUS_COLORS.Awaiting,
    },
  ];

  return (
    <div className="rounded-x l pretty-scrollbar border-foreground/20 bg-background/90 flex h-full max-h-52 w-full rounded-xl border p-3">
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-foreground/90 mb-1 text-lg font-semibold">
            Total Leads
          </h3>
          <p className="text-foreground/80 mb-2 text-2xl leading-10 font-bold">
            {totalLeads.toLocaleString()}
          </p>
        </div>

        {totalLeads > 0 ? (
          <p className="text-muted-foreground text-sm">
            The number of Leads{" "}
            {monthlyIncrease >= 0 ? "increased" : "decreased"} by{" "}
            <span
              className={`font-semibold ${
                monthlyIncrease >= 0 ? "text-blue-600" : "text-red-500"
              }`}
            >
              {Math.abs(monthlyIncrease)}%
            </span>{" "}
            this month
          </p>
        ) : (
          <p className="text-foreground text-xs">No leads recorded yet</p>
        )}
      </div>

      <div className="flex-1">
        {leadStatuses.map((status, index) => (
          <div
            key={status.status}
            className={index < leadStatuses.length - 1 ? "mb-2" : ""}
          >
            <div className="mb-0.5 flex items-center justify-between">
              <span className="text-foreground text-xs font-medium">
                {status.status}
              </span>
              {totalLeads > 0 ? (
                <span className="text-primary text-xs font-semibold">
                  {status.count.toLocaleString()} ({status.percentage}%)
                </span>
              ) : (
                <span className="text-foreground text-xs">0 (0%)</span>
              )}
            </div>
            <div className="h-2.5 w-full">
              <div
                className={`h-full rounded ${status.color}`}
                style={{ width: `${status.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
