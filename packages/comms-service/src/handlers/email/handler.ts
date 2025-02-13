import { validateArgs } from '@repo/utils';
import type { HandlerProps } from '../types';
import { createEmail, EmailElements } from '../../utils/createEmail';
import { EmailUserNames } from '../../constants/emailUserNames';
import {
  sendPasswordResetEmailArgsSchema,
  sendVerificationEmailArgsSchema,
} from './schema';

export const sendVerificationEmail = ({
  transporter,
  emailDomain,
}: HandlerProps) =>
  validateArgs(sendVerificationEmailArgsSchema, async ({ email, url }) => {
    const emailContent = createEmail({
      title: 'Verify your account',
      domain: emailDomain,
      elements: [
        { type: EmailElements.h2, text: 'Welcome!' },
        {
          type: EmailElements.text,
          text: `Thank you for registering.`,
        },
        {
          type: EmailElements.text,
          text: `One important thing before we start. Please verify your account in the next hour by clicking the button below. We need to know if the account is created by the owner of the email address.`,
        },
        {
          type: EmailElements.button,
          text: 'Verify account',
          href: url,
        },
      ],
    });
    return transporter.sendMail({
      from: `${EmailUserNames.noreply}@${emailDomain}`,
      to: email,
      subject: 'Verify your account',
      html: emailContent,
    });
  });

export const sendPasswordResetEmail = ({
  transporter,
  emailDomain,
}: HandlerProps) =>
  validateArgs(sendPasswordResetEmailArgsSchema, async ({ email, url }) => {
    const emailContent = createEmail({
      title: 'Password reset',
      domain: emailDomain,
      elements: [
        { type: EmailElements.h2, text: 'Password reset' },
        {
          type: EmailElements.text,
          text: `To create your new password click the button below. Please note that the link is valid for 24 hours.`,
        },
        {
          type: EmailElements.button,
          text: 'Reset password',
          href: url,
        },
      ],
    });
    return transporter.sendMail({
      from: `${EmailUserNames.noreply}@${emailDomain}`,
      to: email,
      subject: 'Reset your password',
      html: emailContent,
    });
  });
