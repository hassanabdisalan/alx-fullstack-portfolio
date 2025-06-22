import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectedAccounts } from "./ConnectedAccounts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

interface SocialMediaDashboardProps {}

export function SocialMediaDashboard({}: SocialMediaDashboardProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Social Media Integrations</h1>
      <div>
        <Tabs defaultValue="accounts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="space-y-6 pt-4">
            <ConnectedAccounts />
          </TabsContent>
          
          <TabsContent value="analytics" className="pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <SocialCard 
                platform="Facebook" 
                icon={<FaFacebook className="h-5 w-5 text-[#1877F2]" />}
                followers={5642}
                engagement={8.7}
                growth={2.3}
              />
              <SocialCard 
                platform="Twitter" 
                icon={<BsTwitterX className="h-5 w-5 text-[#1DA1F2]" />}
                followers={2134}
                engagement={5.2}
                growth={-1.2}
              />
              <SocialCard 
                platform="Instagram" 
                icon={<FaInstagram className="h-5 w-5 text-[#E1306C]" />}
                followers={8976}
                engagement={12.5}
                growth={4.6}
              />
              <SocialCard 
                platform="LinkedIn" 
                icon={<FaLinkedin className="h-5 w-5 text-[#0077B5]" />}
                followers={3214}
                engagement={3.8}
                growth={1.9}
              />
              <SocialCard 
                platform="TikTok" 
                icon={<FaTiktok className="h-5 w-5" />}
                followers={1576}
                engagement={15.3}
                growth={8.7}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>
                  Configure how your social media accounts sync with the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Settings panel coming soon. Here you'll be able to configure posting schedules,
                  auto-responses, and content synchronization options.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface SocialCardProps {
  platform: string;
  icon: React.ReactNode;
  followers: number;
  engagement: number;
  growth: number;
}

function SocialCard({ platform, icon, followers, engagement, growth }: SocialCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle className="text-sm font-medium">{platform}</CardTitle>
        </div>
        <span 
          className={`text-xs font-medium ${
            growth >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {growth >= 0 ? "+" : ""}{growth}%
        </span>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Followers</p>
            <p className="text-xl font-bold">{followers.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Engagement</p>
            <p className="text-xl font-bold">{engagement}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
