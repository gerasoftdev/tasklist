import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Route } from 'wouter';
import { SetPassword } from '@/routes/unauth/setPassword';
import {
  setPasswordMutationError,
  setPasswordMutationSuccess,
  verifyPasswordQueryFail,
  verifyPasswordQuerySuccess,
} from '@/routes/unauth/setPassword/mockQueries';
import { mockSetPasswordLocation } from '@/__fixtures__/auth';
import { ROUTES } from '@/constants/routes';

type Args = ComponentProps<typeof SetPassword>;

const meta: Meta<Args> = {
  title: 'SetPassword',
  component: SetPassword,
  parameters: {
    path: mockSetPasswordLocation,
  },
  decorators: [
    (Story) => (
      <Route
        path={ROUTES.SET_PASSWORD({ passwordTokenId: ':passwordTokenId' })}
      >
        <Story />
      </Route>
    ),
  ],
};

export default meta;
type Story = StoryObj<Args>;

export const Success: Story = {
  parameters: {
    apolloClient: {
      mocks: [setPasswordMutationSuccess(), verifyPasswordQuerySuccess()],
    },
  },
};

export const Verifying: Story = {
  parameters: {
    apolloClient: {
      mocks: [
        verifyPasswordQuerySuccess({
          withLoading: true,
          loadingFor: Infinity,
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    apolloClient: {
      mocks: [setPasswordMutationError(), verifyPasswordQuerySuccess()],
    },
  },
};

export const InvalidToken: Story = {
  parameters: {
    apolloClient: {
      mocks: [verifyPasswordQueryFail()],
    },
  },
};
