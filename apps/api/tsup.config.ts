import { defineConfig, type Options } from 'tsup';
import { node } from '@repo/tsup-config';

export default defineConfig((options: Options) => ({
  ...node,
  ...options,
}));
