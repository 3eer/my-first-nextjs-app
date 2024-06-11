import { Revenue } from '@prisma/client';
import { ValidationError, ValidationErrors } from './definitions';
import { ZodIssue } from 'zod';

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
};

export function formatErrorMessages(
  errors: ZodIssue[] | { message: string } | null,
): ValidationError[] | null {
  if (!errors) return null;
  if (typeof errors === 'object' && 'message' in errors) {
    return [{ message: errors.message }];
  }
  return (errors as ZodIssue[]).map((error: ZodIssue) => {
    return { message: error.message, field: error.path[0] };
  });
}

export function isError(field: string, errors: ValidationErrors) {
  if (!errors || errors.length === 0) return false;

  return errors.map((error) => error.field).includes(field);
}

export const formatDateToLocal = (date: Date, locale: string = 'ja-JP') => {
  // const options: Intl.DateTimeFormatOptions = {
  //   day: 'numeric',
  //   month: 'short',
  //   year: 'numeric',
  // };
  // const formatter = new Intl.DateTimeFormat(locale, options);
  // return formatter.format(date);
  return date instanceof Date;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
