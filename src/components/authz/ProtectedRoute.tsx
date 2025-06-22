
import { AppUser } from "@/contexts/AppContext";
import { appropriateDashboardPath } from "@/helpers/appropriate-dashboard";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { LoadingComponent } from "../routing/LoadingComponent";
import { Role } from "@/__generated__/graphql";

type ProtectedRouteProps = {
  user?: AppUser | null;
  children?: React.ReactNode;
  isLoading?: boolean;
};

const allowedUNauthenticatedPaths = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/terms",
  "/privacy",
  "/reset-password",
  "/support",
  "/accept-invite",
];

export function ProtectedRoute({
  user,
  children,
  isLoading,
}: ProtectedRouteProps) {
  const { pathname } = useLocation();
  // console.log("ProtectedRoute: ", pathname, user, isLoading);
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (!user) {
    if (allowedUNauthenticatedPaths.includes(pathname)) return children;
    return <Navigate to="/signin" />;
  }

  if (user) {
    // if (user.role=="Admin" && user.isNew) {
    //   return <Navigate to="/admin/create-business" />;
    // }
    if (pathname === "/signin")
      return <Navigate to={appropriateDashboardPath(user)} />;
    if (pathname === "/signup")
      return <Navigate to={appropriateDashboardPath(user)} />;

    if (pathname.startsWith(appropriateDashboardPath(user))) return children;

    switch (user.role) {
      case Role.Admin:
        return <Navigate to="/admin" />;
      case Role.SalesRep:
        return <Navigate to="/sales-rep" />;
      case Role.MarketingRep:
        return <Navigate to="/marketing-rep" />;
      case Role.CustomerSupportRep:
        return <Navigate to="/customer-rep" />;
      default:
        return <Navigate to=".." />;
    }
  }

  return children || <Outlet />;
}
