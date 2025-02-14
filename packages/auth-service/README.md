# Auth Service

A modular authentication service handling user registration, email verification, password management, and JWT-based authentication/authorization.

It has been built in a way that supports both using it as a package, and easily transformable to its own microservice.

## Structure

```
src
  handlers
    [handler]
      schema.ts - zod validation schema of the handler args
      index.ts - the handlers themselves
    types - handler related types
    index.ts - barrel file exporting the handlers
  models - database models to be created from mongoose schemas
  constants - reusable centralised constants
  utils - reusable centralised utility functions
  authServiceFactory.ts - factory function that returns the service handlers
```

### Handlers

Handlers are factory functions themselves, where the high level structure looks like this:

```
handlerFactory = (context) => handler
handler = validateArgs(schema, (args) => result)
```

- The first function receives `HandlerProps` (from `handlers/[handler]/types`) and provides context to the handler via closure. It is initialised when the service is initialised.
- The returned handler function is then called from the service.
- It first validates input arguments with `validateArgs` during runtime, throwing an error if they don’t match the schema.
- If validation passes, it executes the callback function, and returns the result.

### Service factory

The service factory function is:

- receiving the config as its parameter
- sets up the handler props for context inside the body
- returns the service's methods, initialising each handler factory function with context

In the service factory context we:

- establish a connection with the database
- create an instance of the comms service
- create auth related models
  all of which are passed down to the handlers.

## Usage

### Creating a new database model

Create a new file `[Model].ts` in `/src/models`.

Models receive props from the service factory context, most importantly the database connection.

Import the required mongoose schema from `@repo/mongodb-helpers`.

Optionally assign hooks to the schema.

Return the model created upon the connection.

Example:

```typescript
import type { Connection } from 'mongoose';
import { setBasicEventTimes, RefreshTokenSchema } from '@repo/mongodb-helpers';

type CreateRefreshTokenModelProps = {
  connection: Connection;
};

export const createRefreshTokenModel = (
  props: CreateRefreshTokenModelProps,
) => {
  RefreshTokenSchema.pre('save', async function handler() {
    setBasicEventTimes(this);
  });

  return props.connection.model('RefreshToken', RefreshTokenSchema);
};
```

### Creating a new handler

Define the schema for the arguments in `src/handlers/[handler]/schema.ts`:

```typescript
export const refreshTokensArgsSchema = object({
  refreshToken: string(),
});
```

Define the handler based on the pattern explained above, and validate the args using the previously created schema.

Example:

```typescript
export const removeRefreshToken = ({
  RefreshTokenModel,
  config,
}: HandlerProps) =>
  validateArgs(refreshTokensArgsSchema, async ({ refreshToken }) => {
    try {
      const refreshTokenPayload = verify(
        refreshToken,
        config.REFRESH_TOKEN_KEY,
      ) as (JwtPayload & RefreshTokenPayload) | null;
      if (refreshTokenPayload?._id) {
        await RefreshTokenModel.findByIdAndDelete(
          refreshTokenPayload._id,
        ).exec();
      }
    } catch (e) {
      return true;
    }

    return true;
  });
```
