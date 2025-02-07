module.exports = {
  extends: [
    ...['@vercel/style-guide/eslint/node'].map(require.resolve),
    './index.js',
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/require-await': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
    },
  ],
  ignorePatterns: ['.*.js', 'node_modules/', 'dist/'],
};
