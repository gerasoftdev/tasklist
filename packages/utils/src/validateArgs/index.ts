/* eslint-disable @typescript-eslint/no-explicit-any -- to infer types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- to infer types */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- to infer types */
/* eslint-disable @typescript-eslint/no-unsafe-return -- to infer types */
import type { ZodTypeAny, infer as zodInfer } from 'zod';

export const validateArgs =
  <T extends ZodTypeAny, A extends zodInfer<T>, F extends (args: A) => any>(
    schema: T,
    fn: F,
  ) =>
  (args: A): ReturnType<F> => {
    const parsedArgs = schema.parse(args);
    return fn(parsedArgs);
  };
