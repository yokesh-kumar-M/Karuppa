import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class-name joiner used across components. tailwind-merge resolves utility
 * conflicts in favour of the caller (e.g. a `className="absolute inset-0"`
 * prop beats a component's default `relative` — stylesheet order would
 * otherwise win and collapse the box).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
