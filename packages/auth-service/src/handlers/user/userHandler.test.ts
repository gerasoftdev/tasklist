import type { Mock } from 'vitest';
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  it,
  vi,
  expect,
} from 'vitest';
import type { Model } from 'mongoose';
import mongoose from 'mongoose';
import { verify } from 'jsonwebtoken';
import errors from '@repo/translation/en/errors.json';
import { ZodError } from 'zod';
import { compare } from 'bcrypt';
import { connectToDb, disconnectFromDb, resetDb } from '@/utils/test/db';
import {
  createUserModel,
  createVerificationTokenModel,
  createPasswordTokenModel,
  createRefreshTokenModel,
  createOrganizationModel,
} from '@/models';
import {
  createVerificationToken,
  verifyEmail,
  setPassword,
  resetPassword,
  signIn,
  refreshTokens,
  removeRefreshToken,
  verifyPasswordToken,
} from '@/handlers/user';
import {
  mockUser,
  mockVerificationToken,
  mockPasswordToken,
  mockOrganization,
  mockRefreshToken,
  mockTokens,
} from '@/__fixtures__/user';
import type { HandlerProps } from '@/handlers/types';

const mockHashedPassword = 'mockHashedPassword';
const validRefreshToken = 'valid-refresh-token';
const invalidRefreshToken = 'invalid-refresh-token';

const config = {
  VERIFICATION_TOKEN_EXPIRY: 60000,
  PASSWORD_TOKEN_EXPIRY: 60000,
  REFRESH_TOKEN_KEY: 'refresh-key',
  PASSWORD_RESET_URL: 'https://example.com/reset-password',
  VERIFICATION_URL: 'https://example.com/verify',
} as any;

describe('Auth handlers', () => {
  let OrganizationModel: Model<any>;
  let UserModel: Model<any>;
  let VerificationTokenModel: Model<any>;
  let PasswordTokenModel: Model<any>;
  let RefreshTokenModel: Model<any>;
  let testEnv: any;

  let props: HandlerProps;
  const commsService = {
    sendVerificationEmail: vi.fn().mockResolvedValue(true),
    sendPasswordResetEmail: vi.fn().mockResolvedValue(true),
  };

  const mockGenerateTokens = vi.fn().mockResolvedValue(mockTokens);

  beforeAll(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(1);

    testEnv = await connectToDb();

    OrganizationModel = createOrganizationModel({
      connection: mongoose.connection,
    });
    UserModel = createUserModel({
      connection: mongoose.connection,
      OrganizationModel,
    });
    VerificationTokenModel = createVerificationTokenModel({
      connection: mongoose.connection,
      OrganizationModel,
    });
    PasswordTokenModel = createPasswordTokenModel({
      connection: mongoose.connection,
      UserModel,
    });
    RefreshTokenModel = createRefreshTokenModel({
      connection: mongoose.connection,
    });
    props = {
      config,
      OrganizationModel,
      UserModel,
      VerificationTokenModel,
      PasswordTokenModel,
      RefreshTokenModel,
      generateTokens: mockGenerateTokens,
      commsService,
      connection: mongoose.connection,
    };
  });

  beforeEach(async () => {
    vi.mock('bcrypt', () => ({
      hash: vi.fn().mockResolvedValue('mockHashedPassword'),
      compare: vi.fn().mockResolvedValue(true),
    }));

    vi.mock('jsonwebtoken', () => ({
      verify: vi.fn(),
    }));
    await resetDb();
    vi.clearAllMocks();
  });

  afterAll(async () => {
    await disconnectFromDb(testEnv);
  });

  const createOrg = () => OrganizationModel.create(mockOrganization);
  const createUser = async () => {
    await createOrg();
    await UserModel.create(mockUser);
  };

  describe('createVerificationToken', () => {
    it('Creates and sends a verification token if user is not registered', async () => {
      await createVerificationToken(props)({
        email: mockUser.email,
      });

      const tokens = await VerificationTokenModel.find({
        email: mockUser.email,
      });
      expect(tokens.length).toBe(1);
      expect(commsService.sendVerificationEmail).toHaveBeenCalledWith({
        email: mockUser.email,
        url: expect.any(String),
      });
    });

    it('Throws an error if the user is already registered', async () => {
      await createUser();

      await expect(
        createVerificationToken(props)({
          email: mockUser.email,
        }),
      ).rejects.toThrow(errors.userAlreadyRegistered);
    });
  });

  describe('verifyEmail', () => {
    it('Verifies the email and creates a user account, returning password token', async () => {
      const token = await VerificationTokenModel.create(mockVerificationToken);

      const result = await verifyEmail(props)({
        verificationTokenId: token._id,
      });

      expect(result).toHaveProperty('_id');
      const user = await UserModel.findOne({
        email: mockVerificationToken.email,
      });
      expect(user).toBeTruthy();
    });

    it('Throws an error if the verification token is invalid or expired', async () => {
      await expect(
        verifyEmail(props)({ verificationTokenId: 'non-existent-token' }),
      ).rejects.toThrow(errors.verificationTokenInvalid);
    });
  });

  describe('verifyPasswordToken', async () => {
    beforeEach(async () => {
      await createUser();
    });

    it('Returns true if the password token exists', async () => {
      const token = await PasswordTokenModel.create(mockPasswordToken);

      const result = await verifyPasswordToken(props)({
        passwordTokenId: token._id,
      });

      expect(result).toBe(true);
    });

    it('Returns false if the password token does not exist', async () => {
      const result = await verifyPasswordToken(props)({
        passwordTokenId: 'non-existent-token',
      });

      expect(result).toBe(false);
    });

    it('Returns false if the password token has expired', async () => {
      const token = await PasswordTokenModel.create({
        ...mockPasswordToken,
        expiresAt: 0,
      });

      const result = await verifyPasswordToken(props)({
        passwordTokenId: token._id,
      });

      expect(result).toBe(false);
    });
  });

  describe('setPassword', () => {
    const mockValidPassword = 'Passw0rd';

    it('Sets the password for the user and verifies them', async () => {
      await createUser();
      const token = await PasswordTokenModel.create(mockPasswordToken);

      const result = await setPassword(props)({
        passwordTokenId: token._id,
        password: mockValidPassword,
      });

      expect(result).toBe(true);

      const updatedUser = await UserModel.findById(mockUser._id);
      expect(updatedUser.password).toBe(mockHashedPassword);
      expect(updatedUser.isVerified).toBe(true);
    });

    it('Throws an error if the password token is invalid or expired', async () => {
      await expect(
        setPassword(props)({
          passwordTokenId: 'invalid-token',
          password: mockValidPassword,
        }),
      ).rejects.toThrow(errors.passwordTokenInvalid);
    });

    it('Throws an error if the password does not match the schema', async () => {
      await expect(async () =>
        setPassword(props)({
          passwordTokenId: 'invalid-token',
          password: 'missingNumber',
        }),
      ).rejects.toThrow(ZodError);
    });
  });

  describe('signIn', () => {
    it('Signs in the user with valid credentials', async () => {
      await createOrg();
      await UserModel.create({ ...mockUser, password: mockHashedPassword });

      const tokens = await signIn(props)({
        email: mockUser.email,
        password: 'valid-password',
      });

      expect(tokens).toMatchObject(mockTokens);
    });

    it('Throws an error if user does not have a password set yet', async () => {
      await createOrg();
      await UserModel.create({ ...mockUser });

      await expect(
        signIn(props)({ email: mockUser.email, password: 'wrong-password' }),
      ).rejects.toThrow(errors.noPasswordSet);
    });

    it('Throws an error for invalid credentials', async () => {
      await createOrg();
      await UserModel.create({ ...mockUser, password: mockHashedPassword });

      (vi.mocked(compare) as Mock).mockResolvedValueOnce(false);
      await expect(
        signIn(props)({ email: mockUser.email, password: 'wrong-password' }),
      ).rejects.toThrow(errors.invalidCredentials);
    });
  });

  describe('resetPassword', () => {
    it('Creates and sends a password reset email', async () => {
      await createUser();

      await resetPassword(props)({ email: mockUser.email });

      const token = await PasswordTokenModel.findOne({ userId: mockUser._id });
      expect(token).toBeTruthy();
      expect(commsService.sendPasswordResetEmail).toHaveBeenCalledWith({
        email: mockUser.email,
        url: `${config.PASSWORD_RESET_URL}/${token._id}`,
      });
    });

    it('Deletes any existing password tokens', async () => {
      await createUser();

      await resetPassword(props)({ email: mockUser.email });
      const firstToken = await PasswordTokenModel.findOne({
        userId: mockUser._id,
      });
      expect(firstToken).toBeTruthy();

      await resetPassword(props)({ email: mockUser.email });
      expect(await PasswordTokenModel.findById(firstToken._id)).toBe(null);
    });

    it('Throws an error if the user does not exist', async () => {
      await expect(
        resetPassword(props)({ email: 'nonexistent@example.com' }),
      ).rejects.toThrow(errors.userDoesNotExist);
    });
  });

  describe('refreshTokens', () => {
    it('Refreshes tokens if the refresh token is valid', async () => {
      await createUser();
      (vi.mocked(verify) as Mock).mockReturnValueOnce(mockRefreshToken);
      await RefreshTokenModel.create(mockRefreshToken);

      const tokens = await refreshTokens(props)({
        refreshToken: validRefreshToken,
      });
      expect(tokens).toMatchObject(mockTokens);
    });

    it('Throws an error if the refresh token is invalid', async () => {
      vi.mocked(verify).mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        refreshTokens(props)({ refreshToken: invalidRefreshToken }),
      ).rejects.toThrow(errors.refreshTokenInvalid);
    });

    it('Throws an error if the refresh token is revoked', async () => {
      await createUser();
      (vi.mocked(verify) as Mock).mockReturnValueOnce(mockRefreshToken);

      await expect(
        refreshTokens(props)({
          refreshToken: validRefreshToken,
        }),
      ).rejects.toThrow(errors.refreshTokenInvalid);
    });
  });

  describe('removeRefreshToken', () => {
    it('Removes a refresh token if valid', async () => {
      const refreshTokenDoc = await RefreshTokenModel.create(mockRefreshToken);

      (vi.mocked(verify) as Mock).mockReturnValueOnce(mockRefreshToken);

      const result = await removeRefreshToken(props)({
        refreshToken: validRefreshToken,
      });

      expect(result).toBe(true);

      expect(await RefreshTokenModel.findById(refreshTokenDoc._id).exec()).toBe(
        null,
      );
    });
  });
});
