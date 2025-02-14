# GraphQL

## Intro

This package contains reusable GraphQL schemas, type definitions, and queries using `gql` (graphql-tag).

## Folder structure

```
src
  queries
    [query].ts
    index.ts - barrel file
  schemas
    [schema].ts - GraphQL schema
    index.ts - barrel file
  types
    index.ts - graphql-codegen generated types
  index.ts - barrel file
```

## Generate GraphQL types

`pnpm graphql-codegen`
