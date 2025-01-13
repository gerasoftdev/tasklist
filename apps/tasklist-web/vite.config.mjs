import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import browser from '@repo/vitest-presets/browser';

export default mergeConfig(
  browser,
  defineConfig({
    define: {
      process: {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react'],
            'react-dom': ['react-dom'],
          },
        },
      },
    },
    plugins: [react(), tsconfigPaths()],
    server: {
      watch: {
        ignored: ['**/coverage/**'],
      },
    },
  }),
);
