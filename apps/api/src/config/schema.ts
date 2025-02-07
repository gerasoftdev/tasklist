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
});

export type Config = zodInfer<typeof configSchema>;
