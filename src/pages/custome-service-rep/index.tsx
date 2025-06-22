import { Routes, Route } from 'react-router-dom';

// Import customer service components directly
import { CustomerRepLayout } from './index/CustomerServiceRepLayout';
import { CustomerServiceRepMainPage } from './index/CustomerServiceRepMainPage';
import { CustomerServiceRepSupportTicketsPage } from './CustomerServiceRepSupportTicketsPage';
import { CustomerServiceRepCalenderPage } from './CustomerServiceRepCalenderPage';
import { CustomerServiceRepSettingsPage } from './CustomerServiceRepSettingsPage';

export default function CustomerServiceRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerRepLayout />}>
        <Route index element={<CustomerServiceRepMainPage />} />
        <Route path="support-tickets" element={<CustomerServiceRepSupportTicketsPage />} />
        <Route path="calendar" element={<CustomerServiceRepCalenderPage />} />
        <Route path="settings" element={<CustomerServiceRepSettingsPage />} />
      </Route>
    </Routes>
  );
}
