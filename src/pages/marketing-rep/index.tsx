import { Routes, Route } from 'react-router-dom';

// Import marketing components directly
import { MarketingRepLayout } from './index/MarketingRepLayout';
import { MarketingRepRepMainPage } from './index/MarketingRepMainPage';
import { MarketingRepCalenderPage } from './MarketingRepCalenderPage';
import { MarketingRepCampaignsPage } from './MarketingRepCampaignsPage';
import { MarketingRepSettingsPage } from './MarketingRepSettingsPage';

export default function MarketingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MarketingRepLayout />}>
        <Route index element={<MarketingRepRepMainPage />} />
        <Route path="calendar" element={<MarketingRepCalenderPage />} />
        <Route path="campaigns" element={<MarketingRepCampaignsPage />} />
        <Route path="settings" element={<MarketingRepSettingsPage />} />
      </Route>
    </Routes>
  );
}
