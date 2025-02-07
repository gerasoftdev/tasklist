/// <reference types="vitest/config" />
import node from '@repo/vitest-presets/node';
import { mergeConfig } from 'vitest/config';

export default mergeConfig(node, {
  resolve: { alias: { graphql: 'graphql/index.js' } },
});
