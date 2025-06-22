"use client";

import React from "react";
import { MdFormatColorText } from "react-icons/md";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "@/components/editor/toolbars/toolbar-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const COLORS = [
  { name: "Default", value: "" },
  { name: "Black", value: "#000000" },
  { name: "Gray", value: "#64748b" }, // slate-500
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#eab308" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
];

const TextColorToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    if (!editor) return null;

    const currentColor = editor.getAttributes("textStyle").color || "";

    return (
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", className)}
                ref={ref}
                {...props}
              >
                <MdFormatColorText
                  className="h-4 w-4"
                  style={{
                    stroke: currentColor || "black",
                    fill: currentColor ? "currentColor" : "black",
                  }}
                />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>Text color</span>
          </TooltipContent>
        </Tooltip>

        <PopoverContent className="w-auto p-2">
          <div className="grid grid-cols-3 gap-1">
            {COLORS.map((color) => (
              <button
                key={color.value}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md border",
                  color.value === currentColor && "ring-2 ring-slate-400",
                )}
                style={{
                  backgroundColor: color.value || "transparent",
                  border: color.value ? "none" : "1px solid #e2e8f0",
                }}
                onClick={() => {
                  if (color.value) {
                    editor.chain().focus().setColor(color.value).run();
                  } else {
                    editor.chain().focus().unsetColor().run();
                  }
                }}
                title={color.name}
              >
                {color.value === "" && (
                  <span className="text-xs text-slate-500">∅</span>
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

TextColorToolbar.displayName = "TextColorToolbar";

export { TextColorToolbar };
