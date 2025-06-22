import { JSX } from "react";
import { useState, useEffect } from "react";
import { SimpleFlowbizTable } from "@/components/admin-dashboard/tables/SimpleFlowbizTable";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Download } from "lucide-react";
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { GET_CAMPAIGNS } from "@/graphql/queries/admin";


import { columns } from "./Columns_data";
import { useQuery } from "@apollo/client";
import { SOCIAL_MEDIA_PERFORMANCE } from "@/graphql/socials-analytics";

interface SocialMediaRow {
  id: number;
  source: string;
  icon: JSX.Element;
  likes: number | string;
  comments: number | string;
  views: number | string;
  reposts: number | string;
  retweets: number | string;
  link: string;
}

export function SocialMediaPerformanceTable() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>();
  const [tableData, setTableData] = useState<SocialMediaRow[]>([]);

  const { data: campaignsData } = useQuery(GET_CAMPAIGNS);
  const { data: socialsData, loading, error } = useQuery(SOCIAL_MEDIA_PERFORMANCE);
  // Initialize table data with all platforms
  useEffect(() => {
    const platforms = [
      {
        id: 1,
        source: "LinkedIn",
        icon: <FaLinkedin className="text-[#0077B5]" size={20} />,
        link: "https://linkedin.com",
        data: socialsData?.SocialMediaPerformance?.analytics?.find(
          (item: any) => item.platform?.toLowerCase() === 'linkedin'
        )?.data || null,
      },
      {
        id: 2,
        source: "X (Twitter)",
        icon: <FaTwitter className="text-foreground" size={20} />,
        link: "https://twitter.com",
        data: socialsData?.SocialMediaPerformance?.analytics?.find(
          (item: any) => item.platform?.toLowerCase() === 'twitter' || item.platform?.toLowerCase() === 'x'
        )?.data || null,
      },
      {
        id: 3,
        source: "Facebook",
        icon: <FaFacebook className="text-[#1877F2]" size={20} />,
        link: "https://facebook.com",
        data: socialsData?.SocialMediaPerformance?.analytics?.find(
          (item: any) => item.platform?.toLowerCase() === 'facebook'
        )?.data || null,
      },
      {
        id: 4,
        source: "Instagram",
        icon: <FaInstagram className="text-[#E4405F]" size={20} />,
        link: "https://instagram.com",
        data: socialsData?.SocialMediaPerformance?.analytics?.find(
          (item: any) => item.platform?.toLowerCase() === 'instagram'
        )?.data || null,
      },
      {
        id: 5,
        source: "TikTok",
        icon: <FaTiktok className="text-[#000000]" size={20} />,
        link: "https://tiktok.com",
        data: socialsData?.SocialMediaPerformance?.analytics?.find(
          (item: any) => item.platform?.toLowerCase() === 'tiktok'
        )?.data || null,
      },
    ];

    const formattedData: SocialMediaRow[] = platforms.map((platform) => ({
      id: platform.id,
      source: platform.source,
      icon: platform.icon,
      likes: platform.data?.likes ?? "--",
      comments: platform.data?.comments ?? "--",
      views: platform.data?.views ?? "--",
      reposts: platform.data?.reposts ?? "--",
      retweets: platform.data?.retweets ?? "--",
      link: platform.link,
    }));

    setTableData(formattedData);
  }, [socialsData]);

  // Handle campaign selection (for future campaign-specific data)
  const handleChange = (campaignId: string) => {
    setSelectedCampaign(campaignId);
  };
  const renderCustomControls = () => (
    <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h3 className="text-lg font-semibold">Social Media Performance</h3>

      <div className="flex flex-wrap gap-2">
        <Select value={selectedCampaign} onValueChange={handleChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Campaign" />
          </SelectTrigger>
          <SelectContent>
            {(campaignsData?.campaigns?.campaigns ?? []).map((campaign: any) => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Date
        </Button>

        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full">
        {renderCustomControls()}
        <div className="flex items-center justify-center p-8">
          <div className="text-muted-foreground">Loading social media data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        {renderCustomControls()}
        <div className="flex items-center justify-center p-8">
          <div className="text-destructive">Failed to load social media data</div>
        </div>
      </div>
    );
  }

  return (
    <SimpleFlowbizTable
      key={tableData.length}
      data={tableData}
      columns={columns}
      renderCustomControls={renderCustomControls}
    />
  );
}
