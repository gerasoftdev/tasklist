# Comms service

This service is responsible for sending communications including emails using its handlers.

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
  constants - reusable centralised constants
  utils - reusable centralised utility functions
  commsServiceFactory.ts - factory function that returns the service handlers
```

### Handlers

Handlers are factory functions themselves, where the high level structure looks like this:

```
handlerFactory = (context) => handler
handler = validateArgs(schema, (args) => result)
```

- The first function receives `HandlerProps` (from `handlers/[handler]/types`) and provides context to the handler via closure. It is initialised when the service is initialised.
- The returned handler function is then called from the service.
- It first validates input arguments with `validateArgs` during runtime, throwing an error if they don’t match the schema.
- If validation passes, it executes the callback function, and returns the result.

### Service factory

The service factory function is:

- receiving the config as its parameter
- sets up the handler props for context inside the body
- returns the service's methods, initialising each handler factory function with context

## Usage

### Creating a new email handler

Define the schema for the arguments:

```typescript
export const sendPasswordResetEmailArgsSchema = object({
  email: string(),
  url: string(),
});
```

Use `utils/createEmail` that can construct an email from custom elements like so:

```typescript
import { validateArgs } from '@repo/utils';
import type { HandlerProps } from '../types';
import { createEmail, EmailElements } from '../../utils/createEmail';
import { EmailUserNames } from '../../constants/emailUserNames';
import {
  sendPasswordResetEmailArgsSchema,
  sendVerificationEmailArgsSchema,
} from './schema';

export const sendPasswordResetEmail = ({
  transporter,
  emailDomain,
}: HandlerProps) =>
  validateArgs(sendPasswordResetEmailArgsSchema, async ({ email, url }) => {
    const emailContent = createEmail({
      title: 'Password reset',
      domain: emailDomain,
      elements: [
        { type: EmailElements.h2, text: 'Password reset' },
        {
          type: EmailElements.text,
          text: `To create your new password click the button below. Please note that the link is valid for 24 hours.`,
        },
        {
          type: EmailElements.button,
          text: 'Reset password',
          href: url,
        },
      ],
    });
    return transporter.sendMail({
      from: `${EmailUserNames.noreply}@${emailDomain}`,
      to: email,
      subject: 'Reset your password',
      html: emailContent,
    });
  });
```

After defining the handler, extend the service factory with it.

It is using `nodemailer` with AWS SES in production. In non-prod environments it just logs the props provided to the console.
