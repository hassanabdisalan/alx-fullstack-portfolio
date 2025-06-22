/**
 * Creates a promise that resolves with the given value after a specified delay.
 *
 * @template T - The type of the value to be resolved.
 * @param ms - The delay in milliseconds before the promise resolves.
 * @param value - The value with which the promise will resolve.
 * @param callback - Optional function to be executed just before the promise resolves.
 * @returns A promise that resolves with the provided value after the specified delay.
 *
 * @example
 * // Resolves with "done" after 1000ms
 * delayedPromise(1000, "done").then(result => console.log(result));
 *
 * @example
 * // Executes a callback before resolving
 * delayedPromise(1000, { success: true }, () => console.log("About to resolve"))
 *   .then(result => console.log(result));
 */
export function delayedPromise<T>(
  ms: number,
  value: T,
  callback?: () => void,
): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback?.();
      resolve(value);
    }, ms);
  });
}
