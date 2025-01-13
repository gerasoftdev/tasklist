# Tasklist App

## Intro

This is a TypeScript monorepo containing the packages, and apps required for the Tasklist app to work.

## Stack

### Core Technologies

- Language: TypeScript
- Code Quality: Eslint and Prettier
- Source Control: GitHub
- Monorepo management: Turborepo
- Package manager: pnpm
- Bundler: Vite and Tsup
- Testing: Vitest

## Apps

- [tasklist-web](./apps/tasklist-web/README.md) - the web app frontend

## Notes

### Mixed absolute/relative paths in imports

In packages, we are using relative paths, while in apps we use absolute paths. We want to be able to easily see references between packages, and it is not as straightforward as it seems. `tsup` doesn't have good support for typescript sourcemaps, and one solution for it would be extracting away from `tsup` to `rollup`. However that still would require builds to have up-to-date types between packages.

The current solution is that we export the types from the source code itself, which is always up to date, and references always point to the source code itself.

There is, however, a limitation: absolute path imports cannot be used within packages. This restriction arises because of how path aliases are configured. For instance, when `tasklist-web` references `@repo/ui`, absolute paths inside `@repo/ui` would break type references in `tasklist-web`. Each workspace defines its own path alias for `@` (pointing to its `src` directory). As a result, `@` in `tasklist-web` points to `tasklist-web/src`, while attempting to resolve `@` within `@repo/ui` would fail to locate the expected files.
