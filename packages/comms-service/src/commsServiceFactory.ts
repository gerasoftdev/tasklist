import * as aws from '@aws-sdk/client-ses';
import { createTransport } from 'nodemailer';
import { sendPasswordResetEmail, sendVerificationEmail } from './handlers';
import type { Config } from './handlers/types';

const devEmailHandler = async (props: unknown) => {
  // eslint-disable-next-line no-console -- only for debugging
  console.log(props);

  return true;
};

export const commsServiceFactory = async (config: Config) => {
  if (config.NODE_ENV !== 'production') {
    return {
      sendPasswordResetEmail: devEmailHandler,
      sendVerificationEmail: devEmailHandler,
    };
  }
  const ses = new aws.SESClient({ region: config.AWS_REGION });
  const transporter = createTransport({
    SES: { ses, aws },
  });

  const props = {
    transporter,
    emailDomain: config.EMAIL_DOMAIN,
  };

  return {
    sendVerificationEmail: sendVerificationEmail(props),
    sendPasswordResetEmail: sendPasswordResetEmail(props),
  };
};

export type CommsService = Awaited<ReturnType<typeof commsServiceFactory>>;
