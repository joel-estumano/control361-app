import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

/**
 * Formats a given date string or Date object into the format "dd/MM/yyyy - HH:mm".
 *
 * @param dateInput - A valid date string or Date object.
 * @returns A formatted date string in "dd/MM/yyyy - HH:mm" format.
 */
export function formatDate(dateInput: string | Date): string {
    return format(new Date(dateInput), 'dd/MM/yyyy - HH:mm', { locale: ptBR });
}

/**
 * Retorna um pin de carro aleatório.
 * @returns {string} Caminho do ícone do pin sorteado.
 */
export function getRandomCarPin(): string {
    const pins = ['/pins/blue-car-pin.png', '/pins/green-car-pin.png', '/pins/orange-car-pin.png', '/pins/yellow-car-pin.png'];

    const randomIndex = Math.floor(Math.random() * pins.length); // 🔹 Sorteia um índice aleatório
    return pins[randomIndex];
}
