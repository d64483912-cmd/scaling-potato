import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome dark theme colors
        background: {
          DEFAULT: '#0a0a0a',
          secondary: '#1a1a1a',
          tertiary: '#2a2a2a',
        },
        foreground: {
          DEFAULT: '#f5f5f5',
          secondary: '#d4d4d4',
          tertiary: '#a3a3a3',
        },
        border: {
          DEFAULT: '#3a3a3a',
          light: '#4a4a4a',
        },
        accent: {
          DEFAULT: '#6b6b6b',
          hover: '#7b7b7b',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
