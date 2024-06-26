// Codes by mahdi tasha
// Importing part
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Creating and exporting a function to concat tailwindcss class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Creating and exporting a function to get random integer between given min number and given max number
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Creating and exporting a function to create random rgb color
export function getRandomRgbColor(): string {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);

    return `rgb(${r}, ${g}, ${b})`;
}