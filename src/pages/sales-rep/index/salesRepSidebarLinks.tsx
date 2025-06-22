import { LogoutButton } from "@/components/auth/LogoutButton";
import { motion } from "framer-motion";
import { RouteGroup } from "@/components/dashboard/SidebarLinks";
import {
  salesRepSystemRoutes,
  salesRepLayoutSidebarRoutes,
} from "@/components/routing/routelist";

interface SalesLayoutLinksProps {
  open?: boolean;
}

const delayDuration = 0.2;

export function SalesLayoutLinks({ open }: SalesLayoutLinksProps) {
  const { mainSalesRepRoutes } = salesRepLayoutSidebarRoutes;
  return (
    <motion.div
      className="mt-4 flex w-full flex-col items-center"
      layout
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout animation
    >
      {/* Main Routes */}
      <RouteGroup routes={mainSalesRepRoutes} open={open} />
    </motion.div>
  );
}

interface SalesLayoutSidebarBottomPanelrops {
  open?: boolean;
}

export function SalesLayoutSidebarBottomPanel({
  open,
}: SalesLayoutSidebarBottomPanelrops) {
  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center pb-8"
      layout
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout animation
    >
      <RouteGroup routes={salesRepSystemRoutes} open={open} />
      <LogoutButton open={open} />
    </motion.div>
  );
}
