interface FlowbizIconProps {
  compact?: boolean;
}

export function FlowbizIcon({ compact }: FlowbizIconProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary flex size-10 items-center justify-center rounded-lg">
        <div className="bg-background size-6 rounded-full" />
      </div>
      {!compact && (
        <span className="line-clamp-1 text-2xl font-bold whitespace-nowrap">
          Flowbiz CRM
        </span>
      )}
    </div>
  );
}
