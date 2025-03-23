import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { AddTask } from '@/routes/auth/features/AddTask';

type Args = ComponentProps<typeof AddTask>;

const meta: Meta<Args> = {
  title: 'AddTask',
  component: AddTask,
  parameters: {
    apolloClient: {
      mocks: [],
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
