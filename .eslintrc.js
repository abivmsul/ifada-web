// .eslintrc.js
module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    // Make explicit any a warning during the migration
    '@typescript-eslint/no-explicit-any': 'warn',
    // optional: if you want to quiet a few noisy rules in CI, add them here
    // '@typescript-eslint/explicit-module-boundary-types': 'warn',
  },
}
