import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { SignUp } from '@/routes/unauth/signUp';

type Args = ComponentProps<typeof SignUp>;

const meta: Meta<Args> = {
  title: 'SignUp',
  component: SignUp,
  parameters: {
    apolloClient: {
      mocks: [],
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
