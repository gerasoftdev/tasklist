import type { ArrayFilters, NumberFilters, StringFilters } from '@repo/types';
import type { FilterQuery } from 'mongoose';

type Filters<T extends Record<string, unknown>> = {
  [_key in keyof T]?:
    | boolean
    | StringFilters
    | NumberFilters
    | ArrayFilters
    | undefined
    | null;
} & {
  $not?: NumberFilters;
};

export const formatFilters = <T extends Filters<T>>(
  filters: T,
  prefix?: string,
) =>
  (Object.keys(filters) as (keyof T)[]).reduce<FilterQuery<T>>(
    (formattedFilters, key) => {
      const filter = filters[key];

      if (filter === undefined) return formattedFilters;

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it is not unnecessary
      if (filter === null) {
        return {
          ...formattedFilters,
          [`${prefix ? `${prefix}.` : ''}${String(key)}`]: null,
        };
      }

      if (filter === true || filter === false) {
        return {
          ...formattedFilters,
          [`${prefix ? `${prefix}.` : ''}${String(key)}`]: Boolean(filter),
        };
      }

      const { ...operators } = filter as Exclude<
        T[keyof T],
        boolean | undefined | null
      >;
      const formattedOperators = (
        Object.keys(operators) as (keyof typeof operators)[]
      ).reduce<Filters<T>>((formatted, operator) => {
        if (['nlt', 'ngt'].includes(operator as string)) {
          return {
            ...formatted,
            $not: {
              ...(formatted.$not || {}),
              [operator === 'nlt' ? '$lt' : '$gt']: operators[operator],
            },
          };
        }
        return {
          ...formatted,
          [`$${String(operator)}`]: operators[operator],
        };
      }, {});

      return {
        ...formattedFilters,
        [`${prefix ? `${prefix}.` : ''}${String(key)}`]: formattedOperators,
      };
    },
    {},
  );
