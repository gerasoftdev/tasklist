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

## Packages

- [eslint-config](./packages/eslint-config/README.md) - eslint configs
- [translation](./packages/translation/README.md) - translations
- [tsup-config](./packages/tsup-config/README.md) - tsup configs
- [typescript-config](./packages/typescript-config/README.md) - typescript configs
- [ui](./packages/ui/README.md) - design library (components, themes, utils)
- [vitest-presets](./packages/vitest-presets/README.md) - vitest presets

## Commands

- `clean`: clean build output of every package
- `clean:deps`: clean `node_modules` of root, and of every package
- `clean:deep`: clean build output, and `node_modules`
- `dev`: run dev build of every package
- `format`: format the codebase with `prettier`
- `lint`: lint the codebase (each package using its own config) with `eslint`
- `lint:fix`: lint, and auto-fix fixable issues
- `prepare`: init `husky`
- `storybook`: run storybook in every package
- `test`: run every test in the codebase
- `typecheck`: run typecheck in the codebase

Many of the above commands are available in each individual package, and they can be ran independently. At root level, we run these commands using `turborepo`, which runs these commands at once for every package.

## Notes

### Mixed absolute/relative paths in imports

In packages, we are using relative paths, while in apps we use absolute paths. We want to be able to easily see references between packages, and it is not as straightforward as it seems. `tsup` doesn't have good support for typescript sourcemaps, and one solution for it would be extracting away from `tsup` to `rollup`. However that still would require builds to have up-to-date types between packages.

The current solution is that we export the types from the source code itself, which is always up to date, and references always point to the source code itself.

There is, however, a limitation: absolute path imports cannot be used within packages. This restriction arises because of how path aliases are configured. For instance, when `tasklist-web` references `@repo/ui`, absolute paths inside `@repo/ui` would break type references in `tasklist-web`. Each package defines its own path alias for `@` (pointing to its `src` directory). As a result, `@` in `tasklist-web` points to `tasklist-web/src`, while attempting to resolve `@` within `@repo/ui` would fail to locate the expected files.
