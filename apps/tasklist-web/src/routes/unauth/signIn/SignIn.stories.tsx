import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { SignIn } from '@/routes/unauth/signIn';

type Args = ComponentProps<typeof SignIn>;

const meta: Meta<Args> = {
  title: 'SignIn',
  component: SignIn,
  parameters: {
    apolloClient: {
      mocks: [],
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
