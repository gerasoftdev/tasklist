import type { Transporter } from 'nodemailer';
import type SESTransport from 'nodemailer/lib/ses-transport';

export type HandlerProps = {
  transporter: Transporter<SESTransport.SentMessageInfo, SESTransport.Options>;
  emailDomain: string;
};

export type Config = {
  NODE_ENV: string;
  EMAIL_DOMAIN: string;
  AWS_REGION: string;
};
