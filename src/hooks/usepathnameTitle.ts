import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePathnameTitle() {
    const pathname = useLocation().pathname;
    useEffect(() => {
        const title = pathname
            .split("/")
            .filter((part) => part)
            .map((part) => {
                const [title] = part.split("-");
                return title.charAt(0).toUpperCase() + title.slice(1);
            })
            .join(" - ");
        
        document.title = title || "Default Title";
    }, [pathname]);
}
