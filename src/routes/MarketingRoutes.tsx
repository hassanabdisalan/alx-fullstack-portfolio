import { Route } from "react-router-dom";
import { MarketingRepLayout } from "@/pages/marketing-rep/index/MarketingRepLayout";
import { MarketingRepRepMainPage } from "@/pages/marketing-rep/index/MarketingRepMainPage";
import { MarketingRepCalenderPage } from "@/pages/marketing-rep/MarketingRepCalenderPage";
import { MarketingRepCampaignsPage } from "@/pages/marketing-rep/MarketingRepCampaignsPage";
import { MarketingRepSettingsPage } from "@/pages/marketing-rep/MarketingRepSettingsPage";
import { ProtectedRoute } from "@/components/authz/ProtectedRoute";
import { AppUser } from "@/contexts/AppContext";
// Use a more flexible type for the user

type User = AppUser | null | undefined;

interface MarketingRoutesProps {
 user: User | null | undefined;
  isLoading: boolean | undefined;
}

function MarketingRoutes({ user, isLoading }: MarketingRoutesProps) {
  return (
    <Route
      path="marketing-rep"
      element={
        <ProtectedRoute user={user} isLoading={isLoading}>
          <MarketingRepLayout />
        </ProtectedRoute>
      }
    >
      {/* Main routes */}
      <Route index element={<MarketingRepRepMainPage />} />
      <Route path="campaigns" element={<MarketingRepCampaignsPage />} />
      <Route path="calendar" element={<MarketingRepCalenderPage />} />

      {/* System routes */}
      <Route path="settings" element={<MarketingRepSettingsPage />} />
    </Route>  );
}

export default MarketingRoutes;
