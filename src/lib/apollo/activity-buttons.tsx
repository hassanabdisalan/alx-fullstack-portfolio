import { Button } from "@/components/ui/button";
import { usePromiseMutation } from "@/hooks/use-promise-mutation";
import { Loader } from "lucide-react";
import { toast } from "sonner";

interface RefetchQueryButtonProps {
  reload: () => Promise<any>;
  children?: React.ReactNode;
  className?: string;
}

export function RefetchQueryButton({
  reload,
  children,
  className,
}: RefetchQueryButtonProps) {
  const { mutate, isPending } = usePromiseMutation({
    mutationFn: reload,
    onSuccess: () => {
      // Optionally handle success, e.g., show a toast notification
      toast.success("Query reloaded successfully!");
    },
    onError: (error) => {
      // Optionally handle error, e.g., show an error message
      console.error("Error reloading query:", error);
      toast.error("Failed to reload query");
    },
  });
  return (
    <Button
      variant="outline"
      onClick={mutate}
      className={className}
      disabled={isPending}
    >
      {children || "Reload"} {isPending && <Loader className="animate-spin" />}
    </Button>
  );
}

interface FetchMoreButtonProps {
  fetchMore: () => Promise<any>;
  children?: React.ReactNode;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  onSuccess?: () => void;
}

export function FetchMoreButton({ fetchMore, children,buttonProps,onSuccess }: FetchMoreButtonProps) {
  const { mutate, isPending } = usePromiseMutation({
    mutationFn: fetchMore,
    onSuccess: () => {
      // Optionally handle success, e.g., show a toast notification
      toast.success("More items loaded successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      // Optionally handle error, e.g., show an error message
      console.error("Error loading more items:", error);
      toast.error("Failed to load more items");
    },
  });
  return (
    <Button variant="outline" onClick={mutate} disabled={isPending} {...buttonProps}>
      {children || "Load more"} {isPending && <Loader className="animate-spin" />}
    </Button>
  );
}
