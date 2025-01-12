/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/javascript.js'],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
};
