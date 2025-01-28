import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { fontSize, size, space } from '../theme';

export const tailwindPreset: Config = {
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('not-last-child', '& > *:not(:last-child)');
      addVariant('last-child', '& > *:last-child');
    }),
  ],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    spacing: space,
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    fontSize,
    colors: {
      g100: 'rgb(var(--color-g100) / <alpha-value>)',
      g300: 'rgb(var(--color-g300) / <alpha-value>)',
      g500: 'rgb(var(--color-g500) / <alpha-value>)',
      g700: 'rgb(var(--color-g700) / <alpha-value>)',
      g900: 'rgb(var(--color-g900) / <alpha-value>)',

      o10: 'var(--color-o10)',
      o20: 'var(--color-o20)',
      o30: 'var(--color-o30)',
      o40: 'var(--color-o40)',
      oD50: 'var(--color-oD50)',
      transparent: 'var(--color-transparent)',

      p300: 'rgb(var(--color-p300) / <alpha-value>)',
      p500: 'rgb(var(--color-p500) / <alpha-value>)',
      p700: 'rgb(var(--color-p700) / <alpha-value>)',

      green: 'rgb(var(--color-green) / <alpha-value>)',
      orange: 'rgb(var(--color-orange) / <alpha-value>)',
      pink: 'rgb(var(--color-pink) / <alpha-value>)',
      purple: 'rgb(var(--color-purple) / <alpha-value>)',
      red: 'rgb(var(--color-red) / <alpha-value>)',
      yellow: 'rgb(var(--color-yellow) / <alpha-value>)',
      blue: 'rgb(var(--color-blue) / <alpha-value>)',
      indigo: 'rgb(var(--color-indigo) / <alpha-value>)',
      teal: 'rgb(var(--color-teal) / <alpha-value>)',
    },
    extend: {
      width: size,
      height: size,
      borderRadius: space,
      aria: {
        invalid: 'invalid="true"',
      },
    },
  },
};
