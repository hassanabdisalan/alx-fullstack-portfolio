import { Suspense, lazy, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./NotFound";
import { ProtectedRoute } from "../authz/ProtectedRoute";
import { useViewer } from "@/hooks/use-viewr";
import { ErrorBoundary } from "../error/ErrorBoundary";
import { LoadingComponent } from "./LoadingComponent";
import { usePathnameTitle } from "@/hooks/usepathnameTitle";

// Lazy load page bundles by route group
const AdminRoutes = lazy(() => import("@/pages/admin"));
const CustomerServiceRoutes = lazy(() => import("@/pages/custome-service-rep"));
const MarketingRoutes = lazy(() => import("@/pages/marketing-rep"));
const SalesRoutes = lazy(() => import("@/pages/sales-rep"));
const AuthRoutes = lazy(() => import("@/pages/auth"));

// Lazy load individual page components
const Homepage = lazy(() => import("@/pages/Homepage").then(module => ({default: module.Homepage})));
const BetterUserCalender = lazy(() => import("../dashboard/calender/BetterUserCalender").then(module => ({default: module.BetterUserCalender})));
const TermsPage = lazy(() => import("@/pages/TermsPage").then(module => ({default: module.TermsPage})));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPage").then(module => ({default: module.PrivacyPolicyPage})));
const SupportPage = lazy(() => import("@/pages/SupportPage").then(module => ({default: module.SupportPage})));
const AcceptInvitePage = lazy(() => import("@/pages/invite/AcceptInvitePage").then(module => ({default: module.AcceptInvitePage})));



// Create a wrapper component for lazy-loaded routes with error handling
interface LazyRouteProps {
  children: ReactNode;
}

const LazyRoute: React.FC<LazyRouteProps> = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingComponent />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

interface AppRoutesProps {}

export function AppRoutes({}: AppRoutesProps) {
  usePathnameTitle();
  const { user, isLoading } = useViewer();

  return (
    <Routes>
      {/* Home route */}
      <Route
        path="/"
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <LazyRoute>
              <Homepage />
            </LazyRoute>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/test"
        element={
          <LazyRoute>
            <BetterUserCalender />
          </LazyRoute>
        }
      />

      {/* Standalone pages */}
      <Route
        path="/terms"
        element={
          <LazyRoute>
            <TermsPage />
          </LazyRoute>
        }
      />
      
      <Route
        path="/privacy"
        element={
          <LazyRoute>
            <PrivacyPolicyPage />
          </LazyRoute>
        }
      />
      
      <Route
        path="/support"
        element={
          <LazyRoute>
            <SupportPage />
          </LazyRoute>
        }
      />
      
      <Route
        path="/accept-invite"
        element={
          <LazyRoute>
            <AcceptInvitePage />
          </LazyRoute>
        }
      />

      {/* Auth Routes - Lazy Loaded */}
      <Route 
        path="/*" 
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
          <LazyRoute>
            <AuthRoutes />
          </LazyRoute>
          </ProtectedRoute>
        } 
      />

      {/* Admin Routes - Lazy Loaded */}
      <Route 
        path="admin/*" 
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <LazyRoute>
              <AdminRoutes />
            </LazyRoute>
          </ProtectedRoute>
        } 
      />
      
      {/* Customer Service Routes - Lazy Loaded */}
      <Route 
        path="customer-rep/*" 
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <LazyRoute>
              <CustomerServiceRoutes />
            </LazyRoute>
          </ProtectedRoute>
        } 
      />
      
      {/* Marketing Routes - Lazy Loaded */}
      <Route 
        path="marketing-rep/*" 
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <LazyRoute>
              <MarketingRoutes />
            </LazyRoute>
          </ProtectedRoute>
        } 
      />
      
      {/* Sales Routes - Lazy Loaded */}
      <Route 
        path="sales-rep/*" 
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <LazyRoute>
              <SalesRoutes />
            </LazyRoute>
          </ProtectedRoute>
        } 
      />

      {/* 404 page for non-matching routes - keep this at the end */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Export the AppRoutes component as the default export for better compatibility
export default AppRoutes;
