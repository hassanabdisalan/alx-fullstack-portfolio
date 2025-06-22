interface CalenderSkeletonProps {}

export function CalenderSkeleton({}: CalenderSkeletonProps) {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-2 p-2 px-6">
      <div className="mb-4 w-full flex flex-col justify-end items-end">
        <div className="mb-2 flex items-center justify-between w-full">
          <div className="bg-muted skeleton h-8 w-1/5" />
          <div className="bg-muted skeleton h-8 w-1/5" />
        </div>
        <div className="bg-muted skeleton h-8 w-1/3" />
      </div>
      <div className="grid w-full grid-cols-7  gap-1 grid-rows-4 items-center justify-center">
        {Array.from({ length: 30 }).map((_, index) => {
          return (
            <div key={index} className="bg-muted skeleton min-h-[100px]" />
          );
        })}
      </div>
    </div>
  );
}
