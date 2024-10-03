import { DebouncedFunction } from "../types";

// Creates a debounced version of a given function
export const debounce = <T extends (...args: any[]) => any>(
  func: T, // The function to debounce
  wait: number // Time to wait in milliseconds before calling the function
): DebouncedFunction<T> => {
  let timeout: ReturnType<typeof setTimeout> | undefined; // Variable to store the timeout ID

  // Returns a new function that will delay the execution of the original function
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout); // Clear the previous timeout

    // Set a new timeout to execute the function after the specified wait time
    timeout = setTimeout(() => {
      func(...args); // Call the original function with the provided arguments
    }, wait);
  };
};