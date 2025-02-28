import type { AccessTokenPayload } from '@repo/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

type AuthState = {
  auth: (AccessTokenPayload & JwtPayload) | null;
  accessToken: string | null;
  setTokens: (props: { accessToken: string }) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      accessToken: null,
      setTokens: ({ accessToken }) => {
        const auth = jwtDecode<AccessTokenPayload & JwtPayload>(accessToken);

        set({
          auth,
          accessToken,
        });
      },
      reset: () => {
        set({
          auth: null,
          accessToken: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
