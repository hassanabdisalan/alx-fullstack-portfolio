/**
 * Routes index file
 * Exports all route components for code-splitting optimization
 */

// Export the main AppRoutes component
export { default as AppRoutes } from '../components/routing/AppRoutes';

// Export section-specific route bundles
export { default as AdminRoutes } from './AdminRoutes';
export { default as AuthRoutes } from './AuthRoutes';
export { default as CustomerServiceRoutes } from './CustomerServiceRoutes';
export { default as MarketingRoutes } from './MarketingRoutes';
export { default as SalesRoutes } from './SalesRoutes';
