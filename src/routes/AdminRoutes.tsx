import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/pages/admin/index/AdminLayout";
import { AdminRootPage } from "@/pages/admin/index/AdminRootPage";
import { AdminEmployeesPage } from "@/pages/admin/AdminEmployeesPage";
import { AdminCalenderPage } from "@/pages/admin/AdminCalenderPage";
import { AdminLeadAnaluticspage } from "@/pages/admin/AdminLeadAnaluticspage";
import { AdminLeadManagemnetPage } from "@/pages/admin/AdminLeadManagemnetPage";
import { AdminMarketingpage } from "@/pages/admin/AdminMarketingpage";
import { AdminMarketingCompaigns } from "@/pages/admin/AdminMarketingCompaigns";
import { AdminSupportAnalytics } from "@/pages/admin/AdminSupportAnalytics";
import { AdminSupportTickets } from "@/pages/admin/AdminSupportTickets";
import { AdminSettingsPage } from "@/pages/admin/AdminSettingsPage";

interface AdminRoutesProps {}

function AdminRoutes({}: AdminRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Main routes */}
        <Route index element={<AdminRootPage />} />
        <Route path="employees" element={<AdminEmployeesPage />} />
        <Route path="calendar" element={<AdminCalenderPage />} />

        {/* Sales routes */}
        <Route path="lead-analytics" element={<AdminLeadAnaluticspage />} />
        <Route path="lead-management" element={<AdminLeadManagemnetPage />} />

        {/* Marketing routes */}
        <Route path="marketing-analytics" element={<AdminMarketingpage />} />
        <Route path="marketing-campaigns" element={<AdminMarketingCompaigns />} />

        {/* Support routes */}
        <Route path="support-analytics" element={<AdminSupportAnalytics />} />
        <Route path="support-tickets" element={<AdminSupportTickets />} />
        
        {/* System routes */}
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
