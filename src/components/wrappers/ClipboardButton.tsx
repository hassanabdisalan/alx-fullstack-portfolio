import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClipboardButtonProps {
  text: string;
  displayText?: string;
  className?: string;
  variant?: "default" | "ghost" | "outline";
  showFullText?: boolean;
  show?: boolean;
  showToast?: boolean;
  onlyShowCopy?: boolean; // If true, only show the copy button without the text
}

export function ClipboardButton({
  text,
  displayText,
  className,
  variant = "ghost",
  showFullText = true,
  onlyShowCopy = false, // If true, only show the copy button without the text
  show = true,
  showToast = true,
}: ClipboardButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Display either the provided display text or the original text
  const textToShow = displayText || text;

  // If we don't want to show the full text, truncate it
  const displayValue =
    !showFullText && textToShow.length > 40
      ? `${textToShow.substring(0, 40)}...`
      : textToShow;
  if (!show) return null;
  return (
    <div
      className={cn(
        `bg-primary/10 flex items-center gap-2 rounded-md  p-1 ${copied ? "animate-pulse" : ""}`,
        className,
      )}
    >
      {onlyShowCopy ? null : (
        <div className="flex-1 font-mono text-sm break-all">{displayValue}</div>
      )}
      <Button
        variant={variant}
        size="sm"
        onClick={handleCopy}
        className="flex-shrink-0"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}
