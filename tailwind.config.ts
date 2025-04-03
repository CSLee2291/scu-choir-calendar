import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If using Pages Router
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Include App Router
  ],
  theme: {
    extend: {
      // Add custom theme settings if needed
    },
  },
  plugins: [],
};
export default config;