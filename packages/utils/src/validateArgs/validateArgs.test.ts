import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { validateArgs } from './'; // Update this path as needed

describe('validateArgs', () => {
  it('should call the provided function with validated arguments', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number().int(),
    });

    const mockFn = vi.fn(
      (args: { name: string; age: number }) =>
        `Hello, ${args.name}. You are ${args.age} years old.`,
    );
    const wrappedFn = validateArgs(schema, mockFn);

    const result = wrappedFn({ name: 'John', age: 30 });

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith({ name: 'John', age: 30 });
    expect(result).toBe('Hello, John. You are 30 years old.');
  });

  it('should throw an error if arguments fail validation', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number().int(),
    });

    const mockFn = vi.fn();
    const wrappedFn = validateArgs(schema, mockFn);

    expect(() => wrappedFn({ name: 'John', age: '30' as any })).toThrowError(
      /Expected number, received string/,
    );
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should handle optional schema fields correctly', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number().int().optional(),
    });

    const mockFn = vi.fn(
      (args: { name: string; age?: number }) =>
        `Name: ${args.name}, Age: ${args.age ?? 'unknown'}`,
    );
    const wrappedFn = validateArgs(schema, mockFn);

    const result = wrappedFn({ name: 'Alice' });

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith({ name: 'Alice' });
    expect(result).toBe('Name: Alice, Age: unknown');
  });

  it('should work with more complex schemas', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number().int(),
      address: z.object({
        city: z.string(),
        postalCode: z.string(),
      }),
    });

    const mockFn = vi.fn(
      (args: {
        name: string;
        age: number;
        address: { city: string; postalCode: string };
      }) => {
        return `Name: ${args.name}, Age: ${args.age}, City: ${args.address.city}`;
      },
    );

    const wrappedFn = validateArgs(schema, mockFn);

    const result = wrappedFn({
      name: 'Bob',
      age: 40,
      address: {
        city: 'London',
        postalCode: '12345',
      },
    });

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith({
      name: 'Bob',
      age: 40,
      address: { city: 'London', postalCode: '12345' },
    });
    expect(result).toBe('Name: Bob, Age: 40, City: London');
  });

  it('should work with empty schemas', () => {
    const schema = z.object({});
    const mockFn = vi.fn(() => 'No arguments required');
    const wrappedFn = validateArgs(schema, mockFn);

    const result = wrappedFn({});

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith({});
    expect(result).toBe('No arguments required');
  });
});
