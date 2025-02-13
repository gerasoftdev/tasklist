import type { AccessTokenPayload } from '@repo/types';
import type { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

export const getUser = (accessToken: string, accessTokenKey: string) => {
  if (!accessToken) return null;

  try {
    return verify(accessToken, accessTokenKey) as JwtPayload &
      AccessTokenPayload;
  } catch (e) {
    return null;
  }
};
