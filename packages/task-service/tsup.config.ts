import { defineConfig, type Options } from 'tsup';
import { base } from '@repo/tsup-config';

export default defineConfig((options: Options) => ({
  ...base,
  ...options,
}));
