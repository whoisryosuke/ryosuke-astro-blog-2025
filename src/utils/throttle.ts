/**
 * Throttles a function to execute at most once every `limit` milliseconds.
 * @param func - The function to throttle.
 * @param limit - Time between function calls
 * @returns A throttled version of the function.
 */
export default function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      // Execute the function immediately
      func.apply(this, args);

      // Lock the function
      inThrottle = true;

      // Unlock after the limit has passed
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
