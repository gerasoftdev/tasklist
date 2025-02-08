# Task List API

## Intro

A GraphQL API built with Fastify and Apollo Server, featuring strong TypeScript support and modern development practices.

## Stack

- Node.js
- Fastify
- Apollo GraphQL
- TypeScript
- Zod
- MongoDB
- Vitest
- GraphQL Code Generator

## Local development

- Copy environment file:

```bash
cp apps/api/.env.sample apps/api/.env
```

- Update apps/api/.env with your configuration:

```
DB_CONNECTION_STRING=mongodb://localhost:27017/tasklist-db
```

- Connect to local mongodb instance
- run `pnpm dev`

## Generate GraphQL types

`pnpm graphql-codegen`

## Documentation

GraphQL Playground: https://studio.apollographql.com/sandbox/explorer (enter `http://localhost:3005/graphql`)

Swagger UI: http://localhost:3005/documentation

## Folder Structure

```
src
  config - environment configuration
  graphql
    resolvers
      [resolver]
        [resolver].test.ts
        index.ts
    context.ts - context passed to resolvers
    executableSchema.ts - GraphQL executable schema
  plugins
    [plugin]
      index.ts
      schema.ts - type extension of fastify
    index.ts - barrel file
  routes
    [route]
      index.ts
      schema.ts - zod schema of request and response
      [route].test.ts
  types
    graphql - codegen generated types
  server.ts
  types
```
