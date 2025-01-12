import type { Options } from 'tsup';

export const base: Options = {
  entry: [`./src/**/*.(ts|tsx)`, `!./src/**/*.test.(ts|tsx)`],
  format: ['cjs', 'esm'],
  dts: false,
  treeshake: true,
  external: ['@repo/tsup-config'],
  sourcemap: process.env.NODE_ENV !== 'production',
  minify: process.env.NODE_ENV === 'production',
};
