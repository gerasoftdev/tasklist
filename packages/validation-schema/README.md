# Validation Schema

## Intro

Collection of zod validation schemas.

## Folder structure

```
src
  [schema].ts
```

## Usage pattern

Create and export constants (avoid magic numbers):

```typescript
export const minAge = 18;
```

Create and export a `[schema]SchemaFields` object like:

```typescript
export const adultSchemaFields = {
  name: string(),
  age: number().min(minAge),
};
```

Create the `[schema]Schema`:

```typescript
export const adultSchema = object(adultSchemaFields);
```

Export the inferred types:

```typescript
export type Adult = z.infer<typeof adultSchema>;
```
