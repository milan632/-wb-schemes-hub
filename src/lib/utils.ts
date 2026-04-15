import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(amount: string): string {
  if (!amount) return '';
  // Check if it starts with a number or is just a number
  if (/^\d/.test(amount)) {
    return `₹${amount}`;
  }
  return amount;
}
