import { Role } from "@/__generated__/graphql";
import { AppUser } from "@/contexts/AppContext";

export function appropriateDashboardPath(user?: AppUser | null) {
  if (!user) return "/signin";
  switch (user.role) {
    case Role.Admin:
      return "/admin";
    case Role.SalesRep:
      return "/sales-rep";
    case Role.MarketingRep:
      return "/marketing-rep";
    case Role.CustomerSupportRep:
      return "/customer-rep";
    default:
      return "/";
  }
}
