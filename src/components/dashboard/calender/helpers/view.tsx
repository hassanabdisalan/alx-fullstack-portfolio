import { useCallback, useState } from "react";
import { Views } from "react-big-calendar";

export const VIEW_MODES = {
  DAY: "day",
  AGENDA: "agenda",
  WEEK: "week",
  MONTH: "month",
} as const;

export type ViewMode = keyof typeof VIEW_MODES;

export const getCurrentView = (viewMode: ViewMode) => {
  switch (viewMode) {
    case "DAY":
      return Views.DAY;
    case "WEEK":
      return Views.WEEK;
    case "MONTH":
      return Views.MONTH;
    case "AGENDA":
      return Views.AGENDA;
    default:
      return Views.MONTH;
  }
};


export function useCalendarView(){
  const [viewMode, setViewMode] = useState<ViewMode>("MONTH");
   const handleViewChange = useCallback((newView: string) => {
    switch (newView) {
      case Views.DAY:
        setViewMode("DAY");
        break;
      case Views.AGENDA:
        setViewMode("AGENDA");
        break;
      case Views.WEEK:
        setViewMode("WEEK");
        break;
      case Views.MONTH:
        setViewMode("MONTH");
        break;
      default:
        setViewMode("MONTH");
    }
  }, []);
  return {
    viewMode,
    setViewMode,
    handleViewChange,
    getCurrentView: () => getCurrentView(viewMode),
  };
}
