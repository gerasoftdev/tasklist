import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { ResetPassword } from '@/routes/unauth/resetPassword';

type Args = ComponentProps<typeof ResetPassword>;

const meta: Meta<Args> = {
  title: 'ResetPassword',
  component: ResetPassword,
  parameters: {
    apolloClient: {
      mocks: [],
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
