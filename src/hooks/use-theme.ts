import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { setTheme, theme } = useNextTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");
 const updateZustandTheme = useThemeStore((state) => state.setTheme);
  const toggleTheme = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      updateZustandTheme("light");
      setTheme("light");
    } else {
      setIsDarkMode(true);
      updateZustandTheme("dark");
      setTheme("dark");
    }
  };
  return { isDarkMode, toggleTheme, theme };
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDarkMode: boolean;
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: get()?.theme === "dark",
      theme: "system",
      setTheme: (newTheme) => set({ theme: newTheme, isDarkMode: newTheme === "dark" }),
      toggleTheme: () => {
        const currentTheme = get().theme;
        set({ theme: currentTheme === "dark" ? "light" : "dark" });
        set({ isDarkMode: currentTheme === "dark" });
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);
