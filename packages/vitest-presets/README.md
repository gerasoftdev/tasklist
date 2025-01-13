# Vitest presets

## Introduction

This package contains reusable vitest presets, and initial setups for each environment.

## Usage

Extend `(vitest|vite).config.mjs` with the appropriate preset as either just exporting it:

```js
import browser from '@repo/vitest-presets/browser';

export default browser;
```

or merge with custom settings:

```js
/// <reference types="vitest/config" />
import browser from '@repo/vitest-presets/browser';
import { mergeConfig } from 'vitest/config';

export default mergeConfig(browser, {
  // custom settings
});
```
