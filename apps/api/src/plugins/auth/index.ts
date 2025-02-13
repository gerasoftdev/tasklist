import { fastifyPlugin } from 'fastify-plugin';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { AuthError, dToMs, sToMs } from '@repo/utils';
import type { JwtPayload } from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
import { getUser } from '@/utils/getUser';

export const authPluginName = 'auth-plugin';

const plugin: FastifyPluginAsyncZod = async (fastify) => {
  fastify.decorateReply(
    'setRefreshToken',
    async function handler(refreshToken: string) {
      const { iat, exp } = decode(refreshToken) as JwtPayload;

      this.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: iat && exp ? (exp - iat) * sToMs : dToMs * 14,
        secure: fastify.config.NODE_ENV === 'production',
      });
    },
  );

  fastify.decorateReply('refreshToken', async function handler(refreshToken) {
    if (!refreshToken) throw new AuthError();

    const tokens = await fastify.authService.refreshTokens({ refreshToken });

    this.setRefreshToken(tokens.refreshToken);

    return tokens;
  });

  fastify.decorateRequest('requireUser', function handler() {
    const user = this.auth;
    if (!user) throw new AuthError();

    return user;
  });

  fastify.addHook('preHandler', async (request) => {
    const { authorization } = request.headers;
    if (!authorization) return;

    const accessToken = authorization.startsWith('Bearer ')
      ? authorization.split(' ')[1]
      : null;
    if (!accessToken) return null;

    const user = getUser(accessToken, fastify.config.ACCESS_TOKEN_KEY);
    request.auth = user;
  });
};

export const authPlugin = fastifyPlugin(plugin, {
  name: authPluginName,
});
