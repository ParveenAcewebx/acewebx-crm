import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isStringValidNumber(value: string): boolean {
  return !isNaN(Number(value)) && value.trim() !== ''
}

export function getSelectOptions(list: string[] | undefined) {
  if (!list || !list.length) return []

  return list.map(item => ({
    id: item,
    label: item,
    value: item
  }))
}
