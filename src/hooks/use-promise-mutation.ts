import { useState } from "react";

export function usePromiseMutation<T>(
    options: {
    mutationFn: () => Promise<T>,
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = async () => {
    setIsPending(true);
    setError(null);
    try {
      const result = await options.mutationFn();
      setData(result);
      options?.onSuccess?.(result);
    } catch (err) {
      setError(err as Error);
      options?.onError?.(err as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending, error, data };
}   
