import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import browser from '@repo/vitest-presets/browser';

export default mergeConfig(
  browser,
  defineConfig({
    plugins: [react(), tsconfigPaths()],
  }),
);
