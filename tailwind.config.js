/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coral:    { DEFAULT: '#FF6B6B', light: '#FF8E8E', dark: '#E05252' },
        sage:     { DEFAULT: '#87A878', light: '#A3BF96', dark: '#6B8A5E' },
        offwhite: { DEFAULT: '#F5ECD7', warm: '#EDE0C4', deep: '#D4C4A0' },
        midnight: { DEFAULT: '#1C1C1E', soft: '#2C2C2E', muted: '#3A3A3C' },
        gold:     { DEFAULT: '#C9A84C', light: '#E2C06A', dark: '#A8882E' },
      },
      fontFamily: {
        syne:  ['Syne', 'sans-serif'],
        dm:    ['DM Sans', 'sans-serif'],
        caveat:['Caveat', 'cursive'],
      },
      animation: {
        'fade-up':   'fadeUp 0.7s ease forwards',
        'draw':      'drawLine 2s ease forwards',
        'float':     'float 6s ease-in-out infinite',
        'pulse-soft':'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float:     { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
      },
    },
  },
  plugins: [],
}
