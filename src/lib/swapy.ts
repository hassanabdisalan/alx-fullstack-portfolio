import { SlotItemMapArray } from "swapy";
import { useEffect, useMemo, useRef, useState } from "react";
import { utils, Swapy, createSwapy } from "swapy";

// Function to sanitize layout data and fix duplicates
export const sanitizeLayout = (
  layout: SlotItemMapArray,
  allPossibleSlots: string[],
): SlotItemMapArray => {
  if (!layout || !layout.length) return [];

  // Track what we've seen already
  const usedSlots = new Set<string>();
  const usedItems = new Set<string>();
  const availableSlots = new Set(allPossibleSlots);
  const availableItems = new Set(allPossibleSlots); // Items initially match slots in our case

  // First pass: keep only valid non-duplicate entries
  const sanitizedLayout: SlotItemMapArray = [];

  for (const entry of layout) {
    const { slot, item } = entry;

    // Skip if already assigned
    if (usedSlots.has(slot) || usedItems.has(item)) {
      continue;
    }

    // Add this valid mapping
    sanitizedLayout.push(entry);
    usedSlots.add(slot);
    usedItems.add(item);
    availableSlots.delete(slot);
    availableItems.delete(item);
  }

  // Second pass: assign remaining slots and items
  const remainingSlots = Array.from(availableSlots);
  const remainingItems = Array.from(availableItems);

  // Match remaining slots with remaining items
  for (
    let i = 0;
    i < Math.min(remainingSlots.length, remainingItems.length);
    i++
  ) {
    sanitizedLayout.push({
      slot: remainingSlots[i],
      item: remainingItems[i],
    });
  }

  return sanitizedLayout;
};

type Item = {
  id: string;
  title: string;
  children: React.ReactNode;
};

interface UseSwappyManualOptions {
  initialItems: Item[];
  sectionKey: string;
  enabled?: boolean;
}

export function useSwappyManual({
  initialItems,
  sectionKey,
  enabled,
}: UseSwappyManualOptions) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const allPossibleSlots = initialItems.map((item) => item.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<Swapy | null>(null);

  // Initialize slot-item mapping, loading from localStorage if available
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(() => {
    const savedLayout = localStorage.getItem("swapy-layout" + sectionKey);

    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout) as SlotItemMapArray;
        if (parsedLayout.length > 0) {
          return sanitizeLayout(parsedLayout, allPossibleSlots);
        }
      } catch (error) {
        console.error("Failed to parse saved layout", error);
      }
    }

    return utils.initSlotItemMap(items, "id");
  });

  // Convert to slotted items for rendering
  const slottedItems = useMemo(
    () => utils.toSlottedItems(items, "id", slotItemMap),
    [items, slotItemMap],
  );

  // Handle dynamic updates to items
  useEffect(
    () =>
      utils.dynamicSwapy(
        swapyRef.current,
        items,
        "id",
        slotItemMap,
        setSlotItemMap,
      ),
    [items],
  );

  // Initialize swapy and setup event handlers
  useEffect(() => {
    if (!containerRef.current) return;

    swapyRef.current = createSwapy(containerRef.current, {
      manualSwap: true,
      enabled: enabled,
    });

    swapyRef.current.onSwap((event) => {
      const sanitizedLayout = sanitizeLayout(
        event.newSlotItemMap.asArray,
        allPossibleSlots,
      );
      setSlotItemMap(sanitizedLayout);
      localStorage.setItem(
        "swapy-layout" + sectionKey,
        JSON.stringify(sanitizedLayout),
      );
    });

    return () => {
      swapyRef.current?.destroy();
    };
  }, [sectionKey, enabled]);

  // Update items when they change externally
  const updateItems = (newItems: Item[]) => {
    setItems(newItems);
  };

  return {
    containerRef,
    slottedItems,
    updateItems,
  };
}
