import { DATE_COUNTRY, DATE_TYPE, TODAY, dateFormatter, getToday } from './date-formatter';

import { formatDate } from '@angular/common';

describe('dateFormatter', () => {
  it('should format the date correctly', () => {
    const date = new Date('2024-08-01');
    const formattedDate = dateFormatter(date);
    expect(formattedDate).toBe('2024-08-01');
  });

  it("should format today's date correctly", () => {
    const formattedDate = getToday();
    const expectedDate = formatDate(TODAY, DATE_TYPE, DATE_COUNTRY);
    expect(formattedDate).toBe(expectedDate);
  });

  it('should handle different date inputs correctly', () => {
    const date = new Date('1990-01-01');
    const formattedDate = dateFormatter(date);
    expect(formattedDate).toBe('1990-01-01');
  });

  it('should handle invalid date inputs', () => {
    const invalidDate = new Date('invalid-date');
    expect(() => dateFormatter(invalidDate)).toThrow();
  });

  it("should return today's date in the correct format", () => {
    const today = new Date();
    const formattedToday = formatDate(today, DATE_TYPE, DATE_COUNTRY);
    expect(getToday()).toBe(formattedToday);
  });
});
