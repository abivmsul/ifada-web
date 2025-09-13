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
       keyframes: {
        shimmer: {
          '0%': { 'background-position': '200% 0' },
          '100%': { 'background-position': '-200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.1s linear infinite',
      },
      backgroundImage: {
        'skeleton-gradient': 'linear-gradient(90deg, rgba(230,230,230,1) 0%, rgba(245,245,245,1) 40%, rgba(230,230,230,1) 70%)',
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
