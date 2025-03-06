import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Route } from 'wouter';
import { VerifyEmail } from '@/routes/unauth/verifyEmail';
import { verifyEmailMutationError } from '@/routes/unauth/verifyEmail/mockQueries';
import { mockVerifyEmailLocation } from '@/__fixtures__/auth';
import { ROUTES } from '@/constants/routes';

type Args = ComponentProps<typeof VerifyEmail>;

const meta: Meta<Args> = {
  title: 'VerifyEmail',
  component: VerifyEmail,
  parameters: {
    path: mockVerifyEmailLocation,
  },
  decorators: [
    (Story) => (
      <Route
        path={ROUTES.VERIFY_EMAIL({
          verificationTokenId: ':verificationTokenId',
        })}
      >
        <Story />
      </Route>
    ),
  ],
};

export default meta;
type Story = StoryObj<Args>;

export const Loading: Story = {
  parameters: {
    apolloClient: {
      mocks: [
        verifyEmailMutationError({
          withLoading: true,
          loadingFor: Infinity,
        }),
      ],
    },
  },
};

export const InvalidToken: Story = {
  parameters: {
    apolloClient: {
      mocks: [verifyEmailMutationError()],
    },
  },
};
