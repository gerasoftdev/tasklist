import type { MutationResolvers, QueryResolvers } from '@/types/graphql';
import type { Context } from '@/graphql/context';

const signUpResolver: MutationResolvers<Context>['signUp'] = async (
  parent,
  { data: { email } },
  context,
) => {
  await context.authService.createVerificationToken({
    email,
  });

  return true;
};

const verifyPasswordTokenResolver: QueryResolvers<Context>['verifyPasswordToken'] =
  async (parent, { data: { passwordTokenId } }, context) => {
    const isValid = await context.authService.verifyPasswordToken({
      passwordTokenId,
    });

    return isValid;
  };

const verifyEmailResolver: MutationResolvers<Context>['verifyEmail'] = async (
  parent,
  { data: { verificationTokenId } },
  context,
) => {
  const passwordToken = await context.authService.verifyEmail({
    verificationTokenId,
  });

  return { passwordTokenId: passwordToken._id };
};

const setPasswordResolver: MutationResolvers<Context>['setPassword'] = async (
  parent,
  { data: { password, passwordTokenId } },
  context,
) => {
  await context.authService.setPassword({
    password,
    passwordTokenId,
  });

  return true;
};

const resetPasswordResolver: MutationResolvers<Context>['resetPassword'] =
  async (parent, { data: { email } }, context) => {
    try {
      await context.authService.resetPassword({ email });
    } catch (e) {
      // Return true regardless of error to prevent email enumeration
    }

    return true;
  };

const signInResolver: MutationResolvers<Context>['signIn'] = async (
  parent,
  { data: { email, password } },
  context,
) => {
  const tokens = await context.authService.signIn({ email, password });

  context.response.setRefreshToken(tokens.refreshToken);

  return tokens;
};

const refreshTokensResolver: MutationResolvers<Context>['refreshTokens'] =
  async (parent, { data }, context) => {
    const refreshToken =
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- may not have cookies
      context.request.cookies?.refreshToken || data?.refreshToken;

    const tokens = context.response.refreshToken(refreshToken);

    return tokens;
  };

const logoutResolver: MutationResolvers<Context>['logout'] = async (
  parent,
  { data },
  context,
) => {
  const refreshToken =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- may not have cookies
    context.request.cookies?.refreshToken || data?.refreshToken;
  if (!refreshToken) return true;

  await context.authService.removeRefreshToken({ refreshToken });

  context.response.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: context.config.NODE_ENV === 'production',
  });

  return true;
};

export const userResolvers = {
  Query: {
    verifyPasswordToken: verifyPasswordTokenResolver,
  },
  Mutation: {
    signUp: signUpResolver,
    verifyEmail: verifyEmailResolver,
    setPassword: setPasswordResolver,
    resetPassword: resetPasswordResolver,
    signIn: signInResolver,
    refreshTokens: refreshTokensResolver,
    logout: logoutResolver,
  },
};
