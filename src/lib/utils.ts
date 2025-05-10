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
 * Retorna o caminho do ícone do carro com base na inicial da placa.
 * O alfabeto é dividido em grupos, cada um associado a uma cor de carro.
 * Se a inicial não for válida, retorna um ícone padrão.
 *
 * @param {string} plate - Placa do veículo.
 * @returns {string} Caminho do ícone do carro correspondente.
 */
export function getCarPinByPlate(plate: string): string {
    const pins = {
        group1: '/img/pins/blue-car.png', // A - G
        group2: '/img/pins/green-car.png', // H - N
        group3: '/img/pins/orange-car.png', // O - U
        group4: '/img/pins/yellow-car.png', // V - Z
    };

    // Obtém a primeira letra da placa em maiúsculo
    const initialLetter = plate?.charAt(0).toUpperCase();

    // Define a lógica para os grupos
    if ('ABCDEFG'.includes(initialLetter)) return pins.group1;
    if ('HIJKLMN'.includes(initialLetter)) return pins.group2;
    if ('OPQRSTU'.includes(initialLetter)) return pins.group3;
    if ('VWXYZ'.includes(initialLetter)) return pins.group4;

    // Se a inicial não for válida, retorna um ícone padrão
    return '/img/pins/black-car.png';
}
