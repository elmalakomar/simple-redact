'use strict'

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'prettier',
  ],
  rules: {
    'eol-last': 'always'
  }
};