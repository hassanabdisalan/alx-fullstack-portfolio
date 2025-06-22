import { Button } from "@/components/ui/button";
import { useWidgetStore } from "@/lib/zustand/editwidtgetsstore";
import { motion, AnimatePresence } from "framer-motion";
import { MdDashboard, MdEdit } from "react-icons/md";
interface DashboardNavbarEditWidgetsProps {}

export function DashboardNavbarEditWidgets({}: DashboardNavbarEditWidgetsProps) {
  const { setEditMode, editMode } = useWidgetStore();
  return (
    <Button
      onClick={() => setEditMode(!editMode)}
      variant={editMode ? "default" : "outline"}
      className={`relative min-w-fit gap-3 overflow-hidden ${
        editMode ? "text-primary-foreground" : "text-foreground border-foreground/30"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={editMode ? "editing" : "normal"}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          {editMode ? (
            <>
              <MdEdit className="size-5" />
              <span>Editing</span>
            </>
          ) : (
            <>
              <MdDashboard className="size-5" />
              <span>Edit Widget</span>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {editMode && (
        <motion.div
          className="bg-primary absolute inset-0 z-0 opacity-20"
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      )}
    </Button>
  );
}
