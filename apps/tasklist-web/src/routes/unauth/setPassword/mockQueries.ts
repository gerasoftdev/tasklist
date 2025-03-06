import { SetPassword as SetPasswordMutationDocument } from '@repo/graphql';
import type {
  SetPasswordMutation,
  SetPasswordMutationVariables,
  VerifyPasswordTokenQuery,
  VerifyPasswordTokenQueryVariables,
} from '@repo/graphql';
import { GraphQLError } from 'graphql';
import { mockQuery } from '@/utils/testUtils';
import { VerifyPasswordTokenDocument } from '@/hooks/apollo/api';
import { mockPassword, mockPasswordTokenId } from '@/__fixtures__/auth';

export const setPasswordMutationError = mockQuery<
  SetPasswordMutation,
  SetPasswordMutationVariables
>(SetPasswordMutationDocument, {
  variables: {
    data: { password: mockPassword, passwordTokenId: mockPasswordTokenId },
  },
  errors: [new GraphQLError('Failed to set password.')],
});

export const setPasswordMutationSuccess = mockQuery<
  SetPasswordMutation,
  SetPasswordMutationVariables
>(SetPasswordMutationDocument, {
  variables: {
    data: { password: mockPassword, passwordTokenId: mockPasswordTokenId },
  },
  result: {
    setPassword: true,
  },
});

export const verifyPasswordQueryFail = mockQuery<
  VerifyPasswordTokenQuery,
  VerifyPasswordTokenQueryVariables
>(VerifyPasswordTokenDocument, {
  variables: {
    data: { passwordTokenId: mockPasswordTokenId },
  },
  result: {
    verifyPasswordToken: false,
  },
});

export const verifyPasswordQuerySuccess = mockQuery<
  VerifyPasswordTokenQuery,
  VerifyPasswordTokenQueryVariables
>(VerifyPasswordTokenDocument, {
  variables: {
    data: { passwordTokenId: mockPasswordTokenId },
  },
  result: {
    verifyPasswordToken: true,
  },
});
