import type {
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from '@repo/graphql';
import { VerifyEmail as VerifyEmailMutationDocument } from '@repo/graphql';
import { GraphQLError } from 'graphql';
import { mockQuery } from '@/utils/testUtils';
import {
  mockPasswordTokenId,
  mockVerificationTokenId,
} from '@/__fixtures__/auth';

export const verifyEmailMutationError = mockQuery<
  VerifyEmailMutation,
  VerifyEmailMutationVariables
>(VerifyEmailMutationDocument, {
  variables: { data: { verificationTokenId: mockVerificationTokenId } },
  errors: [new GraphQLError('Verification failed.')],
});

export const verifyEmailMutationSuccess = mockQuery<
  VerifyEmailMutation,
  VerifyEmailMutationVariables
>(VerifyEmailMutationDocument, {
  variables: { data: { verificationTokenId: mockVerificationTokenId } },
  result: {
    verifyEmail: { passwordTokenId: mockPasswordTokenId },
  },
});
