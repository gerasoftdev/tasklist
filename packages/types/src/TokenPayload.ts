export type TokenUserProps = {
  userId: string;
  orgId: string;
  email: string;
};

export type TokenProps = TokenUserProps & {
  _id: string;
};

export type RefreshTokenPayload = Omit<TokenProps, 'email'>;
export type AccessTokenPayload = TokenProps;
