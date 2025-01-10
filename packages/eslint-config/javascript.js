/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jsonc/recommended-with-json',
    'turbo',
  ],
  plugins: ['unused-imports'],
  parser: 'espree',
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintcache'],
  rules: {
    'unicorn/filename-case': 'off',
    'import/no-default-export': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'jsonc/sort-keys': [
      'error',
      {
        pathPattern: '^.+$',
        order: { type: 'asc' },
      },
    ],
    'jsonc/comma-dangle': ['error', 'never'],
  },
  overrides: [
    {
      files: ['*.js?(x)', '*.mjs'],
    },
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^.+$',
            order: { type: 'asc' },
          },
        ],
      },
    },
  ],
};
