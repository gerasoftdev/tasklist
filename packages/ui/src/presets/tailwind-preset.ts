import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export const tailwindPreset: Config = {
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('not-last-child', '& > *:not(:last-child)');
      addVariant('last-child', '& > *:last-child');
    }),
  ],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Arial', 'sans-serif'],
    },
  },
};
