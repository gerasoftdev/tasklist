/* v8 ignore start */

import gql from 'graphql-tag';

export const userTypeDefs = gql`
  input SignUpInput {
    email: String!
  }

  input VerifyPasswordTokenInput {
    passwordTokenId: String!
  }
  input VerifyEmailInput {
    verificationTokenId: String!
  }
  type VerifyEmailResponse {
    passwordTokenId: String
  }

  input SetPasswordInput {
    passwordTokenId: String!
    password: String!
  }

  input ResetPasswordInput {
    email: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input RefreshTokensInput {
    refreshToken: String!
  }

  type TokensResponse {
    refreshToken: String!
    accessToken: String!
  }

  input LogoutInput {
    refreshToken: String!
  }

  type Mutation {
    signUp(data: SignUpInput!): Boolean!
    verifyEmail(data: VerifyEmailInput!): VerifyEmailResponse!
    setPassword(data: SetPasswordInput!): Boolean!
    resetPassword(data: ResetPasswordInput!): Boolean!
    signIn(data: SignInInput!): TokensResponse!
    refreshTokens(data: RefreshTokensInput): TokensResponse!
    logout(data: LogoutInput): Boolean!
  }

  type Query {
    verifyPasswordToken(data: VerifyPasswordTokenInput!): Boolean!
  }
`;
