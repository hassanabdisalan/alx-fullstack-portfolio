import { IoWarning } from "react-icons/io5";

interface ApiIntergrationPendingProps {}

export function ApiIntergrationPending({}: ApiIntergrationPendingProps) {
  return (
    <div className="absolute top-2 right-2 flex gap-2 rounded-xl border text-red-500">
      <IoWarning className="size-3" />
      <p className="text-xs">API Integration Pending</p>
    </div>
  );
}
