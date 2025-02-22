import type { SortMethod } from '@repo/types';
import { mapToObject } from '@repo/utils';

type SortBy<T extends string> = {
  field: T;
  method: SortMethod;
};

export const formatSortBy = <T extends string>(sortByArray: SortBy<T>[]) =>
  mapToObject(sortByArray, ({ field, method }) => ({
    key: field,
    value: method,
  }));
