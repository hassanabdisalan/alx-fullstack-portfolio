"use client";

import React from "react";
import { type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToolbar } from "@/components/editor/toolbars/toolbar-provider";

const FONT_FAMILIES = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
];

const FontFamilyToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    if (!editor) return null;

    const currentFontFamily =
      editor.getAttributes("textStyle").fontFamily || "Arial, sans-serif";

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Select
              value={currentFontFamily}
              onValueChange={(value) => {
                if (value) {
                  editor.chain().focus().setFontFamily(value).run();
                } else {
                  editor.chain().focus().unsetFontFamily().run();
                }
              }}
            >
              <SelectTrigger className="h-8 w-[120px] border-0 text-xs shadow-none focus:ring-0">
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILIES.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value || "inherit" }}>
                      {font.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>Font family</span>
        </TooltipContent>
      </Tooltip>
    );
  },
);

FontFamilyToolbar.displayName = "FontFamilyToolbar";

export { FontFamilyToolbar };
