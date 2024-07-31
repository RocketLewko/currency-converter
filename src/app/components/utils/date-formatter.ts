import { formatDate } from '@angular/common';

export const DATE_TYPE = 'yyyy-MM-dd';
export const DATE_COUNTRY = 'pl';
export const TODAY = new Date();

export function dateFormatter(date: Date): string {
  return formatDate(date, DATE_TYPE, DATE_COUNTRY);
}

export function getToday(): string {
  return dateFormatter(TODAY);
}
