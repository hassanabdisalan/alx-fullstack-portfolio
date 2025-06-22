import { LEAD_CONVERSIONS } from "@/graphql/queries/admin";
import { useQuery } from "@apollo/client";
import { RiArrowRightUpLine, RiArrowRightDownLine } from "react-icons/ri";
import { useMemo } from "react";
import { WidgetLoading, WidgetEmpty } from "../WidgetStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConversionRatesWidgetProps {}

export function ConversionRatesWidget({}: ConversionRatesWidgetProps) {
  const { data, loading, error } = useQuery(LEAD_CONVERSIONS);

  const { signupRate, purchaseRate } = useMemo(() => {
    const d = data?.LeadConversionRates ?? {};

    const signup = {
      rate: d.conversionRate ?? 0,
      change: d.conversionDelta ?? 0,
      visitors: d.totalVisitors ?? 0,
    };

    const purchase = {
      rate:
        (d.totalVisitors ?? 0) > 0
          ? ((d.totalSales ?? 0) / (d.totalVisitors ?? 1)) * 100
          : 0,
      change: d.salesDelta ?? 0,
      visitors: d.totalSales ?? 0,
    };

    return { signupRate: signup, purchaseRate: purchase };
  }, [data]);

  if (loading) {
    return (
      <WidgetLoading
        title="Conversion Rates"
        message="Loading conversion rates..."
      />
    );
  }

  // Show empty only if query fails completely
  if (error || !data?.LeadConversionRates) {
    return <WidgetEmpty message="No conversion data available" />;
  }

  return (
    <Card className="border-foreground/20 pretty-scrollbar bg-background/90 h-full max-h-52 w-full rounded-xl px-4 py-2">
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-semibold">
          Conversion Rates
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        {/* Signup Rate Row */}
        <div className="mb-2">
          <div className="bg-background mb-2 h-3 w-full overflow-hidden rounded">
            <div
              className="h-full rounded bg-blue-600"
              style={{ width: `${Math.min(signupRate.rate, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 rounded-lg bg-blue-600" />
              <h6 className="font-semibold">{signupRate.rate.toFixed(1)}%</h6>
              {signupRate.change !== 0 && (
                <div
                  className={`flex items-center font-medium ${
                    signupRate.change > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {signupRate.change > 0 ? (
                    <RiArrowRightUpLine className="text-sm" />
                  ) : (
                    <RiArrowRightDownLine className="text-sm" />
                  )}
                  <span className="ml-0.5 text-xs">
                    {Math.abs(signupRate.change).toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-slate-500">
              {signupRate.visitors.toLocaleString()} visitor signups
            </p>
          </div>
        </div>

        {/* Purchase Rate Row */}
        <div>
          <div className="mb-2 h-3 w-full overflow-hidden rounded bg-slate-100">
            <div
              className="h-full rounded bg-red-600"
              style={{ width: `${Math.min(purchaseRate.rate, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 rounded-lg bg-red-600" />
              <h6 className="font-semibold">{purchaseRate.rate.toFixed(1)}%</h6>
              {purchaseRate.change !== 0 && (
                <div
                  className={`flex items-center font-medium ${
                    purchaseRate.change > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {purchaseRate.change > 0 ? (
                    <RiArrowRightUpLine className="text-sm" />
                  ) : (
                    <RiArrowRightDownLine className="text-sm" />
                  )}
                  <span className="ml-0.5 text-xs">
                    {Math.abs(purchaseRate.change).toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-slate-500">
              {purchaseRate.visitors.toLocaleString()} purchases
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
