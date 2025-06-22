import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardNavbar } from "@/components/dashboard/navbar/DashboardNavbar";
import { SalesRepLayoutSidebar } from "./SalesRepLayoutSidebar";

interface SalesRepLayoutProps {}

export function SalesRepLayout({}: SalesRepLayoutProps) {
  return (
    <div className="flex h-screen">
      <SalesRepLayoutSidebar />
      <div className="h-screen w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }} // Longer, smoother animation
          className="shadow-t-lg bg-background rounded-2xl p-4"
        >
          <div className="bg-background sticky top-0 z-50">
            <DashboardNavbar />
          </div>
          <div className="my-10 h-[90dvh] overflow-scroll">
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
