# tsup configs

## Introduction

This package contains reusable tsup configs for each environment.

## Usage

Extend `tsup.config.ts` with the appropriate config as:

```ts
import { defineConfig, type Options } from 'tsup';
import { base } from '@repo/tsup-config';

export default defineConfig((options: Options) => ({
  ...base,
  ...options,
}));
```
