# Design library

## Introduction

This is the package containing the core components, themes, and design utils to be used by the frontend.

## Wiki

The design system documentation can be found here: [Wiki Page](https://doc.clickup.com/9012226562/p/h/8cjqag2-4272/8f90e7a801ee3bd).

## Folder structure

```
src
  types
    [type].ts
  css
    [style].css
  components
    [Component]
      [Component].stories.tsx?
      [Component].test.tsx?
      index.tsx
  presets - tailwind presets
    index.ts - barrel file exporting presets
    [preset].ts
  index.tsx - barrel file exporting the package's contents
```
