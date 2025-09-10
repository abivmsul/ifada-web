/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#0057B8',
        secondary: '#D9A03C',
      },
       typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: { color: theme('colors.primary.600'), '&:hover': { color: theme('colors.primary.700') } },
          },
        },
      }),
    },
  },
plugins: [require('@tailwindcss/typography')],
}
