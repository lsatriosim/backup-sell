import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatInTimeZone } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildUtcDate(date: Date, time: string, timeZone = "Asia/Jakarta") {
  // time looks like "09:00"
  const [hours, minutes] = time.split(":").map(Number);

  // Build local datetime
  const local = new Date(date);
  local.setHours(hours, minutes, 0, 0);

  // Format it in UTC ISO
  const utcString = formatInTimeZone(local, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX");
  return new Date(utcString); // JS Date in UTC
}