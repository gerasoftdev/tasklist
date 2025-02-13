import { Schema } from 'mongoose';
import type { User } from '@repo/types';
import errors from '@repo/translation/en/errors.json';
import { baseDocumentFields } from '../constants';

export const UserSchema = new Schema<User>({
  ...baseDocumentFields,

  orgId: {
    type: String,
    description: 'ID of the organization the user belongs to',
    required: true,
  },
  email: {
    type: String,
    description: 'Email of the user',
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: (email: string) => /^\S+@\S+\.\S+$/.test(email),
      message: errors.emailInvalid,
    },
  },
  isGoogleSignIn: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    description: 'Name of the user',
    default(this: User) {
      return this.email.split('@')[0];
    },
  },
  password: {
    type: String,
    description: 'Salted, and hashed password of the user',
  },
  isVerified: {
    type: Boolean,
    description: 'If the user has verified itself through e-mail',
    default: false,
  },
});
