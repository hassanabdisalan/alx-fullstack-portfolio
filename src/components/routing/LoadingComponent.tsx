import { motion } from "framer-motion";
import { FlowbizIcon } from "../branding/FlowbizIcon";

export function LoadingComponent() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-background">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-8"
      >
        {/* We animate the Flowbiz logo here. */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <FlowbizIcon compact />
        </motion.div>
      </motion.div>
    </div>
  );
}
