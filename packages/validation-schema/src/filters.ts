import type { z, ZodType } from 'zod';
import { array, boolean, number, object, string, enum as zEnum } from 'zod';

export const maybe = <T>(schema: ZodType<T>) => schema.nullable();

export const stringFiltersSchemaFields = {
  eq: maybe(string()).optional(),
  in: maybe(array(maybe(string()))).optional(),
  ne: maybe(string()).optional(),
  nin: maybe(array(maybe(string()))).optional(),
  not: maybe(string()).optional(),
  options: maybe(string()).optional(),
  regex: maybe(string()).optional(),
};
export const stringFiltersSchema = object(stringFiltersSchemaFields);
export type StringFilters = z.infer<typeof stringFiltersSchema>;

export const arrayFiltersSchemaFields = {
  size: maybe(number()).optional(),
};
export const arrayFiltersSchema = object(arrayFiltersSchemaFields);
export type ArrayFilters = z.infer<typeof arrayFiltersSchema>;

export const arrayOfStringFiltersSchemaFields = {
  eq: maybe(array(maybe(string()))).optional(),
  in: maybe(array(maybe(string()))).optional(),
  ne: maybe(array(maybe(string()))).optional(),
  nin: maybe(array(maybe(string()))).optional(),
  options: maybe(string()).optional(),
  regex: maybe(string()).optional(),
};
export const arrayOfStringFiltersSchema = object(
  arrayOfStringFiltersSchemaFields,
);
export type ArrayOfStringFilters = z.infer<typeof arrayOfStringFiltersSchema>;

export const numberFiltersSchemaFields = {
  eq: maybe(number()).optional(),
  gt: maybe(number()).optional(),
  gte: maybe(number()).optional(),
  in: maybe(array(maybe(number()))).optional(),
  lt: maybe(number()).optional(),
  lte: maybe(number()).optional(),
  ne: maybe(number()).optional(),
  ngt: maybe(number()).optional(),
  nin: maybe(array(maybe(number()))).optional(),
  nlt: maybe(number()).optional(),
};
export const numberFiltersSchema = object(numberFiltersSchemaFields);
export type NumberFilters = z.infer<typeof numberFiltersSchema>;

// BooleanFilters schema (simple nullable boolean)
export const booleanFiltersSchema = maybe(boolean()).optional();
export type BooleanFilters = z.infer<typeof booleanFiltersSchema>;

// Enum SortMethod schema
export const sortMethodSchema = zEnum(['asc', 'desc']);
export type SortMethod = z.infer<typeof sortMethodSchema>;
