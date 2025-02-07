import { boolean, object } from 'zod';

export const getHealthResponseSchema = object({
  ok: boolean(),
});
