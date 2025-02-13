import type { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { fastifyCookie } from '@fastify/cookie';
import { mockTokens } from '@repo/auth-service';
import { startTestServer } from '@/utils/test/server';
import { authRoutes } from '@/routes/auth';
import { authPlugin } from '@/plugins/auth';

const refreshTokensMock = vi.fn();

vi.mock('jsonwebtoken', () => ({
  decode: vi.fn().mockReturnValue({
    iat: 1,
    exp: 2,
  }),
}));

describe('/auth', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await startTestServer();

    server.decorate('authService', {
      refreshTokens: refreshTokensMock,
    } as any);

    await server.register(fastifyCookie);
    await server.register(authPlugin);
    await server.register(authRoutes);

    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it('should respond with 200 and refreshed tokens if refresh token is in body', async () => {
    refreshTokensMock.mockResolvedValue(mockTokens);

    const response = await server.inject({
      method: 'POST',
      url: '/refreshTokens',
      body: {
        refreshToken: 'previousRefreshToken',
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.json()).toMatchObject(mockTokens);
  });

  it('should respond with 200 and refreshed tokens if refresh token is in cookies', async () => {
    refreshTokensMock.mockResolvedValue(mockTokens);

    const response = await server.inject({
      method: 'POST',
      url: '/refreshTokens',
      cookies: {
        refreshToken: 'previousRefreshToken',
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.json()).toMatchObject(mockTokens);
  });

  it('should respond with 401 if no refresh token is found', async () => {
    refreshTokensMock.mockResolvedValue(mockTokens);

    const response = await server.inject({
      method: 'POST',
      url: '/refreshTokens',
    });

    expect(response.statusCode).toBe(401);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
