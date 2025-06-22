import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardNavbar } from "@/components/dashboard/navbar/DashboardNavbar";
import { useViewer } from "@/hooks/use-viewr";
import { CreateBusinessForm } from "@/components/admin-dashboard/forms/CreateBusinessForm";
import { AdminLayoutSidebar } from "./AdminLayoutSidebar";

interface AdminLayoutProps {}

export function AdminLayout({}: AdminLayoutProps) {
  const { user } = useViewer();
  if (!user?.business?.id) {
    return (
      <div className="bg-muted l flex h-screen items-center justify-center px-[20%] py-[10%]">
        <CreateBusinessForm />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <AdminLayoutSidebar />
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
