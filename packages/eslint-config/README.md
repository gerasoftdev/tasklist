# ESLint configs

## Introduction

This package contains reusable ESLint configs for each environment.

## Usage

Extend `.eslintrc.cjs` with the appropriate config as:

```js
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/react.js'],
};
```
