import { Routes, Route } from 'react-router-dom';

// Import admin components directly
import { AdminLayout } from './index/AdminLayout';
import { AdminRootPage } from './index/AdminRootPage';
import { AdminEmployeesPage } from './AdminEmployeesPage';
import { AdminCalenderPage } from './AdminCalenderPage';
import { AdminLeadAnaluticspage } from './AdminLeadAnaluticspage';
import { AdminLeadManagemnetPage } from './AdminLeadManagemnetPage';
import { AdminMarketingpage } from './AdminMarketingpage';
import { AdminMarketingCompaigns } from './AdminMarketingCompaigns';
import { AdminSupportAnalytics } from './AdminSupportAnalytics';
import { AdminSupportTickets } from './AdminSupportTickets';
import { AdminSettingsPage } from './AdminSettingsPage';

export default function AdminRoutes() {
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
