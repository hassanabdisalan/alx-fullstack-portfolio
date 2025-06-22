// src/lib/tailwind.ts

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines and merges Tailwind classes
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
