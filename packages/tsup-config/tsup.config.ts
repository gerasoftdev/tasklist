import { defineConfig, type Options } from 'tsup';
import { base } from '@/index';

export default defineConfig((options: Options) => ({
  ...base,
  entry: ['./src/index.ts'],
  ...options,
}));
