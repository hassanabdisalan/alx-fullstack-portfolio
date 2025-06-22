import { LogoutButton } from "@/components/auth/LogoutButton";
import { motion } from "framer-motion";
import { RouteGroup } from "@/components/dashboard/SidebarLinks";
import {
  marketingRepLayoutSidebarRoutes,
  marketingRepSystemRoutes,
} from "@/components/routing/routelist";

interface MarketingLayoutLinksProps {
  open?: boolean;
}

const delayDuration = 0.2;

export function MarketingLayoutLinks({ open }: MarketingLayoutLinksProps) {
  const { mainMarketingRepRoutes } = marketingRepLayoutSidebarRoutes;
  return (
    <motion.div
      className="mt-4 flex w-full flex-col items-center"
      layout
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout animation
    >
      {/* Main Routes */}
      <RouteGroup routes={mainMarketingRepRoutes} open={open} />
    </motion.div>
  );
}

interface MarketingLayoutSidebarBottomPanelrops {
  open?: boolean;
}

export function MarketingLayoutSidebarBottomPanel({
  open,
}: MarketingLayoutSidebarBottomPanelrops) {
  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center pb-8"
      layout
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout animation
    >
      <RouteGroup routes={marketingRepSystemRoutes} open={open} />
      <LogoutButton open={open} />
    </motion.div>
  );
}
