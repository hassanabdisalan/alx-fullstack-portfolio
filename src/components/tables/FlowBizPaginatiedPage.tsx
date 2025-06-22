import ResponsivePagination from "react-responsive-pagination";

interface FlowBizPaginatiedPageProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function FlowBizPaginatiedPage({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: FlowBizPaginatiedPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={onPageChange}
        maxWidth={768}
        className={`pagination justify-content-center ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        previousLabel="Previous"
        nextLabel="Next"
      />
    </div>
  );
}
