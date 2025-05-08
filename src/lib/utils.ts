import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes
 * to handle conflicts and ensure proper styling.
 *
 * This utility function leverages `clsx` to conditionally join class names and
 * `tailwind-merge` to intelligently merge conflicting Tailwind CSS classes.
 *
 * @param inputs - An array of class values that can include strings, arrays, or objects
 *                 where keys are class names and values are booleans indicating whether
 *                 the class should be included.
 * @returns A single string containing the merged and resolved class names.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
