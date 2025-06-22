import { ReactNode } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { MdInfoOutline } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { IoAlertCircleOutline } from "react-icons/io5";


interface WidgetEmptyProps {
  message?: string;
  icon?: ReactNode;
  className?: string;
}

export function WidgetEmpty({
  message = "No data available",
  icon = <MdInfoOutline size={24} />,
}: WidgetEmptyProps) {
  return (
    <div className="text-muted-foreground flex h-full max-h-52 w-full flex-col items-center justify-center rounded-lg border p-4">
      <div className="mb-2">{icon}</div>
      <p className="line-clamp-6 text-center text-sm">{message}</p>
    </div>
  );
}

interface WidgetLoadingProps {
  message?: string;
  spinner?: ReactNode;
  className?: string;
  title?: string;
}

export function WidgetLoading({
  message = "Loading data...",
  spinner = (
    <div className="border-primary max-h-52 border-2 h-6 w-6 animate-spin rounded-full  border-t-transparent" />
  ),
  title,
}: WidgetLoadingProps) {
  return (
    <div className="relative flex h-full min-h-52 w-full flex-col items-center justify-center rounded-lg border p-4">
      {title && (
        <div className="text-foreground/80 absolute top-3 left-4 text-base font-semibold">
          {title}
        </div>
      )}
      <div className="mb-3">{spinner}</div>
      <p className="text-muted-foreground text-center text-sm">{message}</p>
    </div>
  );
}

export function ChartWidgetLoaderSkeleton() {
  return (
    <Card className="border-border min-h-52 w-full animate-pulse rounded-md border p-4">
      <div className="bg-muted mb-4 h-4 w-1/3 rounded" />
      <div className="bg-muted mb-4 h-52 rounded" />
      <div className="flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-muted-foreground/30 h-4 w-4 rounded-full" />
          <div className="bg-muted h-3 w-20 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-muted-foreground/40 h-4 w-4 rounded-full" />
          <div className="bg-muted h-3 w-24 rounded" />
        </div>
      </div>
    </Card>
  );
}

export function EmptyTotalOpenTicketsWidget() {
  return (
    <Card className="border-foreground/20 pretty-scrollbar bg-background/90 h-full max-h-52 w-full rounded-xl border p-4">
      <div className="flex items-start justify-between">
        {/* Left - Title & Legend */}
        <div className="flex w-full flex-col">
          <CardHeader className="mb-2 p-0">
            <CardTitle className="text-lg font-semibold">
              Open Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="mb-1 text-3xl font-bold">0</div>
            <p className="text-muted-foreground mb-3 text-sm">
              Tickets by current status
            </p>
          </CardContent>
        </div>

        {/* Right - Empty State */}
        <div className="flex h-[200px] w-full items-center justify-center">
          <div className="text-center">
            <div className="bg-muted/10 mx-auto mb-3 w-fit rounded-full p-3">
              <LuClipboardList className="text-muted-foreground h-6 w-6" />
            </div>
            <p className="text-muted-foreground text-sm">
              No tickets found in the system
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ErrorStateWidget({ message }: { message: string }) {
  return (
    <Card className="w-full rounded-xl border border-[var(--muted-foreground)] p-4">
      <div className="flex h-[200px] flex-col items-center justify-center p-4 text-center">
        <div className="bg-destructive/10 mb-3 rounded-full p-3">
          <IoAlertCircleOutline className="text-destructive h-6 w-6" />
        </div>
        <h4 className="text-destructive mb-1 font-semibold">Data Load Error</h4>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </Card>
  );
}
