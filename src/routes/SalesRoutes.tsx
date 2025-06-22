import { Route } from "react-router-dom";
import { SalesRepLayout } from "@/pages/sales-rep/index/SalesRepLayout";
import { SalesRepRepMainPage } from "@/pages/sales-rep/index/SalesRepRepMainPage";
import { SalesRepLeadManagementPage } from "@/pages/sales-rep/SalesRepLeadManagementPage";
import { SalesRepCalenderPage } from "@/pages/sales-rep/SalesRepCalenderPage";
import { SalesRepSettingsPage } from "@/pages/sales-rep/SalesRepSettingsPage";
import { ProtectedRoute } from "@/components/authz/ProtectedRoute";
import { AppUser } from "@/contexts/AppContext";
// Use a more flexible type for the user
type User = AppUser | null | undefined;

interface SalesRoutesProps {
  user: User;
  isLoading: boolean | undefined;
}

function SalesRoutes({ user, isLoading }: SalesRoutesProps) {
  return (
    <Route
      path="sales-rep"
      element={
        <ProtectedRoute user={user} isLoading={isLoading}>
          <SalesRepLayout />
        </ProtectedRoute>
      }
    >
      {/* Main routes */}
      <Route index element={<SalesRepRepMainPage />} />
      <Route
        path="lead-management"
        element={<SalesRepLeadManagementPage />}
      />
      <Route path="calendar" element={<SalesRepCalenderPage />} />

      {/* System routes */}
      <Route path="settings" element={<SalesRepSettingsPage />} />
    </Route>  );
}

export default SalesRoutes;
