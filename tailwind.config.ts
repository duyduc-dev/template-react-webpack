import type { Config } from 'tailwindcss';

export default {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
} satisfies Config;
