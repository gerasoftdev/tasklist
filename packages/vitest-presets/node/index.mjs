/// <reference types="vitest/config" />
import { defineProject } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineProject({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: [`${import.meta.dirname}/vitest-setup.mjs`],
    passWithNoTests: true,
    include: ['src/**/*.test.(ts|tsx)'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/@types',
        'src/constants',
        'src/index.ts', // barrel files
        'src/**/*.test.ts',
      ],
      thresholds: {
        statements: 60,
        functions: 60,
        branches: 60,
        lines: 60,
      },
    },
  },
});
