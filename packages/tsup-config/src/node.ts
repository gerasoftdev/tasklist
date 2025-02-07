import type { Options } from 'tsup';

export const node: Options = {
  entry: [`./src/index.ts`],
  format: ['cjs'],
  dts: false,
  treeshake: true,
  sourcemap: process.env.NODE_ENV !== 'production',
  minify: process.env.NODE_ENV === 'production',
};
