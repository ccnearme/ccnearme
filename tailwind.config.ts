import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7cfc7',
          300: '#a3aea3',
          400: '#7f8d7f',
          500: '#637263',
          600: '#4d5a4d',
          700: '#3f493f',
          800: '#353c35',
          900: '#2d322d',
        },
      },
    },
  },
  plugins: [],
};
export default config;
