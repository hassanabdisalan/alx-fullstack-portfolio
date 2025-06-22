import { CalenderSkeleton } from "@/components/wrappers/loaders/CalenderSkeleton";
import { GET_USER_EVENTS_QUERY } from "@/graphql/queries/calendarQuery";
import { useQuery } from "@apollo/client";
import { Calendar, dateFnsLocalizer, Views, EventWrapperProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { useMemo, useState } from "react";
import { useCalendarView } from "./helpers/view.tsx";
import { AddEventDialog } from "./actions/AddEventDialog.tsx";
import { UpdateEventDialog } from "./actions/UpdateEventDialog.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./calender.css"
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button.tsx";
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  description?: string;
  color?: string;
  bgColor?: string; // Added bgColor for custom styling
}
interface BetterUserCalenderProps {}

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

export function BetterUserCalender({}: BetterUserCalenderProps) {
  const [date, setDate] = useState(new Date());
  const { loading: eventsLoading, data } = useQuery(GET_USER_EVENTS_QUERY);

  const { handleViewChange, getCurrentView } = useCalendarView();

  const formattedEvents = useMemo(() => {
    return (
      data?.getUserEvents?.map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start: new Date(event.start),
        end: new Date(event.end),
        allDay: false,
      })) || []
    );
  }, [data?.getUserEvents]);

  if (eventsLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CalenderSkeleton />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="h-[70vh]">
        <div className="mt-10 w-full">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex w-full justify-end">
              <AddEventDialog />
            </div>
          </div>
        </div>
        <Calendar
          date={date}
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          components={{
            eventWrapper: ({ event }: EventWrapperProps<CalendarEvent>) => (
              <div
                className="flex items-center justify-center rounded px-2 shadow-sm"
                style={{
                  backgroundColor: event.bgColor || "var(--color-primary)",
                  color: event.color || "var(--color-primary-foreground)",
                }}
              >
                <UpdateEventDialog event={event} trigger={event.title} />
              </div>
            ),
            toolbar: (props) => (
              <div className="flex items-center justify-between p-2">
                <div className="rounded-y-sm flex items-center">
                  <Button
                    variant="outline"
                    className="border-muted-foreground hover:bg-primary/60 rounded-none border-1"
                    onClick={() => props.onNavigate("PREV")}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="outline"
                    className="border-muted-foreground hover:bg-primary/60 rounded-none"
                    onClick={() => props.onNavigate("TODAY")}
                  >
                    Today
                  </Button>

                  <Button
                    variant="outline"
                    className="border-muted-foreground hover:bg-primary/60 rounded-none"
                    onClick={() => props.onNavigate("NEXT")}
                  >
                    Next
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select onValueChange={props.onView} value={props.view}>
                    <SelectTrigger className="border-foreground text-foreground w-fit rounded-sm border-1">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* @ts-expect-error */}
                      {props.views.map((view) => (
                        <SelectItem
                          key={view}
                          value={view}
                          onClick={() => props.onView(view)}
                        >
                          {view.charAt(0).toUpperCase() + view.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ),
            // dateCellWrapper: (props) => {
            //   // You can customize date cell appearance
            //   return <div className="border border-red-500 size-full  text-3xl" {...props} />;
            // },
          }}
          // selectable
          view={getCurrentView()}
          defaultView="month"
          onView={handleViewChange}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          eventPropGetter={(event: CalendarEvent) => ({
            style: {
              color: event.color || "var(--color-primary-foreground)",
              backgroundColor: event.bgColor || "var(--color-primary)",
              borderRadius: "4px",
              border: "none",
              padding: "2px 5px",
              fontSize: "0.85rem",
              divShadow: "0 2px 5px var(--color-muted-foreground)",
            },
          })}
          dayPropGetter={() => ({
            style: {
              borderRight: `1px solid var(--color-muted-foreground)`,
              borderBottom: `1px solid var(--color-muted-foreground)`,
              color: "var(--color-muted-foreground)",
            },
          })}
          onNavigate={(date) => {
            setDate(new Date(date));
          }}
        />
        <div className="h-12"></div>
      </div>
    </div>
  );
}
