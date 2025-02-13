import type { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { mockUser, mockTokens } from '@repo/auth-service';
import type {
  SignUpMutation,
  VerifyEmailMutation,
  SetPasswordMutation,
  ResetPasswordMutation,
  SignInMutation,
  RefreshTokensMutation,
  LogoutMutation,
  MutationSignUpArgs,
  MutationVerifyEmailArgs,
  MutationSetPasswordArgs,
  MutationResetPasswordArgs,
  MutationSignInArgs,
  MutationRefreshTokensArgs,
  MutationLogoutArgs,
} from '@repo/graphql';
import {
  SignUp,
  VerifyEmail,
  SetPassword,
  ResetPassword,
  SignIn,
  RefreshTokens,
  Logout,
} from '@repo/graphql';
import { print } from 'graphql';
import { startTestServer } from '@/utils/test/server';
import { graphqlRoutes } from '@/routes/graphql';
import { authPlugin } from '@/plugins/auth';

const createVerificationTokenMock = vi.fn();
const verifyEmailMock = vi.fn();
const setPasswordMock = vi.fn();
const resetPasswordMock = vi.fn();
const signInMock = vi.fn();
const refreshTokenMock = vi.fn();
const removeRefreshTokenMock = vi.fn();
const setRefreshTokenMock = vi.fn();
const clearCookieMock = vi.fn();

describe('User resolver', () => {
  let server: FastifyInstance;

  vi.mock('@/graphql/context', () => ({
    contextFunction: () => (request: any) => {
      return {
        request,
        config: {
          NODE_ENV: 'test',
        },
        response: {
          setRefreshToken: setRefreshTokenMock,
          clearCookie: clearCookieMock,
          refreshToken: refreshTokenMock,
        },
        authService: {
          createVerificationToken: createVerificationTokenMock,
          verifyEmail: verifyEmailMock,
          setPassword: setPasswordMock,
          resetPassword: resetPasswordMock,
          signIn: signInMock,
          removeRefreshToken: removeRefreshTokenMock,
        },
      };
    },
  }));

  beforeAll(async () => {
    server = await startTestServer();

    await server.register(authPlugin);
    await server.register(graphqlRoutes);

    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('signUp', () => {
    const variables: MutationSignUpArgs = {
      data: { email: mockUser.email },
    };
    const body = {
      query: print(SignUp),
      variables,
    };

    it('Should create verification token for sign-up', async () => {
      createVerificationTokenMock.mockReturnValue(true);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(response.statusCode).toBe(200);
      expect(createVerificationTokenMock).toBeCalledWith({
        email: variables.data.email,
      });

      const result = response.json();
      expect(result.data).toMatchObject<SignUpMutation>({ signUp: true });
    });
  });

  describe('verifyEmail', () => {
    const variables: MutationVerifyEmailArgs = {
      data: { verificationTokenId: 'test-token-id' },
    };
    const body = {
      query: print(VerifyEmail),
      variables,
    };

    it('Should verify email with a token', async () => {
      verifyEmailMock.mockReturnValue({ _id: 'password-token-id' });

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(response.statusCode).toBe(200);
      expect(verifyEmailMock).toBeCalledWith({
        verificationTokenId: variables.data.verificationTokenId,
      });

      const result = response.json();
      expect(result.data).toMatchObject<VerifyEmailMutation>({
        verifyEmail: { passwordTokenId: 'password-token-id' },
      });
    });
  });

  describe('setPassword', () => {
    const variables: MutationSetPasswordArgs = {
      data: { password: 'new-password', passwordTokenId: 'password-token-id' },
    };
    const body = {
      query: print(SetPassword),
      variables,
    };

    it('Should set a new password', async () => {
      setPasswordMock.mockReturnValue(true);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(response.statusCode).toBe(200);
      expect(setPasswordMock).toBeCalledWith(variables.data);

      const result = response.json();
      expect(result.data).toMatchObject<SetPasswordMutation>({
        setPassword: true,
      });
    });
  });

  describe('resetPassword', () => {
    const variables: MutationResetPasswordArgs = {
      data: { email: mockUser.email },
    };
    const body = {
      query: print(ResetPassword),
      variables,
    };

    it('Should send reset password email', async () => {
      resetPasswordMock.mockReturnValue(true);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(response.statusCode).toBe(200);
      expect(resetPasswordMock).toBeCalledWith({ email: variables.data.email });

      const result = response.json();
      expect(result.data).toMatchObject<ResetPasswordMutation>({
        resetPassword: true,
      });
    });
  });

  describe('signIn', () => {
    const variables: MutationSignInArgs = {
      data: { email: mockUser.email, password: 'test-password' },
    };
    const body = {
      query: print(SignIn),
      variables,
    };

    it('Should sign in a user and set refresh token', async () => {
      signInMock.mockReturnValue(mockTokens);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(response.statusCode).toBe(200);
      expect(signInMock).toBeCalledWith(variables.data);

      const result = response.json();
      expect(setRefreshTokenMock).toBeCalledWith(mockTokens.refreshToken);
      expect(result.data).toMatchObject<SignInMutation>({
        signIn: {
          accessToken: mockTokens.accessToken,
        },
      });
    });
  });

  describe('refreshTokens', () => {
    const variables: MutationRefreshTokensArgs = {
      data: { refreshToken: 'test-refresh-token' },
    };
    const body = {
      query: print(RefreshTokens),
      variables,
    };

    it('Should refresh tokens', async () => {
      refreshTokenMock.mockReturnValue(mockTokens);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(response.statusCode).toBe(200);
      expect(refreshTokenMock).toBeCalledWith(variables.data?.refreshToken);

      const result = response.json();
      expect(result.data).toMatchObject<RefreshTokensMutation>({
        refreshTokens: {
          accessToken: mockTokens.accessToken,
          refreshToken: mockTokens.refreshToken,
        },
      });
    });
  });

  describe('logout', () => {
    const variables: MutationLogoutArgs = {
      data: { refreshToken: 'test-refresh-token' },
    };
    const body = {
      query: print(Logout),
      variables,
    };

    it('Should log out a user and clear refresh token', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(response.statusCode).toBe(200);
      expect(removeRefreshTokenMock).toBeCalled();
      expect(clearCookieMock).toBeCalled();

      const result = response.json();
      expect(result.data).toMatchObject<LogoutMutation>({ logout: true });
    });
  });
});
