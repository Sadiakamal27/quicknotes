import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// @/lib/utils.ts
export function handleError(error: unknown) {
  console.error(error);
  return { errorMessage: "An error occurred" };
}