import { useTheme } from "@/hooks/use-theme";
import { FaMoon, FaSun } from "react-icons/fa6";

export function DarkModeToggle({ open }: { open: boolean | undefined }) {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className="flex w-full items-center hover:bg-muted/90 justify-center">
      <button
        className="text-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg p-2"
        onClick={toggleTheme}
      >
        {isDarkMode ? (
          <FaMoon className="" size={24} />
        ) : (
          <FaSun className="" size={24} />
        )}
        {open && (
          <span className="text-sm">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        )}
      </button>
    </div>
  );
}
