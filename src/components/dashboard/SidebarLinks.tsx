import type { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminLayoutLinksProps {
  open?: boolean;
}
// Define the structure of a route item
type RouteItem = {
  name: string;
  icon: IconType;
  path: string;
  category: string;
};
const delayDuration = 0.2;
// Individual route item component with smoother animation
export function RouteListItem({
  route,
  open,
  active,
}: {
  route: RouteItem;
  open?: boolean;
  active: boolean;
}) {
  return (
    <motion.div
      key={route.path}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: delayDuration, ease: "easeIn" }} // Slower, smoother animation
      whileHover={{
        // backgroundColor: "var(--color-muted)",
        scale: 1.02,
        transition: { duration: delayDuration, ease: "easeIn" }, // Smoother hover effect
      }}
      className={`hover:bg-primary/40 w-full rounded-lg ${active ? "bg-primary/20" : ""}`}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link
              to={route.path}
              className="text-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg p-2"
            >
              <motion.div
                layout
                transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout transition
              >
                <route.icon className="" size={24} />
              </motion.div>
              <AnimatePresence mode="wait">
                {open && (
                  <motion.span
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.1, width: 3 }}
                    className="line-clamp-1"
                    transition={{
                      duration: delayDuration,
                      ease: "easeIn",
                      opacity: { duration: 0.25 }, // Fade slightly faster than width change
                    }}
                  >
                    {route.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" hidden={open}>
            <p className="text-sm">{route.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}

// Category label component with smoother animationes
export function CategoryLabel({
  label,
  open,
}: {
  label: string;
  open?: boolean;
}) {
  // if (!open) return null;
  const actulalLabel = open ? label : label?.slice(0, 1); // Show only the first letter when collapsed
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother animation
      className="mt-4 mb-1 w-full px-2"
    >
      <span className="text-xs font-medium text-slate-500">{actulalLabel}</span>
    </motion.div>
  );
}

// Route group component with staggered children animations
export function RouteGroup({
  routes,
  categoryLabel,
  open,
}: {
  routes: readonly RouteItem[];
  categoryLabel?: string;
  open?: boolean;
}) {
  const { pathname } = useLocation();
  return (
    <motion.div
      layout
      transition={{ duration: delayDuration, ease: "easeIn" }} // Smoother layout transition
      className="h-full w-full"
    >
      <AnimatePresence mode="wait">
        {categoryLabel && <CategoryLabel label={categoryLabel} open={open} />}
      </AnimatePresence>
      {routes.map((route, index) => (
        <motion.div
          key={route.path + pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.2, // Staggered animation for each route item
            duration: delayDuration,
          }}
        >
          <RouteListItem
            route={route}
            open={open}
            active={pathname === route.path}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
