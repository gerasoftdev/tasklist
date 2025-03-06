/* v8 ignore start */

import { gql } from 'graphql-tag';

export const SignUp = gql`
  mutation signUp($data: SignUpInput!) {
    signUp(data: $data)
  }
`;

export const VerifyEmail = gql`
  mutation verifyEmail($data: VerifyEmailInput!) {
    verifyEmail(data: $data) {
      passwordTokenId
    }
  }
`;
export const VerifyPasswordToken = gql`
  query verifyPasswordToken($data: VerifyPasswordTokenInput!) {
    verifyPasswordToken(data: $data)
  }
`;

export const SetPassword = gql`
  mutation setPassword($data: SetPasswordInput!) {
    setPassword(data: $data)
  }
`;

export const ResetPassword = gql`
  mutation resetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`;

export const SignIn = gql`
  mutation signIn($data: SignInInput!) {
    signIn(data: $data) {
      accessToken
    }
  }
`;

export const RefreshTokens = gql`
  mutation refreshTokens($data: RefreshTokensInput) {
    refreshTokens(data: $data) {
      accessToken
      refreshToken
    }
  }
`;

export const Logout = gql`
  mutation logout($data: LogoutInput) {
    logout(data: $data)
  }
`;
