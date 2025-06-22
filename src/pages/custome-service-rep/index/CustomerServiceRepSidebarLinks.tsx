import { LogoutButton } from "@/components/auth/LogoutButton";
import { motion } from "framer-motion";
import { RouteGroup } from "@/components/dashboard/SidebarLinks";
import {
  customerRepSystemRoutes,
  customerSupprortRepLayoutSidebarRoutes,
} from "@/components/routing/routelist";

interface CustomerRepLayoutLinksProps {
  open?: boolean;
}

const delayDuration = 0.2;

export function CustomerRepLayoutLinks({ open }: CustomerRepLayoutLinksProps) {
  const { mainCustomerRepRoutes } = customerSupprortRepLayoutSidebarRoutes;
  return (
    <motion.div
      className="mt-4 flex w-full flex-col items-center"
      layout
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout animation
    >
      {/* Main Routes */}
      <RouteGroup routes={mainCustomerRepRoutes} open={open} />
    </motion.div>
  );
}

interface CustomerRepLayoutSidebarBottomPanelrops {
  open?: boolean;
}

export function CustomerRepLayoutSidebarBottomPanel({
  open,
}: CustomerRepLayoutSidebarBottomPanelrops) {
  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center pb-8"
      layout
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout animation
    >
      <RouteGroup routes={customerRepSystemRoutes} open={open} />
      <LogoutButton open={open} />
    </motion.div>
  );
}
