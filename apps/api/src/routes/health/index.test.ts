import type { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { startTestServer } from '@/utils/test/server';
import { healthRoutes } from '@/routes/health';

describe('GET /health', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await startTestServer();

    await server.register(healthRoutes);

    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it('should respond with 200 and { ok: true }', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.json()).toMatchObject({ ok: true });
  });
});
