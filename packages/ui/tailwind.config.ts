import type { Config } from 'tailwindcss';
import { tailwindPreset } from './src/presets';

const config: Config = {
  content: tailwindPreset.content,
  presets: [tailwindPreset],
};

export default config;
