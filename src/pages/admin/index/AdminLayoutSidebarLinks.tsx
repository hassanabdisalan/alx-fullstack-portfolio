import {
  adminLayoutSidebarRoutes,
  AdminSystemRoutes,
} from "@/components/routing/routelist";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { motion } from "framer-motion";
import { RouteGroup } from "@/components/dashboard/SidebarLinks";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "@/hooks/use-theme";
import { DarkModeToggle } from "@/components/wrappers/theme";

interface AdminLayoutLinksProps {
  open?: boolean;
}

const delayDuration = 0.2;
// Individual route item component with smoother animation

export function AdminLayoutLinks({ open }: AdminLayoutLinksProps) {
  const { mainRoutes, salesRoutes, marketingRoutes, supportRoutes } =
    adminLayoutSidebarRoutes;
  return (
    <motion.div
      className="mt-4 flex w-full flex-col items-center"
      layout
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout animation
    >
      {/* Main Routes */}
      <RouteGroup routes={mainRoutes} open={open} />

      {/* Sales Routes */}
      <RouteGroup routes={salesRoutes} categoryLabel="SALES" open={open} />

      {/* Marketing Routes */}
      <RouteGroup
        routes={marketingRoutes}
        categoryLabel="MARKETING"
        open={open}
      />

      {/* Support Routes */}
      <RouteGroup
        routes={supportRoutes}
        categoryLabel="CUSTOMER SUPPORT"
        open={open}
      />
    </motion.div>
  );
}

interface AdminLayoutSidebarBottomPanelrops {
  open?: boolean;
}

export function AdminLayoutSidebarBottomPanel({
  open,
}: AdminLayoutSidebarBottomPanelrops) {
  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center pb-8"
      layout
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout animation
    >
      <RouteGroup routes={AdminSystemRoutes} open={open} />

      <LogoutButton open={open} />
    </motion.div>
  );
}
