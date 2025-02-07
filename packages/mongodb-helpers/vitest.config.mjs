import node from '@repo/vitest-presets/node';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  node,
  defineConfig({
    test: {
      coverage: {
        exclude: ['src/constants', 'src/schemas'],
      },
    },
  }),
);
