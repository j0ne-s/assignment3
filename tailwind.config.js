/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.html`],
  theme: {
    extend: {
      colors: {
        'custom-404': '#f8fdef'
      },
      animation: {
        'blink': 'blink .6s infinite',
      },
      keyframes: {
        blink: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['lemonade'],
  },
}

