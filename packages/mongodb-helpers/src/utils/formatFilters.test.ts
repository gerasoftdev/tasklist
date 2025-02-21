import { describe, it, expect } from 'vitest';
import { formatFilters } from './formatFilters';

describe('formatFilters', () => {
  it('should handle boolean filters correctly', () => {
    const filters = {
      isActive: true,
      isVerified: false,
    };

    const result = formatFilters(filters);

    expect(result).toEqual({
      isActive: true,
      isVerified: false,
    });
  });

  it('should handle string filters with $regex operator', () => {
    const filters = {
      username: { regex: 'john' },
    };

    const result = formatFilters(filters);

    expect(result).toEqual({
      username: { $regex: 'john' },
    });
  });

  it('should handle number filters with $gte and $lte operators', () => {
    const filters = {
      age: { gte: 18, lte: 30 },
    };

    const result = formatFilters(filters);

    expect(result).toEqual({
      age: { $gte: 18, $lte: 30 },
    });
  });

  it('should handle custom nlt and ngt operators (not less than, not greater than)', () => {
    const filters = {
      age: { nlt: 18, ngt: 30 },
    };

    const result = formatFilters(filters);

    expect(result).toEqual({
      age: { $not: { $lt: 18, $gt: 30 } },
    });
  });

  it('should handle filters with a prefix', () => {
    const filters = {
      'address.city': { eq: 'New York' },
    };

    const result = formatFilters(filters, 'user');

    expect(result).toEqual({
      'user.address.city': { $eq: 'New York' },
    });
  });

  it('should apply null filters', () => {
    const filters = {
      username: null,
    };

    const result = formatFilters(filters);

    expect(result).toEqual(filters);
  });

  it('should handle a mix of different filters', () => {
    const filters = {
      username: { regex: 'john' },
      isActive: true,
      age: { nlt: 18, ngt: 30 },
    };

    const result = formatFilters(filters);

    expect(result).toEqual({
      username: { $regex: 'john' },
      isActive: true,
      age: { $not: { $lt: 18, $gt: 30 } },
    });
  });

  it('should return an empty object when filters are undefined', () => {
    const filters = {
      isActive: undefined,
      age: undefined,
    };

    const result = formatFilters(filters);

    expect(result).toEqual({});
  });

  it('should handle empty filters input', () => {
    const filters = {};

    const result = formatFilters(filters);

    expect(result).toEqual({});
  });
});
