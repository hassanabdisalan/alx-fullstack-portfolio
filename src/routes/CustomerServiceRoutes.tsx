import { Route } from "react-router-dom";
import { CustomerRepLayout } from "@/pages/custome-service-rep/index/CustomerServiceRepLayout";
import { CustomerServiceRepMainPage } from "@/pages/custome-service-rep/index/CustomerServiceRepMainPage";
import { CustomerServiceRepSupportTicketsPage } from "@/pages/custome-service-rep/CustomerServiceRepSupportTicketsPage";
import { CustomerServiceRepCalenderPage } from "@/pages/custome-service-rep/CustomerServiceRepCalenderPage";
import { CustomerServiceRepSettingsPage } from "@/pages/custome-service-rep/CustomerServiceRepSettingsPage";
import { ProtectedRoute } from "@/components/authz/ProtectedRoute";

// Use a more flexible type for the user
interface User {
  [key: string]: any;
}

interface CustomerServiceRoutesProps {
  user: User | null | undefined;
  isLoading: boolean | undefined;
}

function CustomerServiceRoutes({ user, isLoading }: CustomerServiceRoutesProps) {
    return (
    <Route
      path="customer-rep"
      element={
        <ProtectedRoute user={user} isLoading={isLoading}>
          <CustomerRepLayout />
        </ProtectedRoute>
      }
    >
      {/* Main routes */}
      <Route index element={<CustomerServiceRepMainPage />} />
      <Route
        path="support-tickets"
        element={<CustomerServiceRepSupportTicketsPage />}
      />
      <Route
        path="support-tickets"
        element={<div className="h-screen w-full text-10xl">SUPPORT</div>}
      />
      <Route path="calendar" element={<CustomerServiceRepCalenderPage />} />

      {/* System routes */}
      <Route path="settings" element={<CustomerServiceRepSettingsPage />} />
    </Route>
  );
}

export default CustomerServiceRoutes;
