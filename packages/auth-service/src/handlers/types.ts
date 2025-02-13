import type { CommsService } from '@repo/comms-service';
import type {
  Organization,
  PasswordToken,
  RefreshToken,
  User,
  VerificationToken,
} from '@repo/types';
import type { Connection, Model } from 'mongoose';
import type { generateTokens } from '../utils/tokens';

export type Config = {
  ENV: string;
  NODE_ENV: string;
  DB_CONNECTION_STRING: string;
  AWS_REGION: string;
  DOMAIN_NAME: string;
  VERIFICATION_URL: string;
  PASSWORD_RESET_URL: string;
  ACCESS_TOKEN_KEY: string;
  REFRESH_TOKEN_KEY: string;
  ACCESS_TOKEN_EXPIRY: number;
  VERIFICATION_TOKEN_EXPIRY: number;
  REFRESH_TOKEN_EXPIRY: number;
  PASSWORD_TOKEN_EXPIRY: number;
};

export type HandlerProps = {
  config: Config;
  connection: Connection;
  commsService: CommsService;
  OrganizationModel: Model<Organization>;
  UserModel: Model<User>;
  VerificationTokenModel: Model<VerificationToken>;
  PasswordTokenModel: Model<PasswordToken>;
  RefreshTokenModel: Model<RefreshToken>;
  generateTokens: ReturnType<typeof generateTokens>;
};
