/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgb(var(--sc-input) / <alpha-value>)',
        input: 'rgb(var(--sc-input) / <alpha-value>)',
        ring: 'rgb(var(--sc-ring) / <alpha-value>)',
        foreground: 'rgb(var(--sc-foreground) / <alpha-value>)',
        popover: {
          DEFAULT: 'rgb(var(--sc-popover) / <alpha-value>)',
          foreground: 'rgb(var(--sc-popover-fg) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--sc-accent) / <alpha-value>)',
          foreground: 'rgb(var(--sc-muted-fg) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--sc-accent) / <alpha-value>)',
          foreground: 'rgb(var(--sc-accent-fg) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: '#C0392B',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
