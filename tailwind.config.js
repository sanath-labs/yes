/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#F6F2E8',
        paperDark: '#14170F',
        ink: '#23291B',
        field: {
          50: '#EAF1E7',
          100: '#D2E2CB',
          200: '#A8C79C',
          300: '#7CA96C',
          400: '#517F45',
          500: '#2F5233',
          600: '#254129',
          700: '#1B3020',
          800: '#132218',
          900: '#0C1610',
        },
        wheat: {
          100: '#FBEFD2',
          200: '#F4DA9E',
          300: '#EBC069',
          400: '#D9A441',
          500: '#B9832A',
          600: '#8F6420',
        },
        clay: {
          100: '#EFDDCE',
          300: '#C99A76',
          500: '#8C5A3C',
          700: '#63402A',
        },
        alert: {
          100: '#F6DEDC',
          500: '#B23A34',
          700: '#7E2823',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Noto Sans"', '"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        board: 'inset 0 2px 4px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)',
        card: '0 1px 2px rgba(35,41,27,0.06), 0 8px 24px rgba(35,41,27,0.06)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
