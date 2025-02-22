import { dToMs, mToMs } from '@repo/utils';
import { literal, number, object, preprocess, string, union } from 'zod';
import type { infer as zodInfer } from 'zod';

export const defaultConfigValues = {
  NODE_ENV: 'dev',
  ENV: 'dev',
  PORT: 3005,
  MAX_EVENT_LOOP_DELAY: 1000,
  MAX_HEAP_USED_BYTES: 100000000,
  MAX_RSS_BYTES: 300000000,
  CORS_ALLOWLIST: [],
  ACCESS_TOKEN_EXPIRY: mToMs * 15,
  VERIFICATION_TOKEN_EXPIRY: dToMs,
  REFRESH_TOKEN_EXPIRY: dToMs * 7,
  PASSWORD_TOKEN_EXPIRY: mToMs * 15,
} as const;

export const configSchema = object({
  NODE_ENV: union([
    literal('production'),
    literal('dev'),
    literal('test'),
  ]).default('dev'),
  ENV: union([literal('dev'), literal('stag'), literal('prod')]).default(
    defaultConfigValues.ENV,
  ),
  PORT: preprocess(Number, number())
    .optional()
    .default(defaultConfigValues.PORT),
  MAX_EVENT_LOOP_DELAY: number().default(
    defaultConfigValues.MAX_EVENT_LOOP_DELAY,
  ),
  MAX_HEAP_USED_BYTES: number().default(
    defaultConfigValues.MAX_HEAP_USED_BYTES,
  ),
  MAX_RSS_BYTES: number().default(defaultConfigValues.MAX_RSS_BYTES),
  CORS_ALLOWLIST: preprocess(
    (v) => (typeof v === 'string' ? JSON.parse(v) : v),
    string().array().optional(),
  )
    .optional()
    .default(defaultConfigValues.CORS_ALLOWLIST),
  DB_CONNECTION_STRING: string(),
  AWS_REGION: string(),
  DOMAIN_NAME: string(),
  VERIFICATION_URL: string(),
  PASSWORD_RESET_URL: string(),
  REFRESH_TOKEN_KEY: string(),
  ACCESS_TOKEN_KEY: string(),
  COOKIES_KEY: string(),
  ACCESS_TOKEN_EXPIRY: number().default(
    defaultConfigValues.ACCESS_TOKEN_EXPIRY,
  ),
  VERIFICATION_TOKEN_EXPIRY: number().default(
    defaultConfigValues.VERIFICATION_TOKEN_EXPIRY,
  ),
  REFRESH_TOKEN_EXPIRY: number().default(
    defaultConfigValues.REFRESH_TOKEN_EXPIRY,
  ),
  PASSWORD_TOKEN_EXPIRY: number().default(
    defaultConfigValues.PASSWORD_TOKEN_EXPIRY,
  ),
});

export type Config = zodInfer<typeof configSchema>;
