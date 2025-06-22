import { useSwappyManual } from "@/lib/swapy";
import { useWidgetStore } from "@/lib/zustand/editwidtgetsstore";
import { MdDragIndicator } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  id: string;
  title: string;
  children: React.ReactNode;
};

interface ManualSwappyProps {
  initialItems: Item[];
  sectionKey: string;
  listItemsContainerClassName?: string;
  listItemClassName?: string;
}

export function ManualSwappy({
  initialItems,
  listItemsContainerClassName,
  listItemClassName,
  sectionKey,
}: ManualSwappyProps) {
  const editMode = useWidgetStore((state) => state.editMode);
  const { containerRef, slottedItems } = useSwappyManual({
    initialItems,
    sectionKey,
    enabled: editMode,
  });

  return (
    <div
      className={twMerge("flex w-full gap-2", listItemsContainerClassName)}
      ref={containerRef}
    >
      {slottedItems.map(({ slotId, itemId, item }) => (
        <motion.div
          className={twMerge("slot relative w-full", listItemClassName)}
          key={slotId}
          data-swapy-slot={slotId}
          initial={false}
          animate={
            editMode
              ? {
                  boxShadow: "0 0 0 2px var(--primary)",
                  backgroundColor: "var(--muted)",
                }
              : {
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }
          }
          transition={{ duration: 0.3 }}
        >
          {item && (
            <motion.div
              className="h-full w-full"
              data-swapy-item={itemId}
              key={itemId}
              layoutId={`widget-${itemId}`}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {item.children}

              <AnimatePresence>
                {editMode && (
                  <motion.div
                    data-swapy-no-drag
                    className="bg-background/80 absolute top-2 right-2 cursor-move rounded-full p-2 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MdDragIndicator className="text-muted-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
