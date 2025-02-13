import { commsServiceFactory } from '@repo/comms-service';
import { connectToDb } from '@repo/mongodb-helpers';
import { generateTokens } from './utils/tokens';
import {
  createVerificationToken,
  signIn,
  refreshTokens,
  removeRefreshToken,
  resetPassword,
  setPassword,
  verifyEmail,
} from './handlers';
import {
  createUserModel,
  createOrganizationModel,
  createVerificationTokenModel,
  createPasswordTokenModel,
  createRefreshTokenModel,
} from './models';
import type { Config } from './handlers/types';

export const authServiceFactory = async (config: Config) => {
  const connection = await connectToDb({
    connectionString: config.DB_CONNECTION_STRING,
  });
  const commsService = await commsServiceFactory({
    NODE_ENV: config.NODE_ENV,
    AWS_REGION: config.AWS_REGION,
    EMAIL_DOMAIN: config.DOMAIN_NAME,
  });
  const OrganizationModel = createOrganizationModel({ connection });
  const UserModel = createUserModel({ connection, OrganizationModel });
  const VerificationTokenModel = createVerificationTokenModel({
    connection,
    OrganizationModel,
  });
  const PasswordTokenModel = createPasswordTokenModel({
    connection,
    UserModel,
  });
  const RefreshTokenModel = createRefreshTokenModel({
    connection,
  });

  const props = {
    config,
    connection,
    commsService,
    OrganizationModel,
    UserModel,
    VerificationTokenModel,
    PasswordTokenModel,
    RefreshTokenModel,
    generateTokens: generateTokens({ config, RefreshTokenModel }),
  };

  return {
    connection,
    createVerificationToken: createVerificationToken(props),
    verifyEmail: verifyEmail(props),
    setPassword: setPassword(props),
    resetPassword: resetPassword(props),
    signIn: signIn(props),
    refreshTokens: refreshTokens(props),
    removeRefreshToken: removeRefreshToken(props),
  };
};
