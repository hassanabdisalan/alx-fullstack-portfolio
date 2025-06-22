
import { LoadingComponent } from "@/components/routing/LoadingComponent";
import { useViewer } from "@/hooks/use-viewr";
import { Suspense, lazy } from "react";


// Lazy load route components
const AdminRoutesLazy = lazy(() => import("./AdminRoutes"));
const CustomerServiceRoutesLazy = lazy(() => import("./CustomerServiceRoutes"));
const MarketingRoutesLazy = lazy(() => import("./MarketingRoutes"));
const SalesRoutesLazy = lazy(() => import("./SalesRoutes"));
const AuthRoutesLazy = lazy(() => import("./AuthRoutes"));

interface LazyRoutesProps {}

export function AdminRoutesLazyLoaded({}: LazyRoutesProps) {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <AdminRoutesLazy />
    </Suspense>
  );
}

export function CustomerServiceRoutesLazyLoaded({}: LazyRoutesProps) {
    const {isLoading,user} = useViewer()
  return (
    <Suspense fallback={<LoadingComponent />}>
      <CustomerServiceRoutesLazy isLoading={isLoading} user={user} />
    </Suspense>
  );
}

export function MarketingRoutesLazyLoaded({}: LazyRoutesProps) {
  const {isLoading,user} = useViewer()
  return (
    <Suspense fallback={<LoadingComponent />}>
      <MarketingRoutesLazy isLoading={isLoading} user={user} />
    </Suspense>
  );
}

export function SalesRoutesLazyLoaded({}: LazyRoutesProps) {
  const {isLoading,user} = useViewer()
  return (
    <Suspense fallback={<LoadingComponent />}>
      <SalesRoutesLazy isLoading={isLoading} user={user} />
    </Suspense>
  );
}

export function AuthRoutesLazyLoaded({}: LazyRoutesProps) {
  const {isLoading,user} = useViewer()
  return (
    <Suspense fallback={<LoadingComponent />}>
      <AuthRoutesLazy isLoading={isLoading} user={user} />
    </Suspense>
  );
}
