import { object, string } from 'zod';

export const refreshTokensBodySchema = object({
  refreshToken: string().optional(),
})
  .optional()
  .nullable();

export const refreshTokensResponseSchema = object({
  refreshToken: string(),
  accessToken: string(),
});
