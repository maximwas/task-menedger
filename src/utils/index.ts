import type { Word } from '@/types';

export function uniqueId(): string {
  return Math.random().toString(36).substring(2);
}

export function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function binarySearch(array: Word[], searchedValue: Word, first: number, last: number) {
  if (first > last) {
    return undefined;
  }

  const middle = Math.round((first + last) / 2);
  const middleValue = array[middle];

  if (middleValue.localeCompare(searchedValue, 'uk') === 0) {
    return middleValue;
  }

  if (middleValue.localeCompare(searchedValue, 'uk') === 1) {
    return binarySearch(array, searchedValue, first, middle - 1);
  }

  return binarySearch(array, searchedValue, middle + 1, last);
}
