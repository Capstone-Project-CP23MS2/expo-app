import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import buddhistEra from "dayjs/plugin/buddhistEra";
import th from 'dayjs/locale/th';
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(customParseFormat);
dayjs.locale(th);
dayjs.extend(buddhistEra);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);


// สร้างฟังก์ชันสำหรับการจัดรูปแบบวันที่
export function formatDate(date: string | Date, format: string = 'ddd DD MMM YYYY • H:mm'): string {
  return dayjs(date).format(format);
}

// สร้างฟังก์ชันสำหรับการคำนวณวันที่
export function addDays(date: string | Date, days: number): Date {
  return dayjs(date).add(days, 'day').toDate();
}

// สร้างฟังก์ชันสำหรับการเปรียบเทียบวันที่
export function isAfter(date: string | Date, compareDate: string | Date): boolean {
  return dayjs(date).isAfter(compareDate);
}

// สร้างฟังก์ชันสำหรับการเช็คว่าวันนี้เป็นวันเสาร์หรืออาทิตย์หรือไม่
export function isWeekend(date: string | Date): boolean {
  const dayOfWeek = dayjs(date).day();
  return dayOfWeek === 6 || dayOfWeek === 0; // เสาร์ = 6, อาทิตย์ = 0
}

export function getAge(dateOfBirth: string | Date): number {
  return dayjs().diff(dateOfBirth, 'year');
}