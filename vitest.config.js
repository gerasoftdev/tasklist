/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      include: ['**/src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        '**/__fixtures__',
        '**/__mocks__',
        '**/types',
        '**/constants',
        '**/*.d.ts',
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
