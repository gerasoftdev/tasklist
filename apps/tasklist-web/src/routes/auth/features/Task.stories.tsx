import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Task } from '@/routes/auth/features/Task';

type Args = ComponentProps<typeof Task>;

const meta: Meta<Args> = {
  title: 'Task',
  args: {
    task: {
      _id: 'test',
      name: 'Task 1',
      isCompleted: false,
    },
  },
  component: Task,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
