import { FlowbizIcon } from "@/components/branding/FlowbizIcon";
import { motion } from "framer-motion";
import { FaAnglesLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MarketingLayoutLinks,
  MarketingLayoutSidebarBottomPanel,
} from "./MarketingRepSidebarLinks";

interface MarketingRepLayoutSidebarProps {}
const delayDuration = 0.2;
export function MarketingRepLayoutSidebar({}: MarketingRepLayoutSidebarProps) {
  const [open, setOpen] = useState(true);

  const sidebarVariants = {
    expanded: {
      width: "240px",
      transition: {
        type: "tween",
        duration: delayDuration,
        ease: "easeIn",
      },
    },
    collapsed: {
      width: "50px",
      transition: {
        type: "tween",
        duration: delayDuration,
        ease: "easeIn",
      },
    },
  };

  // Smoother animation variants for the toggle icon
  const toggleIconVariants = {
    expanded: {
      rotate: 0,
      transition: { duration: 0.5, ease: "easeInOut" }, // Added ease function
    },
    collapsed: {
      rotate: 180,
      transition: { duration: 0.5, ease: "easeInOut" }, // Added ease function
    },
  };

  return (
    <motion.div
      initial="expanded"
      animate={open ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      className="bg-muted flex h-full flex-col gap-4 p-2"
    >
      {/* Header with logo and toggle button */}
      <motion.div
        className={`0 flex items-center justify-center gap-4 ${
          open ? "flex-row" : "flex-col-reverse"
        }`}
        layout
        layoutId="header"
        transition={{ duration: delayDuration, ease: "easeIn" }} // Added transition for smoother layout changes
      >
        <Link to={"/"}>
          <FlowbizIcon compact={!open} />
        </Link>
        <motion.div
          variants={toggleIconVariants}
          initial="expanded"
          animate={open ? "expanded" : "collapsed"}
          whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        >
          <FaAnglesLeft className="size-4" />
        </motion.div>
      </motion.div>

      <motion.div
        className="bg-muted flex h-full flex-col items-center justify-between gap-4"
        layout
        layoutId="sidebar-content"
        transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout animation
      >
        <MarketingLayoutLinks open={open} />
        <MarketingLayoutSidebarBottomPanel open={open} />
      </motion.div>
    </motion.div>
  );
}
