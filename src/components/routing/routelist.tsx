import {
  MdDashboard,
  MdPeople,
  MdCalendarMonth,
  MdQueryStats,
  MdManageAccounts,
  MdInsights,
  MdCampaign,
  MdAnalytics,
  MdAssignmentLate,
  MdAdminPanelSettings,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { RiLineChartFill } from "react-icons/ri";


export const mainLayouts = {
  admin: "/admin",
  customerRep: "/customer-rep",
  marketingRep: "/marketing-rep",
  salesRep: "/sales-rep",
} as const



// Main admin routes
const mainRoutes = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    path: "/admin",
    category: "main",
  },
  {
    name: "Employees",
    icon: MdPeople,
    path: "/admin/employees",
    category: "main",
  },
  {
    name: "Calendar",
    icon: MdCalendarMonth,
    path: "/admin/calendar",
    category: "main",
  },
] as const;

// Sales category
const salesRoutes = [
  {
    name: "Lead Analytics",
    icon: MdQueryStats,
    path: "/admin/lead-analytics",
    category: "sales",
  },
  {
    name: "Lead Management",
    icon: MdManageAccounts,
    path: "/admin/lead-management",
    category: "sales",
  },
] as const;

// Marketing category
const marketingRoutes = [
  {
    name: "Marketing Analytics",
    icon: MdInsights,
    path: "/admin/marketing-analytics",
    category: "marketing",
  },
  {
    name: "Campaigns",
    icon: MdCampaign,
    path: "/admin/marketing-campaigns",
    category: "marketing",
  },
] as const;

// Customer Support category
export const supportRoutes = [
  {
    name: "Support Analytics",
    icon: MdAnalytics,
    path: "/admin/support-analytics",
    category: "support",
  },
  {
    name: "Support Tickets",
    icon: MdAssignmentLate,
    path: "/admin/support-tickets",
    category: "support",
  },
] as const;

export const adminLayoutSidebarRoutes = {
  mainRoutes,
  salesRoutes,
  marketingRoutes,
  supportRoutes,
};

// System routes (for settings, logout, etc.)
export const AdminSystemRoutes = [
  {
    name: "Settings",
    icon: MdSettings,
    path: "/admin/settings",
    category: "system",
  },
] as const;

const mainCustomerRepRoutes = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    path: "/customer-rep",
    category: "main",
  },
  {
    name: "Support Tickets",
    icon: MdAssignmentLate,
    path: "/customer-rep/support-tickets",
    category: "main",
  },
  {
    name: "Calendar",
    icon: MdCalendarMonth,
    path: "/customer-rep/calendar",
    category: "main",
  },
] as const;

export const customerSupprortRepLayoutSidebarRoutes = {
  mainCustomerRepRoutes,
};
// System routes (for settings, logout, etc.)
export const customerRepSystemRoutes = [
  {
    name: "Settings",
    icon: MdSettings,
    path: "/customer-rep/settings",
    category: "system",
  },
] as const;

const mainMarketingRepRoutes = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    path: "/marketing-rep",
    category: "main",
  },
  {
    name: "Campaigns",
    icon: RiLineChartFill,
    path: "/marketing-rep/campaigns",
    category: "main",
  },
  {
    name: "Calendar",
    icon: MdCalendarMonth,
    path: "/marketing-rep/calendar",
    category: "main",
  },
] as const;

export const marketingRepLayoutSidebarRoutes = {
  mainMarketingRepRoutes,
};
// System routes (for settings, logout, etc.)
export const marketingRepSystemRoutes = [
  {
    name: "Settings",
    icon: MdSettings,
    path: "/marketing-rep/settings",
    category: "system",
  },
] as const;

const mainSalesRepRoutes = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    path: "/sales-rep",
    category: "main",
  },
  {
    name: "Campaigns",
    icon: RiLineChartFill,
    path: "/sales-rep/lead-management",
    category: "main",
  },
  {
    name: "Calendar",
    icon: MdCalendarMonth,
    path: "/sales-rep/calendar",
    category: "main",
  },
] as const;

export const salesRepLayoutSidebarRoutes = {
  mainSalesRepRoutes,
};
// System routes (for settings, logout, etc.)
export const salesRepSystemRoutes = [
  {
    name: "Settings",
    icon: MdSettings,
    path: "/sales-rep/settings",
    category: "system",
  },
] as const;
