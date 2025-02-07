import { GraphQLScalarType, Kind } from 'graphql';

const MAX_INT = Number.MAX_SAFE_INTEGER;
const MIN_INT = Number.MIN_SAFE_INTEGER;

function coerceBigInt(value: unknown) {
  if (value === '') {
    throw new TypeError(
      'BigInt cannot represent non 53-bit signed integer value: (empty string)',
    );
  }
  const num = Number(value);
  if (num > MAX_INT || num < MIN_INT) {
    throw new TypeError(
      `BigInt cannot represent non 53-bit signed integer value: ${String(
        value,
      )}`,
    );
  }
  const int = Math.floor(num);
  if (int !== num) {
    throw new TypeError(
      `BigInt cannot represent non-integer value: ${String(value)}`,
    );
  }
  return int;
}

export const commonResolvers = {
  RegExp: new GraphQLScalarType({
    name: 'RegExp',
    description: 'Regular expression',
    parseValue: (value) => {
      if (typeof value !== 'string') {
        throw new TypeError('RegExp can only accept string values.');
      }
      return new RegExp(value);
    },
  }),
  BigInt: new GraphQLScalarType({
    name: 'BigInt',
    description:
      'The `BigInt` scalar type represents non-fractional signed whole numeric ' +
      'values. BigInt can represent values between -(2^53) + 1 and 2^53 - 1. ',
    serialize: coerceBigInt,
    parseValue: coerceBigInt,
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        const num = parseInt(ast.value, 10);
        if (num <= MAX_INT && num >= MIN_INT) {
          return num;
        }
      }
      throw new TypeError('?');
    },
  }),
};
