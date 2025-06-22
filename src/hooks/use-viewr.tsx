import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

export function useViewer() {
  return useContext(AppContext);
}
