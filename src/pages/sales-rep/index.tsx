import { Routes, Route } from 'react-router-dom';

// Import sales components directly
import { SalesRepLayout } from './index/SalesRepLayout';
import { SalesRepRepMainPage } from './index/SalesRepRepMainPage';
import { SalesRepLeadManagementPage } from './SalesRepLeadManagementPage';
import { SalesRepCalenderPage } from './SalesRepCalenderPage';
import { SalesRepSettingsPage } from './SalesRepSettingsPage';

export default function SalesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SalesRepLayout />}>
        <Route index element={<SalesRepRepMainPage />} />
        <Route
          path="lead-management"
          element={<SalesRepLeadManagementPage />}
        />
        <Route path="calendar" element={<SalesRepCalenderPage />} />
        <Route path="settings" element={<SalesRepSettingsPage />} />
      </Route>
    </Routes>
  );
}
