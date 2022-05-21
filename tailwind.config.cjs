const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      colors: {
        accent: colors.blue[600]
      },
    },
    borderRadius: {
      DEFAULT: '8px',
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
}
