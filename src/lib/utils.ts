import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addHours(date: Date, hours: number) {
  const dateCopy = new Date(date.getTime());
  const hoursToAdd = hours * 60 * 60 * 1000;
  dateCopy.setTime(date.getTime() + hoursToAdd);
  return dateCopy;
}
