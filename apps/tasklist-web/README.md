# Task List App

## Intro

This is a Task List web app that makes users able to manage their tasks by adding new tasks, checking tasks that are done, and yet to be completed, also organising them in lists.

## Stack

- Framework: React
- Bundler: Vite
- Styling: TailwindCSS
- State Management: Zustand
- Routing: Wouter
- Internationalisation: i18n

## Folder structure

```
src
  routes
    (auth, unauth) - authenticated/unauthenticated routes
      [route]
        [route?] - nested routes if exist
        features - features associated with the route
          [feature].tsx
          [feature].test.tsx
          [feature].stories.tsx
        index.tsx - the root route
    index.tsx - the root router
  components - components that cannot be associated with a single route
  hooks
  constants
  utils
```

## Styling

Styles are consumed by `@repo/ui` from `packages/ui`, with custom classes using tailwind.
