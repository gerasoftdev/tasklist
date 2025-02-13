import { sToMs, validateArgs } from '@repo/utils';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import type { AccessTokenPayload, RefreshTokenPayload } from '@repo/types';
import type { HandlerProps } from '../../handlers/types';
import { createTokensArgsSchema } from './schema';

type GenerateTokenProps<T extends object | string> = {
  payload: T;
  expiryInMs: number;
  key: string;
};

export const generateToken = <T extends object>({
  payload,
  expiryInMs,
  key,
}: GenerateTokenProps<T>) =>
  sign(payload, key, { expiresIn: Math.round(expiryInMs / sToMs) });

export const generateTokens = ({
  config,
  RefreshTokenModel,
}: Pick<HandlerProps, 'config' | 'RefreshTokenModel'>) =>
  validateArgs(
    createTokensArgsSchema,
    async ({ _id: userId, email, ...restUserProps }) => {
      const userProps = {
        userId,
        ...restUserProps,
      };
      const accessTokenId = uuid();
      const refreshTokenDoc = (
        await RefreshTokenModel.create({
          ...userProps,
          accessTokenId,
          expiresAt: Date.now() + config.REFRESH_TOKEN_EXPIRY,
        })
      ).toObject();

      const refreshToken = generateToken<RefreshTokenPayload>({
        payload: {
          _id: refreshTokenDoc._id,
          userId,
          ...restUserProps,
        },
        expiryInMs: config.REFRESH_TOKEN_EXPIRY,
        key: config.REFRESH_TOKEN_KEY,
      });
      const accessToken = generateToken<AccessTokenPayload>({
        payload: {
          _id: accessTokenId,
          userId,
          email,
          ...restUserProps,
        },
        expiryInMs: config.ACCESS_TOKEN_EXPIRY,
        key: config.ACCESS_TOKEN_KEY,
      });

      return { refreshToken, accessToken };
    },
  );
