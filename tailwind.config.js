/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#2962ff',
        'brand-blue-dark': '#0039cb',
        'brand-blue-light': '#eaf1ff',
      },
      keyframes: {
        'fill-blue': {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'fill-blue': 'fill-blue 0.5s ease-out forwards',
        'fill-blue-reverse': 'fill-blue 0.5s ease-out reverse'
      }
    },
  },
  plugins: [],
}

