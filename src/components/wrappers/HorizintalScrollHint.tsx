import { Keyboard } from "lucide-react";
import { useEffect, useState } from "react";

interface HorizintalScrollHintProps {}

export function HorizintalScrollHint({}: HorizintalScrollHintProps) {
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Hide the scroll hint after 10 seconds
  useEffect(() => {
    if (showScrollHint) {
      const timer = setTimeout(() => {
        setShowScrollHint(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showScrollHint]);
  if (!showScrollHint) return null;
  return (
    <div className="text-muted-foreground bg-background/80 border-border animate-fade-in mb-2 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs shadow-sm">
      <Keyboard className="h-3.5 w-3.5" />
      <span>
        Hold{" "}
        <kbd className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-[10px]">
          Shift
        </kbd>{" "}
        + scroll to move horizontally
      </span>
    </div>
  );
}
