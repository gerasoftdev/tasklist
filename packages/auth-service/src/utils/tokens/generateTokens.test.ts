import { describe, it, expect, vi } from 'vitest';
import { sign } from 'jsonwebtoken';
import { dToMs, hToMs } from '@repo/utils';
import { generateTokens } from '@/utils/tokens';
import { mockUser } from '@/__fixtures__/user';

const accessTokenId = 'atId';
const refreshTokenId = 'rtId';

vi.mock('jsonwebtoken', () => ({
  sign: vi.fn(
    (payload, key, options) =>
      `${key}-${JSON.stringify(payload)}-${options.expiresIn}`,
  ),
}));
vi.mock('uuid', () => ({
  v4: vi.fn(() => accessTokenId),
}));

describe('generateTokens', () => {
  const mockRefreshToken = {
    _id: refreshTokenId,
    userId: mockUser._id,
    orgId: mockUser.orgId,
    expiresAt: Date.now() + 10000,
  };
  const mockRefreshTokenModel = {
    create: vi.fn().mockResolvedValue({
      ...mockRefreshToken,
      toObject: vi.fn(() => {
        return mockRefreshToken;
      }),
    }),
  } as any;

  const config = {
    REFRESH_TOKEN_EXPIRY: dToMs,
    ACCESS_TOKEN_EXPIRY: hToMs,
    REFRESH_TOKEN_KEY: 'refresh-key',
    ACCESS_TOKEN_KEY: 'access-key',
  } as any;

  const handlerProps = {
    config,
    RefreshTokenModel: mockRefreshTokenModel,
  };

  it('should generate access and refresh tokens with correct payload and expiry', async () => {
    const tokens = await generateTokens(handlerProps)(mockUser);

    expect(mockRefreshTokenModel.create).toHaveBeenCalledWith({
      userId: mockUser._id,
      orgId: mockUser.orgId,
      accessTokenId,
      expiresAt: expect.any(Number),
    });

    expect(sign).toHaveBeenCalledWith(
      {
        _id: refreshTokenId,
        userId: mockUser._id,
        orgId: mockUser.orgId,
      },
      'refresh-key',
      { expiresIn: 86400 },
    );

    expect(sign).toHaveBeenCalledWith(
      {
        _id: accessTokenId,
        userId: mockUser._id,
        email: mockUser.email,
        orgId: mockUser.orgId,
      },
      'access-key',
      { expiresIn: 3600 },
    );

    expect(tokens).toEqual({
      refreshToken:
        'refresh-key-{"_id":"rtId","userId":"user","orgId":"org"}-86400',
      accessToken:
        'access-key-{"_id":"atId","userId":"user","email":"some@one.com","orgId":"org"}-3600',
    });
  });
});
