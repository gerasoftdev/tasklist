import { describe, expect, it } from 'vitest';
import { formatSortBy } from '@/utils/formatSortBy';

const sortByArray = [
  {
    field: 'name',
    method: 'asc',
  } as const,
  {
    field: 'createdAt',
    method: 'desc',
  } as const,
];

const expected = {
  name: 'asc',
  createdAt: 'desc',
};

describe('Format sort by', () => {
  it('converts array into object, mapping field as key and method as value', () => {
    expect(formatSortBy(sortByArray)).toMatchObject(expected);
  });
});
