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
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { SOCIAL_MEDIA_ANALYTICS } from "@/graphql/socials-analytics";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";

// Chart configuration for shadcn/ui charts
const chartConfig = {
  linkedin: {
    label: "LinkedIn",
    color: "#0077b5", // LinkedIn blue
  },
  facebook: {
    label: "Facebook",
    color: "#1877f2", // Facebook blue
  },
  instagram: {
    label: "Instagram",
    color: "#e4405f", // Instagram pink
  },
  tiktok: {
    label: "TikTok",
    color: "#000000", // TikTok black
  },
  twitter: {
    label: "X (Twitter)",
    color: "#1da1f2", // Twitter blue
  },
} satisfies ChartConfig;

export function MarketingPerfomanceCardWidget() {
  const { data, loading, error } = useQuery(SOCIAL_MEDIA_ANALYTICS);

  const chartData = useMemo(() => {
    if (!data?.socialMonthlyAnalytics?.analytics) return [];
    
    // Process analytics data from all platforms
    const analytics = data.socialMonthlyAnalytics.analytics;
   // Get all unique months from all platforms
    const allMonths = new Set<string>();
    
    analytics.forEach(platformAnalytics => {
      platformAnalytics.data?.forEach(item => {
        if (item.monthYear) {
          allMonths.add(item.monthYear);
        }
      });
    });
    
    // Convert to sorted array
    const months = Array.from(allMonths).sort();
    
    // Create aggregated data for each month
    const aggregatedData = months.map(monthYear => {
      const monthData: any = {
        month: monthYear,
        linkedin: 0,
        facebook: 0,
        instagram: 0,
        tiktok: 0,
        twitter: 0,
      };

      // Process each platform's data for this month
      analytics.forEach(platformAnalytics => {
        const platform = platformAnalytics.platform?.toLowerCase();
        const monthDataForPlatform = platformAnalytics.data?.find(item => 
          item.monthYear === monthYear
        );

        if (monthDataForPlatform && platform) {
          if (platform === 'linkedin') {
            monthData.linkedin = monthDataForPlatform.totalLikes || 0;
          } else if (platform === 'twitter' || platform === 'x') {
            monthData.twitter = monthDataForPlatform.totalLikes || 0;
          } else if (platform === 'facebook') {
            monthData.facebook = monthDataForPlatform.totalLikes || 0;
          } else if (platform === 'instagram') {
            monthData.instagram = monthDataForPlatform.totalLikes || 0;
          } else if (platform === 'tiktok') {
            monthData.tiktok = monthDataForPlatform.totalLikes || 0;
          }
        }
      });

      return monthData;
    });

    return aggregatedData;
  }, [data]);

  if (loading) {
    return (
      <Card className="flex flex-col w-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Marketing Performance</CardTitle>
          <CardDescription>Loading social media analytics...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="flex flex-col w-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Marketing Performance</CardTitle>
          <CardDescription>Failed to load analytics data</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-muted-foreground">Error loading data</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Marketing Performance</CardTitle>
        <CardDescription>Social media engagement across platforms</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[305px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            barCategoryGap="20%"
            barGap={4}
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
              domain={[0, "dataMax + 10"]}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="linkedin"
              fill="#0077b5"
              name="LinkedIn"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="facebook"
              fill="#1877f2"
              name="Facebook"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="instagram"
              fill="#e4405f"
              name="Instagram"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="tiktok"
              fill="#000000"
              name="TikTok"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="twitter"
              fill="#1da1f2"
              name="X (Twitter)"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "#0077b5" }}
            />
            <span className="text-sm font-medium">LinkedIn</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "#1877f2" }}
            />
            <span className="text-sm font-medium">Facebook</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "#e4405f" }}
            />
            <span className="text-sm font-medium">Instagram</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "#000000" }}
            />
            <span className="text-sm font-medium">TikTok</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "#1da1f2" }}
            />
            <span className="text-sm font-medium">X (Twitter)</span>
          </div>
        </div>
        <div className="text-center text-muted-foreground leading-none">
          Engagement metrics across social media platforms
        </div>
      </CardFooter>
    </Card>
  );
}
