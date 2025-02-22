import { mapToObject } from '@/mapToObject';
import { describe, expect, it } from 'vitest';

const array = [
  { id: '1', name: 1 },
  { id: '2', name: 2 },
];

describe('Map to object', () => {
  it('Maps array to object with the specified key, and value in the callback', () => {
    expect(
      mapToObject(array, ({ id, name }) => ({ key: id, value: name })),
    ).toMatchObject({
      '1': 1,
      '2': 2,
    });
  });
});
