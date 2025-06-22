import { FlowbizIcon } from "@/components/branding/FlowbizIcon";
import { LinkToRoledashboard } from "@/components/authz/LinkToRoledashboard";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface HomepageProps {}

export function Homepage({}: HomepageProps) {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 1.5 },
      });
      // Continuous subtle pulse
      controls.start({
        scale: [1, 1.03, 1],
        transition: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3,
        },
      });
    };
    sequence();
  }, [controls]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.8,
        }}
        className="mb-8"
      >
        <motion.div
          animate={controls}
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.95 }}
        >
          <FlowbizIcon />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-3xl text-center"
      >
        <h1 className="mb-6 bg-gradient-to-r from-primary/100 to-primary/50 bg-clip-text text-4xl font-bold t md:text-6xl text-transparent">
          Welcome to Flowbiz
        </h1>

        <motion.p
          className="text-muted-foreground mt-6 mb-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          The all-in-one platform that transforms how you manage your business.
          Everything you need in one place, designed for efficiency and growth.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8"
      >
        <LinkToRoledashboard />
      </motion.div>
    </div>
  );
}
