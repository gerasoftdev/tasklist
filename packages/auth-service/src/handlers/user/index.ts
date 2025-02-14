import { AuthError, GeneralError, validateArgs } from '@repo/utils';
import { compare, hash } from 'bcrypt';
import type { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
import type { RefreshTokenPayload } from '@repo/types';
import type { HandlerProps } from '../types';
import {
  createVerificationTokenArgsSchema,
  signInArgsSchema,
  refreshTokensArgsSchema,
  resetPasswordArgsSchema,
  setPasswordArgsSchema,
  verifyUserArgsSchema,
  verifyPasswordTokenArgsSchema,
} from './schema';

export const createVerificationToken = ({
  VerificationTokenModel,
  UserModel,
  commsService,
  config,
}: HandlerProps) =>
  validateArgs(createVerificationTokenArgsSchema, async ({ orgId, email }) => {
    const existingUser = await UserModel.findOne({
      email,
    }).exec();
    if (existingUser) {
      throw new GeneralError('userAlreadyRegistered');
    }

    await VerificationTokenModel.deleteMany({
      email,
    }).exec();

    const verificationToken = await VerificationTokenModel.create({
      email,
      orgId,
      expiresAt: Date.now() + config.VERIFICATION_TOKEN_EXPIRY,
    });

    const verificationUrl = `${config.VERIFICATION_URL}/${verificationToken._id}`;

    await commsService.sendVerificationEmail({
      email,
      url: verificationUrl,
    });

    return true;
  });

export const verifyEmail = ({
  VerificationTokenModel,
  PasswordTokenModel,
  OrganizationModel,
  UserModel,
  config,
}: HandlerProps) =>
  validateArgs(verifyUserArgsSchema, async ({ verificationTokenId }) => {
    const verificationToken =
      await VerificationTokenModel.findById(verificationTokenId).exec();

    if (!verificationToken) throw new GeneralError('verificationTokenInvalid');
    await verificationToken.deleteOne();

    if (verificationToken.expiresAt < Date.now())
      throw new GeneralError('verificationTokenInvalid');

    const { email, orgId } = verificationToken;
    const organization =
      (orgId && (await OrganizationModel.findById(orgId).exec())) ||
      (await OrganizationModel.create({
        name: `${email.split('@')[0] || email}'s organization`,
      }));
    const user = await UserModel.create({
      orgId: organization._id,
      email,
      isGoogleSignIn: false,
      isVerified: true,
    });
    const passwordToken = await PasswordTokenModel.create({
      userId: user._id,
      expiresAt: Date.now() + config.PASSWORD_TOKEN_EXPIRY,
    });

    return passwordToken.toObject();
  });

export const verifyPasswordToken = ({ PasswordTokenModel }: HandlerProps) =>
  validateArgs(verifyPasswordTokenArgsSchema, async ({ passwordTokenId }) => {
    const passwordToken =
      await PasswordTokenModel.findById(passwordTokenId).exec();

    if (!passwordToken) return false;
    if (passwordToken.expiresAt < Date.now()) return false;

    return true;
  });

export const setPassword = ({
  PasswordTokenModel,
  RefreshTokenModel,
  UserModel,
}: HandlerProps) =>
  validateArgs(setPasswordArgsSchema, async ({ passwordTokenId, password }) => {
    const passwordToken =
      await PasswordTokenModel.findById(passwordTokenId).exec();

    if (!passwordToken) throw new GeneralError('passwordTokenInvalid');
    await passwordToken.deleteOne();

    if (passwordToken.expiresAt < Date.now())
      throw new GeneralError('passwordTokenInvalid');

    const { userId } = passwordToken;
    const user = await UserModel.findById(userId).exec();
    if (!user) throw new AuthError('userDoesNotExist');

    const passwordHash = await hash(password, 10);
    user.set({ password: passwordHash, isVerified: true });
    await user.save();

    await RefreshTokenModel.deleteMany({ userId }).exec();

    return true;
  });

export const resetPassword = ({
  PasswordTokenModel,
  commsService,
  UserModel,
  config,
}: HandlerProps) =>
  validateArgs(resetPasswordArgsSchema, async ({ email }) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new AuthError('userDoesNotExist');

    await PasswordTokenModel.deleteMany({ userId: user._id }).exec();

    const passwordToken = await PasswordTokenModel.create({
      userId: user._id,
      expiresAt: Date.now() + config.PASSWORD_TOKEN_EXPIRY,
    });

    const passwordResetUrl = `${config.PASSWORD_RESET_URL}/${passwordToken._id}`;

    await commsService.sendPasswordResetEmail({
      email,
      url: passwordResetUrl,
    });
  });

export const signIn = ({ UserModel, generateTokens }: HandlerProps) =>
  validateArgs(signInArgsSchema, async ({ email, password }) => {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) throw new AuthError('invalidCredentials');
    if (!user.password) throw new AuthError('noPasswordSet');

    const match = await compare(password, user.password);

    if (!match) throw new AuthError('invalidCredentials');

    const tokens = await generateTokens(user);
    return tokens;
  });

export const refreshTokens = ({
  generateTokens,
  config,
  RefreshTokenModel,
  UserModel,
}: HandlerProps) =>
  validateArgs(refreshTokensArgsSchema, async ({ refreshToken }) => {
    const refreshTokenPayload = (() => {
      try {
        return verify(refreshToken, config.REFRESH_TOKEN_KEY) as JwtPayload &
          RefreshTokenPayload;
      } catch (e) {
        throw new AuthError('refreshTokenInvalid');
      }
    })();

    const refreshTokenDoc = await RefreshTokenModel.findById(
      refreshTokenPayload._id,
    ).exec();
    if (!refreshTokenDoc) throw new AuthError('refreshTokenInvalid');
    refreshTokenDoc.deleteOne();

    const user = await UserModel.findById(refreshTokenPayload.userId).exec();
    if (!user) throw new AuthError('userDoesNotExist');

    const tokens = await generateTokens(user);
    return tokens;
  });

export const removeRefreshToken = ({
  RefreshTokenModel,
  config,
}: HandlerProps) =>
  validateArgs(refreshTokensArgsSchema, async ({ refreshToken }) => {
    try {
      const refreshTokenPayload = verify(
        refreshToken,
        config.REFRESH_TOKEN_KEY,
      ) as (JwtPayload & RefreshTokenPayload) | null;
      if (refreshTokenPayload?._id) {
        await RefreshTokenModel.findByIdAndDelete(
          refreshTokenPayload._id,
        ).exec();
      }
    } catch (e) {
      return true;
    }

    return true;
  });
