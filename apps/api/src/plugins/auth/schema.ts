import type { AccessTokenPayload } from '@repo/types';
import type { JwtPayload } from 'jsonwebtoken';

type Auth = JwtPayload & AccessTokenPayload;

declare module 'fastify' {
  interface FastifyReply {
    setRefreshToken: (refreshToken: string) => Promise<void>;
    refreshToken: (refreshToken: string | null | undefined) => Promise<{
      accessToken: string;
      refreshToken: string;
    }>;
  }
  interface FastifyRequest {
    auth: Auth | null;
    requireUser: () => Auth;
  }
}
