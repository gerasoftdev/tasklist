import type { Config } from 'tailwindcss';
import { tailwindPreset } from '@repo/ui';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@repo/ui/dist/**/*.{js,mjs}',
  ],
  darkMode: 'selector',
  presets: [tailwindPreset],
};

export default config;
