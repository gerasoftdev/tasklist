export const mockOrganization = {
  _id: 'org',
};

export const mockUser = {
  _id: 'user',
  orgId: mockOrganization._id,
  email: 'some@one.com',
  isGoogleSignIn: false,
  isVerified: false,
};

export const mockVerificationToken = {
  _id: 'verificationToken',
  email: mockUser.email,
  expiresAt: 2,
};

export const mockPasswordToken = {
  _id: 'passwordToken',
  userId: mockUser._id,
  expiresAt: 2,
};

export const mockRefreshToken = {
  _id: 'refreshToken',
  userId: mockUser._id,
  orgId: mockUser.orgId,
  expiresAt: 2,
};
export const mockTokens = {
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken',
};
